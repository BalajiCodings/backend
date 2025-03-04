import express, { Request, Response, Router } from "express";
import { Restaurant } from "../models/Restaurant.js";

const router: Router = express.Router();

// Fetch all restaurants
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Fetch a single restaurant by ID
router.get("/:id", async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Add a new restaurant
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const newRestaurant = new Restaurant(req.body);
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Add a review to a restaurant
router.post("/:id/reviews", async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }

    if (!restaurant.reviews) {
      restaurant.reviews = [];
    }

    restaurant.reviews.push(req.body);
    restaurant.reviewCount = restaurant.reviews.length;
    restaurant.rating =
      restaurant.reviews.reduce((acc, review) => acc + review.rating, 0) /
      restaurant.reviewCount || 0;

    await restaurant.save();
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
