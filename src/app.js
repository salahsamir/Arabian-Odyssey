import { DbConnection } from "../Db/Connection.js";
import morgan from "morgan";
import cors from "cors"
import { ErrorHandeller } from "./Utils/ErrorHandling.js";
import { AuthRouter } from "./Modules/Auth/AuthRouter.js";
import { userRouter } from "./Modules/User/UserRouter.js";
import { CategoryRouter } from "./Modules/Category/CategoryRouter.js";
import { CountryRouter } from "./Modules/Country/CountryRouter.js";
import { StateRouter } from "./Modules/State/StateRouter.js";
import { FoodRouter } from "./Modules/Food/FoodRouter.js";
import { AttractionRouter } from "./Modules/Attraction.js/AttractionRouter.js";
export const App = (express) => {
  const app = express();
  app.use(cors())
  app.use(express.json());
  const port = process.env.PORT;
  if (process.env.mood == "dev") {
    app.use(morgan("dev"));
  }

  app.use("/auth",AuthRouter)
  app.use("/user",userRouter)
  app.use('/category',CategoryRouter)
  app.use('/country',CountryRouter)
  app.use('/state',StateRouter)
  app.use('/food',FoodRouter)
  app.use('/attraction',AttractionRouter)
  app.get("/", (req, res) => res.send("Hello World!"));
  app.use(ErrorHandeller)
  DbConnection();
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};
