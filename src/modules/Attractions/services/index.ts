import { Attraction } from "../models/attraction";
import { AttractionsRepository } from "../repository/index";

class AttractionsService {
  private attractionsRepository: AttractionsRepository;

  constructor() {
    this.attractionsRepository = new AttractionsRepository();
  }

  public async getAllAttractions(): Promise<Attraction[]> {
    const attractions = await this.attractionsRepository.getAllAttractions();
    return attractions;
  }

  public async getAttractionById(id: string): Promise<Attraction | null> {
    const attraction = await this.attractionsRepository.getAttractionById(id);
    return attraction;
  }

  public async getAllAttractionsInCountry(country: string): Promise<any> {
    const attractions =
      await this.attractionsRepository.getAllAttractionsInCountry(country);
    return attractions;
  }

  public async getAllAttractionsInState(stateAcronym: string): Promise<any> {
    const attractions =
      await this.attractionsRepository.getAllAttractionsInState(stateAcronym);
    return attractions;
  }

  

  public async createAttraction(attraction: Attraction): Promise<Attraction> {
    const newAttraction = await this.attractionsRepository.createAttraction(
      attraction
    );
    return newAttraction;
  }

  public async createMultipleAttractions(
    attractions: Attraction[]
  ): Promise<Attraction[]> {
    const newAttractions =
      await this.attractionsRepository.createMultipleAttractions(attractions);
    return newAttractions;
  }

  public async updateAttraction(
    id: string,
    updatedAttraction: Attraction
  ): Promise<boolean> {
    const result = await this.attractionsRepository.updateAttraction(
      id,
      updatedAttraction
    );
    return result;
  }

  public async deleteAttraction(id: string): Promise<boolean> {
    const result = await this.attractionsRepository.deleteAttraction(id);
    return result;
  }

  public async deleteAllAttractions(): Promise<boolean> {
    const result = await this.attractionsRepository.deleteAllAttractions();
    return result;
  }
}

export const attractionsService = new AttractionsService();
