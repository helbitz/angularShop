import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import * as firebase from "firebase/app";
import { BehaviorSubject, Observable, observable } from "rxjs";
import { filter, map } from "rxjs/operators";

import { User } from "../models/user";
import { UserService } from "./user.service";

export const ANONYMOUS_USER: User = new User();

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  currUser:firebase.User;
  private subject = new BehaviorSubject<User>(undefined);


  user$: Observable<User> = this.subject
    .asObservable()
    .pipe(filter((user) => !!user));

  isLoggedIn$: Observable<boolean> = this.user$.pipe(
    map((user) => !!user.$key)
  );

  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(
    map((isLoggedIn) => !isLoggedIn)
  );


  isAdmin$: Observable<boolean> = this.user$.pipe(
    map((user) => !!user.isAdmin)
  );

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService
  ) {
    this.user = firebaseAuth.authState;

    this.user.subscribe((user) => {
      console.log({ user });
      this.currUser = user;
      if (user) {
        this.userService
          .isAdmin(user.email)
          .snapshotChanges()
          .subscribe((data) => {
            if (!data.length) {
              this.subject.next(ANONYMOUS_USER);
              return;
            }

            data.forEach((el) => {
              const y: any = el.payload.toJSON();
              console.log({ y });
              this.subject.next({
                $key: y.uid || y.id,
                userName: user.displayName || "Anonymous User",
                emailId: y.email,
                uid: y.uid,
                phoneNumber: user.phoneNumber,
                avatar: user.photoURL,
                isAdmin: y.isAdmin,
                wishlist: y.wishlist,
              });
            });
          });
      } else {
        this.subject.next(ANONYMOUS_USER);
      }
    });
  }

  getUser() {
    debugger;
    let LogUser;
    this.user$.subscribe((user) =>
    {
      LogUser = user;
    });
    return LogUser;
  }

  
  logout() {
    this.firebaseAuth.signOut().then((res) => {
      this.subject.next(ANONYMOUS_USER);
      this.router.navigate(["/"]);
    });
  }


  createUserWithEmailAndPassword(emailID: string, password: string) {
    return this.firebaseAuth.createUserWithEmailAndPassword(emailID, password);
  }

  signInRegular(email: string, password: string) {
    debugger;
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  signInWithGoogle() {
    return this.firebaseAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }
}
