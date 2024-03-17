import { DbConnection } from "../Db/Connection.js";
import morgan from "morgan";
import { ErrorHandeller } from "./Utils/ErrorHandling.js";
import { AuthRouter } from "./Modules/Auth/AuthRouter.js";

export const App = (express) => {
  const app = express();
  app.use(express.json());
  const port = process.env.PORT;
  if (process.env.mood == "dev") {
    app.use(morgan("dev"));
  }

  app.use("/auth",AuthRouter)
  app.get("/", (req, res) => res.send("Hello World!"));
  app.use(ErrorHandeller)
  DbConnection();
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};
