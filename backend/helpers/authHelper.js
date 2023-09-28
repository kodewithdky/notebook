import bcrypt from "bcryptjs";

//bcript the password
export const hashedPassword = async (password) => {
  try {
    //genrating salt
    const salt = await bcrypt.genSalt(10);
    //hashed password
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (error) {
    console.error(error);
  }
};

// encript the password
export const comparePassword = async(password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
