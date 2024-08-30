import { IconProp } from '@fortawesome/fontawesome-svg-core';
export interface TransactionModel {
  id?: number;
  transactionName: string;
  transactionType?: string; // Szükséges volt bevezetnem, hogy a két típusú tranzakciót elkülönítsem:Era
  transactionAmount: number;
  transactionDate: string;
  transactionCategory: string;
  transactionMethod: string;
  icon?: IconProp; // Opcionális ikon
}
