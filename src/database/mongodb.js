const mongoose = require("mongoose")

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connectMongoDB = async () => {
  try {
      await mongoose.connect(process.env.MONGODB_URI, clientOptions);
      await mongoose.connection.db.admin().command({ ping: 1 });

      console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
      console.error("Error to connect on MongoDB", error);
      process.exit(1);
  }
}

module.exports = connectMongoDB;