import { Injectable } from '@angular/core';
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
} from '@angular/fire/firestore';

import { Observable, from, map, switchMap } from 'rxjs';

import { UserModel } from '../models/user.model';
import { TransactionModel } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly usersCollectionRef = collection(this.firestore, 'users');

  constructor(private firestore: Firestore) {}

  //* CREATE USER - Automatikusan generált ID-val
  createUser(user: UserModel): Observable<DocumentData> {
    user.role = 'user';
    return from(addDoc(this.usersCollectionRef, user));
  }

  //* CREATE USER - Meghatározott ID-val
  createUserWithId(
    userId: string | null | undefined,
    user: UserModel
  ): Observable<void> {
    const userDoc = doc(this.firestore, `users/${userId}`);
    user.role = 'user';
    return from(setDoc(userDoc, { ...user, id: userId }));
  }

  //* READ ONE USER - nem teremt folyamatos kapcsolatot egyszeri olvasás
  getUserWithGetDoc(id: string | null | undefined) {
    const userDoc = doc(this.firestore, `users/${id}`);
    return from(getDoc(userDoc)).pipe(
      map((doc) => {
        const userData: UserModel = doc.data() as UserModel;
        userData.id = doc.id;
        return userData;
      })
    );
  }

  //* READ ALL USER
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

  //* DELETE USER
  deletUser(userId: string): Observable<void> {
    const userDoc = doc(this.firestore, `users/${userId}`);
    return from(deleteDoc(userDoc));
  }

  //* UPDATE USER
  updateUser(user: UserModel): Observable<void> {
    const userDoc = doc(this.firestore, `users/${user.id}`);
    return from(setDoc(userDoc, user));
  }

  //* ADD Transaction to USER
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
  //* UPDATE Transaction
  updateTransaction(
    userId: string,
    updatedTransaction: TransactionModel
  ): Observable<void> {
    const userDoc = doc(this.firestore, `users/${userId}`);
    return from(getDoc(userDoc)).pipe(
      switchMap((docSnapshot) => {
        const userData = docSnapshot.data() as UserModel;
        if (userData && userData.transactions) {
          const updatedTransactions = userData.transactions.map((transaction) =>
            transaction.id === updatedTransaction.id
              ? { ...transaction, ...updatedTransaction }
              : transaction
          );

          return from(
            updateDoc(userDoc, { transactions: updatedTransactions })
          );
        } else {
          throw new Error(
            'A felhasználónak nincsenek tranzakciói vagy nem található a felhasználó.'
          );
        }
      })
    );
  }

  //* READ ONE TRANSACTION FROM USER
  getTransactionWithGetDoc(
    userId: string,
    transactionId: number | undefined
  ): Observable<TransactionModel | undefined> {
    const userDoc = doc(this.firestore, `users/${userId}`);
    return from(getDoc(userDoc)).pipe(
      map((docSnapshot) => {
        const userData = docSnapshot.data() as UserModel;

        if (userData && userData.transactions) {
          const transaction = userData.transactions.find(
            (t) => t.id === transactionId
          );
          return transaction;
        } else {
          return undefined;
        }
      })
    );
  }

  //* READ ALL TRANSACTION FROM USER
  getUserTransactions(userId: string): Observable<TransactionModel[]> {
    const userDoc = doc(this.firestore, `users/${userId}`);
    return from(getDoc(userDoc)).pipe(
      map((docSnapshot) => {
        const data = docSnapshot.data();
        return data ? data['transactions'] || [] : [];
      })
    );
  }

  //* DELETE TRANSACTION FROM USER
  removeTransactionFromUser(
    userId: string,
    transactionId: number | undefined
  ): Observable<void> {
    const userDoc = doc(this.firestore, `users/${userId}`);
    return from(getDoc(userDoc)).pipe(
      switchMap((docSnapshot) => {
        const userData = docSnapshot.data() as UserModel;
        if (userData && userData.transactions) {
          const updatedTransactions = userData.transactions.filter(
            (transaction) => transaction.id !== transactionId
          );

          // Frissítjük a felhasználó dokumentumot a módosított tranzakció tömbbel
          return from(
            updateDoc(userDoc, { transactions: updatedTransactions })
          );
        } else {
          throw new Error(
            'A felhasználónak nincsenek tranzakciói vagy nem található a felhasználó.'
          );
        }
      })
    );
  }
}
