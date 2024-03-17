import chalk from "chalk";
import mongoose from "mongoose";

export const DbConnection = async () => {
  await mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log(chalk.bgBlue("DB Connected"));
    })
    .catch((err) => {
      console.log(chalk.bgRed("DB Connection Failed"));
    });
};
