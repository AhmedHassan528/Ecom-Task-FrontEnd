import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FooterComponent } from './layout/additions/footer/footer.component';
import { NavBarComponent } from './layout/additions/nav-bar/nav-bar.component';
import { ProductCardComponent } from "./layout/additions/product-card/product-card.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavBarComponent, ProductCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(){}
  title = 'FrontEndTest';
  ngOnInit(): void {
    initFlowbite();
  }


}
