const mongoose = require("mongoose");

function connectDB() {
  const url = "mongodb+srv://Toktar:Ttokashek2005@cluster0.xdqih6j.mongodb.net/mydatabase?retryWrites=true&w=majority";

  try {
    mongoose.connect(url, {
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
}

module.exports = { connectDB }
