import { Document, Schema, model } from "mongoose";

export interface Attraction extends Document {
  name: string;
  description: string;
  country: string;
  countryExhibition: string;
  state?: string;
  address: string;
  continent: string;
  operation: {
    day: string;
    hour: string;
  }[];
  entry: string;
  images: {
    image: string;
    alt: string;
  };
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const AttractionSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  country: { type: String, required: true },
  countryExhibition: { type: String, required: true },
  state: { type: String, required: false },
  address: { type: String, required: true },
  continent: { type: String, required: true },
  operation: [
    {
      day: { type: String, required: true },
      hour: { type: String, required: true },
    },
  ],
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
