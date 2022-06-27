export default class ParkedCar {
  diff: number = 0;
  price: number = 0;

  constructor(
    public plate: string,
    public checkin_date: Date,
    public checkout_date?: Date
  ) {}

  checkout(checkout_date: string): void {
    const checkinDate = new Date(this.checkin_date);
    const checkoutDate = new Date(checkout_date);
    this.diff =
      (checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60);
    this.price = this.diff * 10;
  }
}
