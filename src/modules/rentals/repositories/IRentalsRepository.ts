interface IRentalsRepository {
  findOpenRentalByUser(car_id: string): Promise<Rental>;
  findOpenRentalByCarId(user_id: string): Promise<Rental>;
}
