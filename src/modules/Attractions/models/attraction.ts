import { Document, Schema, model } from "mongoose";


export interface Attraction extends Document {
  name: string;
  description: string;
  country: string;
  countryExhibition: string;
  state: string;
  stateAcronym: string;
  address: string;
  continent: string;
  entry: string;
  images: {
    image: string;
    alt: string;
  };
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const AttractionSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  country: { type: String, required: true },
  countryExhibition: { type: String, required: true },
  state: { type: String, required: true },
  stateAcronym: {type: String, required: true},
  address: { type: String, required: true },
  continent: { type: String, required: true },
  entry: { type: String, required: true },
  images: {
    image: { type: String, required: true },
    alt: { type: String, required: true },
  },
  rating: { type: Number, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<Attraction>("Attraction", AttractionSchema);
