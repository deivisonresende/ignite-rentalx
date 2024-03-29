import { QUnitType, OpUnitType } from "dayjs";

interface IDateProvider {
  compare(
    start_date: Date,
    end_date: Date,
    unit: QUnitType | OpUnitType
  ): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  compareIfBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
