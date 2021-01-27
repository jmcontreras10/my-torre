const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    console.log("Starting the Mongo connection");
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    return "Mongo Database connection stablished";
  } catch (error) {
    return error;
  }
};

module.exports = {
  connectMongo: connectMongo,
};
