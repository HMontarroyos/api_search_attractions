import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { AttractionRoutes, StateRoutes } from "./routes";

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private routes() {
    const attractionRoutes = new AttractionRoutes();
    const stateRoutes = new StateRoutes();

    this.app.use("/attractions", attractionRoutes.router);

    this.app.use("/states", stateRoutes.router);
  }
}
