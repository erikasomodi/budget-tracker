import { Injectable } from "@angular/core";
import {
  DocumentData,
  Firestore,
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "@angular/fire/firestore";

import { Observable, from, map, switchMap } from "rxjs";

import { UserModel } from "../models/user.model";
import { TransactionModel } from "../models/transaction.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly usersCollectionRef = collection(this.firestore, "users");

  constructor(private firestore: Firestore) {}

  //*CREATE - Automatikusan generált ID-val
  createUser(user: UserModel): Observable<DocumentData> {
    return from(addDoc(this.usersCollectionRef, user));
  }

  //* CREATE - Meghatározott ID-val
  createUserWithId(userId: string, user: UserModel): Observable<void> {
    const userDoc = doc(this.firestore, `users/${userId}`);
    return from(setDoc(userDoc, { ...user, id: userId }));
  }

  //*READ ONE - nem teremt folyamatos kapcsolatot egyszeri olvasás
  getUserWithGetDoc(id: string) {
    const userDoc = doc(this.firestore, `users/${id}`);
    return from(getDoc(userDoc)).pipe(
      map((doc) => {
        const userData: UserModel = doc.data() as UserModel;
        userData.id = doc.id;
        return userData;
      })
    );
  }

  // nem teremt folyamatos kapcsolatot, egyszer olvasás
  getUsersWithGetDocs(): Observable<UserModel[]> {
    return from(getDocs(this.usersCollectionRef)).pipe(
      map((snapshot) => {
        const resultList = snapshot.docs.map((doc) => {
          const userData: UserModel = doc.data() as UserModel;
          userData.id = doc.id;
          return userData;
        });
        return resultList;
      })
    );
  }

  //* DELETE
  deletUser(userId: string): Observable<void> {
    const userDoc = doc(this.firestore, `users/${userId}`);
    return from(deleteDoc(userDoc));
  }

  //* UPDATE
  updateUser(user: UserModel): Observable<void> {
    const userDoc = doc(this.firestore, `users/${user.id}`);
    return from(setDoc(userDoc, user));
  }

  addTransactionToUser(
    userId: string,
    transaction: TransactionModel
  ): Observable<void> {
    const userDoc = doc(this.firestore, `users/${userId}`);
    return from(
      updateDoc(userDoc, {
        transactions: arrayUnion(transaction),
      })
    );
  }
  removeTransactionFromUser(
    userId: string,
    transactionId: number | undefined
  ): Observable<void> {
    const userDoc = doc(this.firestore, `users/${userId}`);
    return from(getDoc(userDoc)).pipe(
      switchMap((docSnapshot) => {
        const userData = docSnapshot.data() as UserModel;
        if (userData && userData.transactions) {
          // Szűrjük ki a törlendő tranzakciót a tömbből
          const updatedTransactions = userData.transactions.filter(
            (transaction) => transaction.id !== transactionId
          );

          // Frissítjük a felhasználó dokumentumot a módosított tranzakció tömbbel
          return from(
            updateDoc(userDoc, { transactions: updatedTransactions })
          );
        } else {
          throw new Error(
            "A felhasználónak nincsenek tranzakciói vagy nem található a felhasználó."
          );
        }
      })
    );
  }

  getUserTransactions(userId: string): Observable<TransactionModel[]> {
    const userDoc = doc(this.firestore, `users/${userId}`);
    return from(getDoc(userDoc)).pipe(
      map((docSnapshot) => {
        const data = docSnapshot.data();
        return data ? data["transactions"] || [] : [];
      })
    );
  }
}
