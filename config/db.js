const mongoose = require("mongoose");

const createConnection = async () => {
  try {
    const con = await mongoose.connect(
      "mongodb+srv://Prince:qwerty123@cluster0.1hjhe.mongodb.net/magazine?retryWrites=true&w=majority",
      {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    console.log("MONGOOSE Connected..");
  } catch (error) {
    console.error(error);
  }
};

module.exports = createConnection;
