import ParkedCar from "../src/ParkedCar";
test("should do checkout", async () => {
  const parkedCar = new ParkedCar("AAA-9999", new Date("2022-03-01T12:00:00"));

  parkedCar.checkout("2022-03-01T14:00:00");

  expect(parkedCar.diff).toEqual(2);
  expect(parkedCar.price).toEqual(20);
});
