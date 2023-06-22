import { Router } from "express";
import { AttractionController } from "../modules/Attractions/controllers";
import { StateController } from "../modules/States/controllers";

import AuthMiddleware from "../middleware/AuthMiddleware";
export class AttractionRoutes {
  public attractionController: AttractionController;
  public router: Router;

  constructor() {
    this.router = Router();
    this.attractionController = new AttractionController();
    this.router.get("/", this.attractionController.getAllAttractions);
    this.router.get("/:id", this.attractionController.getAttractionById);
    this.router.get("/all/:country", this.attractionController.getAllAttractionsInCountry);
    this.router.get("/all/state/:state", this.attractionController.getAllAttractionsInState);
    this.router.post("/", AuthMiddleware.authenticate,  this.attractionController.createAttraction);
    this.router.post("/all", AuthMiddleware.authenticate, this.attractionController.createMultipleAttractions);
    this.router.put("/:id", AuthMiddleware.authenticate, this.attractionController.updateAttraction);
    this.router.delete("/:id", AuthMiddleware.authenticate, this.attractionController.deleteAttraction);
    this.router.delete("/delete/all", AuthMiddleware.authenticate, this.attractionController.deleteAllAttractions);
  }
}

export class StateRoutes {
  public stateController: StateController;
  public router: Router;

  constructor() {
    this.router = Router();
    this.stateController = new StateController();
    this.router.get("/", this.stateController.getAllStates);
    this.router.get("/:acronym", this.stateController.getStateByAcronym);
    this.router.post("/", AuthMiddleware.authenticate,  this.stateController.createState);
    this.router.put("/:id", AuthMiddleware.authenticate, this.stateController.updateState);
    this.router.delete("/:id", AuthMiddleware.authenticate, this.stateController.deleteState);
  }
}

