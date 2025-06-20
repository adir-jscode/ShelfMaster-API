import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;

async function main() {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);
    console.log("Connected to MongoDb using Mongoose");
    server = app.listen(`${process.env.PORT}`, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
