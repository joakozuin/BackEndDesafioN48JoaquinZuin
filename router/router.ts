import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
} from "../controllers/car.ts";

import { login } from "../controllers/user.ts";

import { authMiddleware } from "../middlewares/auth.ts";

const router = new Router();

router
  .post("/users/login", login)
  .get("/cars", authMiddleware, getCars)
  .get("/car/:id", authMiddleware, getCar)
  .post("/cars", authMiddleware, createCar)
  .put("/cars/:id", authMiddleware, updateCar)
  .delete("/cars/:id", authMiddleware, deleteCar);

export default router;
