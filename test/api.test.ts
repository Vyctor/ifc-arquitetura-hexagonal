import axios from "axios";

test("should do car check-in", async () => {
  await axios({
    url: "http://localhost:3000/check-in",
    method: "post",
    data: {
      plate: "AAA-9999",
      checkin_date: "2022-03-01T12:00:00",
    },
  });

  const responseGetParkedCars = await axios({
    url: "http://localhost:3000/parked-cars",
    method: "get",
  });

  const responseCheckout = await axios({
    url: "http://localhost:3000/check-out",
    method: "get",
    data: {
      plate: "AAA-9999",
      checkin_date: "2022-03-01T14:00:00",
    },
  });

  const ticket = responseCheckout.data;
  expect(ticket.period).toBe(2);
  expect(ticket.price).toBe(20);
});
