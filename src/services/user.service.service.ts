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

@Injectable({
  providedIn: "root",
})
export class UserServiceService {
  private readonly usersCollectionRef = collection(this.firestore, "users");

  constructor(private firestore: Firestore) {}

  //*CREATE
  addUser(user: UserModel): Observable<DocumentData> {
    return from(addDoc(this.usersCollectionRef, user));
    // létrehozunk egy új felhasználót az adott firebase kollekcióban
  }

  //*READ ALL
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

  //* DELETE
  deletUser(movieId: string): Observable<void> {
    const userDoc = doc(this.firestore, `users/${movieId}`);
    return from(deleteDoc(userDoc));
  }

  //* UPDATE
  updateUser(movie: UserModel): Observable<void> {
    const userDoc = doc(this.firestore, `users/${movie.id}`);
    return from(setDoc(userDoc, movie));
  }
}
