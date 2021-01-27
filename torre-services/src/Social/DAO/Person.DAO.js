const neo4j = require("neo4j-driver");
// Create a driver instance, for the user `neo4j` with password `password`.
// It should be enough to have a single driver per database per application.
const driver = neo4j.driver(
  process.env.NEOURL,
  neo4j.auth.basic(process.env.NEOUSER, process.env.NEOPASS)
);

/**
 * This entire software component will be useful to centralize all the
 * GRAPH Database queries and allow me in the future to manage only
 * Entities like users and organizations.
 */

const getCloseUsers = async (username) => {
  const session = driver.session({
    database: "neo4j",
    defaultAccessMode: neo4j.session.WRITE,
  });
  const result = await session.run(
    `MATCH (p:Person {username:'${username}'})--(p2:Person) RETURN p2`
  );
  const retrievedPeople = result.records.map(
    (rec) => rec._fields[0].properties
  );
  session.close();
  return retrievedPeople;
};

/**
 * Creates the user vertex in the database, if exists, it ignore that one
 * @param {Object<string, string, string>} person
 */
const createPerson = async (person) => {
  const session = driver.session({
    database: "neo4j",
    defaultAccessMode: neo4j.session.WRITE,
  });
  try {
    const result = await session.run(
      `CREATE (p:Person {username:'${person.username}',name:'${person.name}',picture:'${person.picture}'}) RETURN p`
    );
    const createdPerson = result.records[0]._fields[0].properties;
    session.close();
    return createdPerson;
  } catch (error) {
    //  Error - Element duplication: Ignore and not create it
    console.log(error);
  }
};

const createRelation = async (relation) => {
  const session = driver.session({
    database: "neo4j",
    defaultAccessMode: neo4j.session.WRITE,
  });
  try {
    const result = await session.run(
      `MATCH (p1:Person {username:"${relation.username1}"}), 
      (p2:Person {username: "${relation.username2}"}) 
      MERGE (p1)-[rel1:close]-(p2) 
      MERGE (p2)-[rel2:close]-(p1) 
      RETURN rel1`
    );
    session.close();
    return;
  } catch (error) {
    //  Error - Element duplication: Ignore and not create it
    console.log(error);
  }
};

module.exports = {
  createPerson: createPerson,
  createRelation,
  createRelation,
  getCloseUsers: getCloseUsers,
};
