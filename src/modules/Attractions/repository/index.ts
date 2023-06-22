import Attraction from "../models/attraction";

export class AttractionsRepository {
  public async getAllAttractions(): Promise<any> {
    const attractions = await Attraction.find().exec();
    return attractions;
  }

  public async getAttractionById(id: string): Promise<any> {
    try {
      const attraction = await Attraction.findById(id).exec();
      if (!attraction) throw new Error(`Attraction with id ${id} not found`);
      return attraction;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getAllAttractionsInCountry(country: string): Promise<any> {
    try {
      const attractions = await Attraction.find({ country: country }).exec();
      return attractions;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getAllAttractionsInState(state: string): Promise<any> {
    try {
      const attractions = await Attraction.find({ state: state }).exec();
      return attractions;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async createAttraction(attraction: any): Promise<any> {
    const newAttraction = new Attraction(attraction);
    const savedAttraction = await newAttraction.save();
    return savedAttraction;
  }

  public async createMultipleAttractions(attractions: any): Promise<any> {
    const newAttractions = await Attraction.insertMany(attractions);
    return newAttractions;
  }

  public async updateAttraction(
    id: string,
    updatedAttraction: any
  ): Promise<boolean> {
    const result = await Attraction.updateOne(
      { _id: id },
      updatedAttraction
    ).exec();
    if (result.modifiedCount === 0) {
      throw new Error(`Attraction with ID ${id} not found`);
    }
    return true;
  }

  public async deleteAttraction(id: string): Promise<boolean> {
    const result = await Attraction.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }

  public async deleteAllAttractions(): Promise<boolean> {
    const result = await Attraction.deleteMany({}).exec();
    return result.deletedCount > 0;
  }
}
