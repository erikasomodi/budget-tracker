import { Injectable } from "@angular/core";
import {
  DocumentData,
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "@angular/fire/firestore";

import { Observable, from, map } from "rxjs";
import { UserModel } from "../models/user.model";
import { TransactionModel } from "../models/transaction.model";
import { ToastrService } from "ngx-toastr";
@Injectable({
  providedIn: "root",
})
export class TransactionService {
  constructor() {}
}
