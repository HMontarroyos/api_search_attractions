import { Document, Schema, model } from "mongoose";

export interface State extends Document {
  name: string;
  acronym: string;
  country: string;
  countryExhibition: string;
  region: string;
  images: {
    image: string;
    alt: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const StateSchema: Schema = new Schema({
  name: { type: String, required: true },
  acronym: {type: String, required: true},
  country: { type: String, required: true },
  countryExhibition: { type: String, required: true },
  region: { type: String, required: true },
  images: {
    image: { type: String, required: true },
    alt: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<State>("State", StateSchema);
