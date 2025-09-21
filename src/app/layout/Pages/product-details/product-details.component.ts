import { Component } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { Subscribable, Subscription } from 'rxjs';
import { Iproduct } from '../../../core/interface/iproduct';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  getItemSub! : Subscription ; 

  // subscriptions
  getAtivatedSub!: Subscription;

    // product data
    getDetails:Iproduct = {} as Iproduct;


  constructor( private _product:ProductsService, private _activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.getAtivatedSub = this._activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.getProductDetails(params.get('id')!);
      }
    });
  }


  getProductDetails(id:string): void {
    this.getItemSub = this._product.getItemDetails(id).subscribe({
      next: (res) => {
        console.log(res)
        this.getDetails = res;
      }
    });
  }

}
