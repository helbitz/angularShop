import { TranslateService } from "./../../../../shared/services/translate.service";
import { Component, OnInit, VERSION } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./../../../../shared/services/auth.service";
import { UserService } from "./../../../../shared/services/user.service";
import { ProductService } from "./../../../../shared/services/product.service";

import { ThemeService } from "src/app/shared/services/theme.service";
declare var $: any;

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  angularVersion = VERSION;

  colorPallet1 = [
    {
      title: "Purple Theme",
      color: "color-purple",
      id: "purple-theme",
    },
    {
      title: "Blue Theme",
      color: "color-blue",
      id: "blue-theme",
    },
  ];

  colorPallet2 = [
    {
      title: "Red Theme",
      color: "color-red",
      id: "red-theme",
    },
    {
      title: "Violet Theme",
      color: "color-violet",
      id: "violet-theme",
    },
  ];
  languageList = [
    { language: "English", langCode: "en" },
    { language: "French", langCode: "fr" },
    { language: "Persian", langCode: "fa" },
    { language: "Japanese", langCode: "ja" },
    { language: "Hindi", langCode: "hin" },
  ];

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private router: Router,
    public productService: ProductService,
    public translate: TranslateService,
    private themeService: ThemeService
  ) {
    console.log(translate.data);
  }

  ngOnInit() {}
  logout() {

    debugger
    console.log(this.authService.currUser);
    this.authService.logout();

    this.router.navigate(["/"]);
  }

  setLang(lang: string) {
    console.log("Language", lang);
    this.translate.use(lang).then(() => {});
  }

  updateTheme(theme: string) {
    this.themeService.updateThemeUrl(theme);
  }
}
