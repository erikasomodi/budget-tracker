import { BudgetModel } from "./budget.model";

export interface UserModel {
  id?: string;
  name: string;
  age: number;
  married: boolean;
  numberOfChildren: number;
  startBudget: number;
  monthlySalary: number;
  budget: BudgetModel;
}
