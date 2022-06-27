import express, { Request, Response } from "express";
import pgp from "pg-promise";
import Checkin from "./checkin";
import GetParkedCars from "./getParkedCars";
import Checkout from "./checkout";
import ParkedCarDatabaseRepository from "./ParkedCarDatabaseRepository";
import PostgreSQLAdapter from "./PostgreSQLAdapter";

const app = express();
app.use(express.json());

const connection = new PostgreSQLAdapter();
const parkedCardRepository = new ParkedCarDatabaseRepository(connection);

app.post("/checkin", async function (request: Request, response: Response) {
  const checkin = new Checkin(parkedCardRepository);

  await checkin.execute({
    plate: request.body.plate,
    checkin_date: request.body.checkin_date,
  });
  return response.end();
});

app.post("/parked-cars", async (request: Request, response: Response) => {
  const getParkedCars = new GetParkedCars(parkedCardRepository);

  const parkedCars = await getParkedCars.execute();

  return response.json(parkedCars);
});

app.post("/checkout", async (request: Request, response: Response) => {
  const checkout = new Checkout(parkedCardRepository);

  const ticket = await checkout.execute({
    plate: request.body.plate,
    checkout_date: request.body.checkout_date,
  });

  return response.json(ticket);
});

app.listen(3000);
