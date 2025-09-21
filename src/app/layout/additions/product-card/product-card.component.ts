import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../../core/services/products.service';
import { Subscription } from 'rxjs';
import { Iproduct } from '../../../core/interface/iproduct';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  getItemSub!: Subscription;
  Allproduct:Iproduct[] = [];

  constructor(private _product:ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.getItemSub = this._product.getItems().subscribe({
      next: (res) => {
        this.Allproduct = res
        console.log(this.Allproduct)
      }
    });
  }

}
