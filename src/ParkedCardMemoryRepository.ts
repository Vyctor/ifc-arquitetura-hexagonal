import ParkedCar from "./ParkedCar";
import ParkedCarRepository from "./ParkedCarRepository";
export default class ParkedCarMemoryRepository implements ParkedCarRepository {
  private readonly parkedCars: ParkedCar[];

  constructor() {
    this.parkedCars = Array<ParkedCar>();
  }

  async save(parkedCar: ParkedCar): Promise<void> {
    this.parkedCars.push(parkedCar);
  }

  async update(parkedCar: ParkedCar): Promise<void> {
    const existingParkedCard = await this.get(parkedCar.plate);
    existingParkedCard.checkout_date = parkedCar.checkout_date;
  }

  async list(): Promise<ParkedCar[]> {
    return this.parkedCars.filter((car) => !car.checkout_date);
  }

  async get(plate: string): Promise<ParkedCar> {
    const parkedCar = this.parkedCars.find(
      (car) => car.plate === plate && !car.checkout_date
    );

    if (parkedCar) {
      return parkedCar;
    }

    throw new Error("Parked car not found");
  }
}
