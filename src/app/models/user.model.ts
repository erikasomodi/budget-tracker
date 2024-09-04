import { TransactionModel } from "./transaction.model";

export interface UserModel {
  id?: string | null | undefined;
  name: string | null;
  email: string | null;
  password: string;
  age: number;
  married: boolean;
  numberOfChildren: number;
  startBudget: number;
  monthlySalary: number;
  transactions: TransactionModel[];
  role?: string;
}
