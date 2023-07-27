import {
  AngularFireList,
  AngularFireObject,
  AngularFireDatabase,
} from "@angular/fire/database";
import { Billing } from "./../models/billing";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BillingService {
  billings: AngularFireList<Billing>;
  billing: AngularFireObject<Billing>;
  constructor(private db: AngularFireDatabase) {
    this.getBillings();
  }

  createBillings(data: Billing) {
    debugger;
    if(data.address2 === undefined)
      data.address2 = "";
      if(data.emailId === undefined)
      data.emailId = "";
      if(data.$key === undefined)
      data.$key = "anon";
    this.billings.push(data);
  }

  getBillings() {
    this.billings = this.db.list("billings");
    return this.billings;
  }

  getBillingById(key: string) {
    this.billing = this.db.object("products/" + key);
    return this.billing;
  }

  updateBilling(data: Billing) {
    this.billings.update(data.$key, data);
  }

  deleteBilling(key: string) {
    this.billings.remove(key);
  }
}
