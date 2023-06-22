import { Request, Response } from "express";
import { State } from "../models/state";
import { statesService } from "../services/index";

export class StateController {
  public async getAllStates(req: Request, res: Response): Promise<void> {
    try {
      const states: State[] = await statesService.getAllStates();
      res.status(200).json(states);
    } catch (error) {
      console.error("Error while fetching in states", error);
      res.status(500).send("Internal server error");
    }
  }

  public async getStateByAcronym(req: Request, res: Response): Promise<void> {
    const stateAcronym: string = req.params.acronym;

    try {
      const state: State | null = await statesService.getStateByAcronym(stateAcronym);

      if (!state) {
        res.status(404).json({ error: "State not found" });
        return;
      }

      res.status(200).json(state);
    } catch (error) {
      console.error(`Error while fetching state with  ${stateAcronym}`, error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public async createState(req: Request, res: Response): Promise<void> {
    try {
      const newState: State = req.body;
      const createdState: State = await statesService.createState(newState);
      res.status(201).json(createdState);
    } catch (error) {
      console.error("Error while creating in state", error);
      res.status(500).send("Internal server error");
    }
  }

  public async updateState(req: Request, res: Response): Promise<void> {
    const stateId: string = req.params.id;
    const updatedState: State = req.body;

    try {
      await statesService.updateState(stateId, updatedState);
      res.status(200).send("State updated successfully");
    } catch (error) {
      console.error(`Error while updating state with id ${stateId}`, error);
      res.status(404).send("State not found");
    }
  }

  public async deleteState(req: Request, res: Response): Promise<void> {
    const stateId: string = req.params.id;
    try {
      const result: boolean = await statesService.deleteState(stateId);
      res.status(200).send("State deleted successfully");
    } catch (error) {
      console.error(`Error while deleting state with id ${stateId}`, error);
      res.status(500).send("Internal server error");
    }
  }
}
