import { State } from "../models/state";
import { StatesRepository } from "../repository/index";

class StatesService {
  private statesRepository: StatesRepository;

  constructor() {
    this.statesRepository = new StatesRepository();
  }

  public async getAllStates(): Promise<State[]> {
    const states = await this.statesRepository.getAllStates();
    return states;
  }

  public async getStateById(id: string): Promise<State | null> {
    const state = await this.statesRepository.getStateById(id);
    return state;
  }

  public async createState(state: State): Promise<State> {
    const newState = await this.statesRepository.createState(
      state
    );
    return newState;
  }


  public async updateState(
    id: string,
    updatedState: State
  ): Promise<boolean> {
    const result = await this.statesRepository.updateState(
      id,
      updatedState
    );
    return result;
  }

  public async deleteState(id: string): Promise<boolean> {
    const result = await this.statesRepository.deleteState(id);
    return result;
  }


}

export const statesService = new StatesService();
