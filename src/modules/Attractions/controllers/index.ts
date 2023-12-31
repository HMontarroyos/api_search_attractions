import { Request, Response } from "express";
import { Attraction, AttractionSchema } from "../models/attraction";
import { attractionsService } from "../services/index";

export class AttractionController {
  public async getAllAttractions(req: Request, res: Response): Promise<void> {
    try {
      const attractions: Attraction[] =
        await attractionsService.getAllAttractions();
      res.status(200).json(attractions);
    } catch (error) {
      console.error("Error while fetching attractions", error);
      res.status(500).send("Internal server error");
    }
  }

  public async getAttractionById(req: Request, res: Response): Promise<void> {
    const attractionId: string = req.params.id;

    try {
      const attraction: Attraction | null =
        await attractionsService.getAttractionById(attractionId);

      if (!attraction) {
        res.status(404).json({ error: "Attraction not found" });
        return;
      }

      res.status(200).json(attraction);
    } catch (error) {
      console.error(
        `Error while fetching attraction with id ${attractionId}`,
        error
      );
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public async getAllAttractionsInCountry(
    req: Request,
    res: Response
  ): Promise<void> {
    const country: string = req.params.country;

    try {
      const attractions: Attraction[] =
        await attractionsService.getAllAttractionsInCountry(country);

      if (attractions.length === 0) {
        res.status(404).json({ error: "Attraction in Country not found" });
        return;
      }

      res.status(200).json(attractions);
    } catch (error) {
      console.error(
        `Error while fetching attraction with country ${country}`,
        error
      );
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public async getAllAttractionsInState(
    req: Request,
    res: Response
  ): Promise<void> {
    const stateAcronym: string = req.params.stateAcronym;

    try {
      const attractions: Attraction[] =
        await attractionsService.getAllAttractionsInState(stateAcronym);

      if (attractions.length === 0) {
        res.status(404).json({ error: "Attraction in State not found" });
        return;
      }

      res.status(200).json(attractions);
    } catch (error) {
      console.error(
        `Error while fetching attraction with country in state ${stateAcronym}`,
        error
      );
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public async createAttraction(req: Request, res: Response): Promise<void> {
    try {
      const newAttraction: Attraction = req.body;
      const invalidKeys = Object.keys(newAttraction).filter(
        (key) => !AttractionSchema.obj.hasOwnProperty(key)
      );

      if (invalidKeys.length > 0) {
        res.status(400).send(`Invalid keys found: ${invalidKeys.join(", ")}`);
        return;
      }
      if (
        !newAttraction.name ||
        !newAttraction.description ||
        !newAttraction.country ||
        !newAttraction.countryExhibition ||
        !newAttraction.state ||
        !newAttraction.stateAcronym ||
        !newAttraction.address ||
        !newAttraction.continent ||
        !newAttraction.entry ||
        !newAttraction.images.image ||
        !newAttraction.images.alt
      ) {
        res.status(400).send("Missing required fields");
        return;
      }
      const createdAttraction: Attraction =
        await attractionsService.createAttraction(newAttraction);
      res.status(201).json(createdAttraction);
    } catch (error) {
      console.error("Error while creating attraction", error);
      res.status(500).send("Internal server error");
    }
  }

  public async createMultipleAttractions(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const newAttractions: Attraction[] = req.body;
      const invalidAttractions = newAttractions.filter((attraction) => {
        const invalidKeys = Object.keys(attraction).filter(
          (key) => !AttractionSchema.obj.hasOwnProperty(key)
        );
        return invalidKeys.length > 0;
      });

      if (invalidAttractions.length > 0) {
        const invalidAttractionNames = invalidAttractions.map(
          (attraction) => attraction.name
        );
        res
          .status(400)
          .send(
            `Invalid keys found in attractions: ${invalidAttractionNames.join(
              ", "
            )}`
          );
        return;
      }
      const missingFields = newAttractions.some(
        (attraction) =>
          !attraction.name ||
          !attraction.description ||
          !attraction.country ||
          !attraction.countryExhibition ||
          !attraction.state ||
          !attraction.stateAcronym ||
          !attraction.address ||
          !attraction.continent ||
          !attraction.entry ||
          !attraction.images.image ||
          !attraction.images.alt
      );
      if (missingFields) {
        res.status(400).send("Missing required fields");
        return;
      }
      const createdAttractions: Attraction[] =
        await attractionsService.createMultipleAttractions(newAttractions);
      res.status(201).json(createdAttractions);
    } catch (error) {
      console.error("Error while creating attractions", error);
      res.status(500).send("Internal server error");
    }
  }

  public async updateAttraction(req: Request, res: Response): Promise<void> {
    const attractionId: string = req.params.id;
    const updatedAttraction: Attraction = req.body;

    try {
      await attractionsService.updateAttraction(
        attractionId,
        updatedAttraction
      );
      res.status(200).send("Attraction updated successfully");
    } catch (error) {
      console.error(
        `Error while updating attraction with id ${attractionId}`,
        error
      );
      res.status(404).send("Attraction not found");
    }
  }

  public async deleteAttraction(req: Request, res: Response): Promise<void> {
    const attractionId: string = req.params.id;
    try {
      const result: boolean = await attractionsService.deleteAttraction(
        attractionId
      );
      res.status(200).send("Attraction deleted successfully");
    } catch (error) {
      console.error(
        `Error while deleting attraction with id ${attractionId}`,
        error
      );
      res.status(500).send("Internal server error");
    }
  }

  public async deleteAllAttractions(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const result: boolean = await attractionsService.deleteAllAttractions();
      if (result) {
        res.status(200).send("All Attractions deleted successfully");
      } else {
        res.status(404).send("No Attractions found to delete");
      }
    } catch (error) {
      console.error("Error while deleting all attractions", error);
      res.status(500).send("Internal server error");
    }
  }
}
