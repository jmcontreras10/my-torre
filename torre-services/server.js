require("dotenv").config();
const app = require("./src/app");
const { connectMongo } = require("./src/util/database");

connectMongo()
  .then((messageMongo) => {
    console.log(messageMongo);
    app.listen(3001, () => {
      console.log("Server on port 3001");
    });
  })
  .catch((error) => {
    console.log(error);
  });