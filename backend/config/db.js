import mongoose from "mongoose";
import colors from "colors";

const dBconnection = async (username, password) => {
  try {
    const con = await mongoose.connect(
      `mongodb+srv://${username}:${password}@mycluster.tuhi9ac.mongodb.net/my-notebook`
    );

    console.log(
      `Connected to mongodb Database ${con.connection.host}`.bgGreen.white
    );
  } catch (error) {
    console.log(error);
  }
};

export default dBconnection;
