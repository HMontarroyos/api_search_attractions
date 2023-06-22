import State from "../models/state";

export class StatesRepository {
  public async getAllStates(): Promise<any> {
    const states = await State.find().exec();
    return states;
  }

  public async getStateByAcronym(acronym: string): Promise<any> {
    try {
      const state = await State.findOne({ acronym: acronym }).exec();
      if (!state) throw new Error(`State with state in acronym ${acronym} not found`);
      return state;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async createState(state: any): Promise<any> {
    const newState = new State(state);
    const savedState = await newState.save();
    return savedState;
  }

  public async updateState(id: string, updatedState: any): Promise<boolean> {
    const result = await State.updateOne({ _id: id }, updatedState).exec();
    if (result.modifiedCount === 0) {
      throw new Error(`State with ID ${id} not found`);
    }
    return true;
  }

  public async deleteState(id: string): Promise<boolean> {
    const result = await State.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
}
