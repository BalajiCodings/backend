import mongoose, { Schema, Document } from "mongoose";

interface IReview {
  userName: string;
  rating: number;
  date: Date;
  comment: string;
}

export interface IRestaurant extends Document {
  name: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  address: string;
  image: string;
  description?: string;
  reviews?: IReview[];
}

const RestaurantSchema = new Schema<IRestaurant>({
  name: { type: String, required: true },
  cuisine: { type: String, required: true },
  rating: { type: Number, required: true },
  reviewCount: { type: Number, default: 0 },
  address: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  reviews: [{ userName: String, rating: Number, date: Date, comment: String }],
});

export const Restaurant = mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);
