import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

//import * as moment from "moment";
import { User } from "../models/user";
import { Product } from "../models/product";
import { newArray } from "@angular/compiler/src/util";
import { formatDate } from "@angular/common";

@Injectable()
export class UserService {
  selectedUser: User = new User();
  users: AngularFireList<User>;

  location = {
    lat: null,
    lon: null,
  };

  constructor(private db: AngularFireDatabase) {
    this.getUsers();
  }

  getUsers() {
    let userArr = new Array<User>();
    this.users = this.db.list("clients");

    this.users.valueChanges().subscribe((users: User[]) => {
      userArr = [...users];
    });
    return userArr;
  }

  getUserById(id: string) {
    debugger;
    const users = this.getUsers();
    return users.filter((user) => {
      if (user.uid == id) return user;
    })[0];
  }

  createUser(data: any) {
    let products = new Array<Product>();
    products.push(new Product());
    products[0].productId = 0;
    debugger;
    const updatedData = {
      ...data,
      location: this.location,
      wishlist: products,
      createdOn: Date.now().toLocaleString("English"),
      isAdmin: false,
    };
    this.users.push(updatedData);
  }

  isAdmin(emailId: string) {
    return this.db.list("clients", (ref) =>
      ref.orderByChild("email").equalTo(emailId)
    );
  }

  updateUser(user: User) {
    this.users.update(user.$key, user);
  }

  setLocation(lat: any, lon: any) {
    this.location = { lat, lon };
  }
}
