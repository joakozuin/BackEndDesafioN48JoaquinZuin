import { Car } from "../types/car.ts";

//Array cars
let cars: Array<Car> = [
  {
    id: "1",
    model: "Kia Morning",
    price: 5490990,
  },
  {
    id: "2",
    model: "Kia Cerato",
    price: 10990990,
  },
  {
    id: "3",
    model: "Kia Sportage",
    price: 14990990,
  },
  {
    id: "4",
    model: "Kia Stinger",
    price: 29990990,
  },
  {
    id: "5",
    model: "Kia Rio",
    price: 7990990,
  },
];

//Return all cars from databases
const getCars = ({ response }: { response: any }) => {
  response.body = cars;
};

//Return car by id
const getCar = ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const car = cars.filter((car) => car.id == params.id)[0];
  if (car) {
    response.status = 200;
    response.body = car;
  } else {
    response.status = 404;
    response.body = { message: "404 Not found" };
  }
};

//Creates new car
const createCar = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const body = await request.body();
  const car: Car = body.value;
  cars.push(car);
  response.body = { success: true, data: car };
  response.status = 201;
};

//Update existing car
const updateCar = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  const car = cars.filter((car) => car.id == params.id)[0];
  if (cars) {
    const body = await request.body();
    car.model = body.value.model;
    car.price = body.value.price;
    response.status = 200;
    response.body = {
      success: true,
      data: cars,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      message: "Car not found",
    };
  }
};

//Delete car
const deleteCar = ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  cars = cars.filter((car) => car.id !== params.id);
  response.status = 200;
  response.body = { success: true, message: "Car removed" };
};

export { getCars, getCar, createCar, updateCar, deleteCar };
