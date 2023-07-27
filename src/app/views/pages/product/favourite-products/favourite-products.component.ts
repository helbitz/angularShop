import { Component, OnInit } from "@angular/core";
import { Product } from "../../../../shared/models/product";
import { ProductService } from "../../../../shared/services/product.service";
import { UserService } from "../../../../shared/services/user.service";
import { AuthService } from "../../../../shared/services/auth.service";
@Component({
  selector: "app-favourite-products",
  templateUrl: "./favourite-products.component.html",
  styleUrls: ["./favourite-products.component.scss"],
})
export class FavouriteProductsComponent implements OnInit {
  favoruiteProducts: Product[];
  showDataNotFound = true;

  // Not Found Message
  messageTitle = "No Favourite Products Found";
  messageDescription = "Please, choose your favourite products";

  constructor(private productService: ProductService,private authService: AuthService,private userService: UserService) {}

  ngOnInit() {
    this.getFavouriteProduct();
  }
  removeFavourite(product: Product) {
    this.productService.removeLocalFavourite(product);

    this.getFavouriteProduct();
  }

  getFavouriteProduct() {
    let islogged: boolean;
    this.authService.isLoggedIn$.subscribe((value: boolean) =>{
      islogged = value;

    })
    if (islogged) {
      const currUser = this.userService.getUserById(this.authService.currUser.uid)
      if(currUser.wishlist == null) { return false; }
      console.log(currUser.wishlist)
    }
    
    this.favoruiteProducts = this.productService.getLocalFavouriteProducts();
  }
}
