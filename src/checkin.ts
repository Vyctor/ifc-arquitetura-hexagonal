import ParkedCarRepository from "./ParkedCarRepository";
import ParkedCar from "./ParkedCar";
type Input = {
  plate: string;
  checkin_date: string;
};

export default class Checkin {
  constructor(readonly parkedCarRepository: ParkedCarRepository) {}

  async execute(input: Input): Promise<void> {
    const { plate, checkin_date } = input;

    const parkedCar = new ParkedCar(plate, new Date(checkin_date));

    await this.parkedCarRepository.save(parkedCar);
  }
}
