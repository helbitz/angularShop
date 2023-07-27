import {
  AngularFireList,
  AngularFireObject,
  AngularFireDatabase,
} from "@angular/fire/database";
import { Billing } from "./../models/billing";
import { Injectable } from "@angular/core";
import { LoginComponent } from "../../views/base/index/login/login.component";
import { AuthService } from "../services/auth.service";



@Injectable({
  providedIn: "root",
})
export class ShippingService {
  shippings: AngularFireList<Billing>;
  shipping: AngularFireObject<Billing>;
  auth: AuthService;
  constructor(private db: AngularFireDatabase) {
    this.getshippings();
  }

  createshippings(data: Billing) {
    debugger;
    
    //console.log(JSON.parse(localStorage.getItem(user)));
    console.log(localStorage);
    this.shippings.push(data);
  }

  getshippings() {
    this.shippings = this.db.list("shippings");
    return this.shippings;
  }

  getshippingById(key: string) {
    this.shipping = this.db.object("products/" + key);
    return this.shipping;
  }

  updateshipping(data: Billing) {
    this.shippings.update(data.$key, data);
  }

  deleteshipping(key: string) {
    this.shippings.remove(key);
  }
}
