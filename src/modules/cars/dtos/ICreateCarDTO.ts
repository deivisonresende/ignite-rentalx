export interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  available?: boolean;
  fine_amount: number;
  brand: string;
  category_id?: string;
}
