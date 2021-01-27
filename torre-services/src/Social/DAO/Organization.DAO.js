const neo4j = require("neo4j-driver");
// Create a driver instance, for the user `neo4j` with password `password`.
const driver = neo4j.driver(
  process.env.NEOURL,
  neo4j.auth.basic(process.env.NEOUSER, process.env.NEOPASS)
);

/**
 * This entire software component will be useful to centralize all the
 * GRAPH Database queries and allow me in the future to manage only
 * Entities like users and organizations.
 */

const createOrganization = async (org) => {
  const session = driver.session({
    database: "neo4j",
    defaultAccessMode: neo4j.session.WRITE,
  });
  try {
    const result = await session.run(
      `CREATE (o:Organization {name:'${org}'}) RETURN o`
    );
    const createdOrganization = result.records[0]._fields[0].properties;
    session.close();
    return createdOrganization;
  } catch (error) {
    //  Error - Element duplication: Ignore and not create it
    console.log(error);
  }
};

const createWorkingRelation = async (relation) => {
  const session = driver.session({
    database: "neo4j",
    defaultAccessMode: neo4j.session.WRITE,
  });
  try {
    const result = await session.run(
      `MATCH (p:Person {username:"${relation.username}"}), 
        (o:Organization {name: "${relation.organizationName}"}) 
        MERGE (p)-[rel1:close]-(o) 
        MERGE (o)-[rel2:close]-(p) 
        RETURN rel1`
    );
    session.close();
    return;
  } catch (error) {
    console.log(error);
    //  Error - Element duplication: Ignore and not create it
  }
};

module.exports = {
  createOrganization: createOrganization,
  createWorkingRelation: createWorkingRelation,
};
