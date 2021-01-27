//  Imports
const {
  createPerson,
  createRelation,
  getCloseUsers,
} = require("../DAO/Person.DAO");
const {
  createOrganization,
  createWorkingRelation,
} = require("../DAO/Organization.DAO");
const { fetchUser } = require("../../Auth/Controllers/user.controller");
const { requestSome } = require("../../util/requests");

//  ========================================================================
//                                 API
//  ========================================================================

/**
 * This method retrieves all directed connected people of a given user
 * @param {Request} req
 * @param {Response} res
 */
const getClosePeopleHandler = (req, res) => {
  getCloseUsers(req.params.username)
    .then((closeUsers) => {
      console.log(closeUsers);
      res.json({
        internalStatus: 4200,
        message: "Successfuly found",
        data: closeUsers,
      });
      res.send(200);
    })
    .catch((error) => {
      console.log(error);
      res.json({
        internalStatus: 4500,
        message: "Unexpected error",
      });
      res.send(500);
    });
};

//  ========================================================================
//                               Private
//  ========================================================================

/**
 * Author:  jmcontreras10
 * This is an BFS Based algorithm for TORRE's people
 * exploring as a network and optimize it saving that info into
 * a Graph database [Neo4j] for analitics purposes Like facebook friends.
 */
const explore = async (username) => {
  try {
    //  Get the current user
    const { person, experiences } = await fetchUser(username);
    const { picture, name, publicId } = person;

    const organizationsFound = [];
    const usersFound = [];

    let i = 0;

    //  This will be made by two layers (two grades)
    //  Initial user to visit, source
    const usersToVisit = [{ username: publicId, name, picture, experiences }];
    //  Go over all the users to visit
    while (usersToVisit.length > 0 && i < 2) {
      //  Get the current user to analize [Mark]
      const currentUser = usersToVisit.pop();
      usersFound.push(currentUser);

      //  All the organizations of the current user
      const organizationsToVisit = await getUserOrganizations(
        currentUser.experiences
      );
      //  Go over all the organizations to visit
      while (organizationsToVisit.length > 0 && i < 2) {
        //  Get the current organization to analize [Mark]
        const currentOrganization = organizationsToVisit.pop();
        organizationsFound.push(currentOrganization);

        //  Create the organization in the graph
        await createOrganization(currentOrganization);

        //  Get the Org users
        const orgMembers = await getOrganizationMembers(currentOrganization);
        if (orgMembers.some((oM) => oM.username != currentUser.username))
          orgMembers.push(currentUser);

        //  Make relation between the users and the org
        for (let index = 0; index < orgMembers.length; index++) {
          //  Current member
          const currMember = orgMembers[index];

          //  Fetch the experiences of that member
          const currExperiences = (await fetchUser(currMember.username))
            .experiences;

          //  Add the experiences of that member in it
          orgMembers.splice(index, 1, {
            ...currMember,
            experiences: currExperiences,
          });

          //  Add member to the graph
          await createPerson(currMember);

          //  Create the relation Member-Work
          await createWorkingRelation({
            organizationName: currentOrganization,
            username: currMember.username,
          });
        }

        //  TODO: Make relation between all the users of the org
        //  Removing from retrived and putting on Next to visit
        while (orgMembers.length > 0) {
          const member1 = orgMembers.pop();
          for (let index = 0; index < orgMembers.length; index++) {
            const member2 = orgMembers[index];
            if (member1.username != member2.username) {
              await createRelation({
                username1: member1.username,
                username2: member2.username,
              });
            }
          }
          //  Is marked?
          if (!usersFound.some((uF) => uF.username == member1.username))
            usersToVisit.push(member1);
        }
      }
      //  Layer completed
      i++;
    }
  } catch (error) {
    throw error;
  }
  //  Finished the BFS... think, Could be infinite, but py PC and servers can not continue :'v
};

/**
 * This one get the organizations of a given experiences (of an user)
 * @param {Object[]} experiences
 */
const getUserOrganizations = async (experiences) => {
  if (!experiences) return [];
  //  Organizations repositories
  let organizationsFound = [];

  //  Start filtering the experiences that are jobs
  //  those are the best close to
  organizationsFound = await experiences.filter(
    (experience) =>
      (experience.category == "jobs") | (experience.category == "projects")
  );
  //  Array organizations will be builded using the organizations found on the experiences
  organizationsFound = await organizationsFound.reduce(
    (organizations, experience) =>
      organizations.concat(
        experience.organizations.map((organization) => organization.name)
      ),
    []
  );
  organizationsFound = [...new Set(organizationsFound)];
  return organizationsFound;
};

/**
 * This one returns the list of user membser (or in the past) of an organization
 * @param {string} organization
 */
const getOrganizationMembers = async (organization) => {
  const options = {
    organization: {
      term: organization,
    },
  };
  const response = await requestSome(3, "/", 1, 0, options, undefined);
  const users = response?.results.map((user) => {
    return { name: user.name, picture: user.picture, username: user.username };
  });
  return users;
};

//  Exports
module.exports = {
  explore: explore,
  getClosePeopleHandler: getClosePeopleHandler,
};
