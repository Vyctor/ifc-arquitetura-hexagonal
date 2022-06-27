type ParkedCar = {
  plate: string;
  checkin_date: Date;
};

import ParkedCarRepository from "./ParkedCarRepository";
export default class GetParkedCars {
  constructor(readonly parkedCarRepository: ParkedCarRepository) {}

  async execute(): Promise<ParkedCar[]> {
    const parkedCars = await this.parkedCarRepository.list();

    return parkedCars;
  }
}
