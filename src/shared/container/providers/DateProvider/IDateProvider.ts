import { QUnitType, OpUnitType } from "dayjs";

interface IDateProvider {
  compare(
    start_date: Date,
    end_date: Date,
    unit: QUnitType | OpUnitType
  ): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
}

export { IDateProvider };
