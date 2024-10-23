import { connect } from "mongoose";

export const dbConnect = async () => {
  try {
    const mongoDBConnection = await connect(process.env.MONGO_URI);
    console.log(`Database connected to ${mongoDBConnection.connection.host}`);
  } catch (error) {
    console.log(`Database connection failed ${error}`);
    process.exit(1);
  }
};
