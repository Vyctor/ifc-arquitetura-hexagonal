import ParkedCar from "./ParkedCar";
import ParkedCarRepository from "./ParkedCarRepository";
import pgp from "pg-promise";
import Connection from "./Connection";

export default class ParkedCarDatabaseRepository
  implements ParkedCarRepository
{
  constructor(readonly connection: Connection) {}

  async save(parkedCar: ParkedCar): Promise<void> {
    await this.connection.query(
      "insert into branas.parked_car (plate, checkin_date) values ($1, $2)",
      [parkedCar.plate, parkedCar.checkin_date]
    );

    await this.connection.close();
  }

  async update(parkedCar: ParkedCar): Promise<void> {
    await this.connection.query(
      "update branas.parked_car set checkout_date = now() where plate = $1 and checkout_date is null",
      [parkedCar.plate]
    );

    await this.connection.close();
  }

  async list(): Promise<ParkedCar[]> {
    const dbResult: ParkedCar[] = await this.connection.query(
      "select * from branas.parked_card where checkout_date is null",
      []
    );

    await this.connection.close();

    return dbResult.map(
      (result) => new ParkedCar(result.plate, new Date(result.checkin_date))
    );
  }

  async get(plate: string): Promise<ParkedCar> {
    const dbResult = await this.connection.one(
      "select * from branas.parked_card where plate = $1 and checkout_date is null",
      [plate]
    );

    const parkedCar = new ParkedCar(
      dbResult.plate,
      new Date(dbResult.checkin_date)
    );

    await this.connection.close();

    return parkedCar;
  }
}
