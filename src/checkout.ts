import ParkedCarRepository from "./ParkedCarRepository";

type Input = {
  plate: string;
  checkout_date: string;
};

type Output = {
  price: number;
  period: number;
};

export default class Checkout {
  constructor(readonly parkedCarRepository: ParkedCarRepository) {}

  async execute(input: Input): Promise<Output> {
    const parkedCar = await this.parkedCarRepository.get(input.plate);

    parkedCar.checkout(input.checkout_date);

    await this.parkedCarRepository.update(parkedCar);

    return {
      price: parkedCar.price,
      period: parkedCar.diff,
    };
  }
}
