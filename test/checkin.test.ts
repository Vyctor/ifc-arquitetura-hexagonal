import Checkin from "../src/checkin";
import Checkout from "../src/checkout";
import GetParkedCars from "../src/getParkedCars";
import ParkedCarDatabaseRepository from "../src/ParkedCarDatabaseRepository";
import ParkedCarMemoryRepository from "../src/ParkedCardMemoryRepository";
import PostgreSQLAdapter from "../src/PostgreSQLAdapter";

test("It should do car check-in", async () => {
  const connection = new PostgreSQLAdapter();
  const parkedCarDatabaseRepository = new ParkedCarDatabaseRepository(
    connection
  );
  const parkedCarMemoryRepository = new ParkedCarMemoryRepository();
  const checkin = new Checkin(parkedCarMemoryRepository);

  await checkin.execute({
    plate: "AAA-9999",
    checkin_date: "2022-03-01T12:00:00",
  });

  const getParkedCars = new GetParkedCars(parkedCarMemoryRepository);
  const parkedCars = await getParkedCars.execute();

  expect(parkedCars.length).toBe(1);

  const checkout = new Checkout(parkedCarMemoryRepository);
  const ticket = await checkout.execute({
    plate: "AAA-9999",
    checkout_date: "2022-03-01T14:00:00",
  });

  expect(ticket.period).toBe(2);
  expect(ticket.price).toBe(20);

  await connection.close();
});
