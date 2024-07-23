import { TransactionModel } from "./transaction.model";

export interface UserModel {
  id?: string;
  name: string;
  age: number;
  married: boolean;
  numberOfChildren: number;
  startBudget: number;
  monthlySalary: number;
  transactions: TransactionModel[];
}
