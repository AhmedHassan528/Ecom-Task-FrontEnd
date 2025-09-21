import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import RouteUrl from '../../RouteUrl';
import { Iproduct, ProductCreateRequest, ProductUpdateRequest } from '../interface/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }

  // Get all products
  getAllProducts(): Observable<Iproduct[]>{
    return this._http.get<Iproduct[]>(`${RouteUrl}/api/Products`);
  }

  // Get product by code
  getProductByCode(productCode: string): Observable<Iproduct>{
    return this._http.get<Iproduct>(`${RouteUrl}/api/Products/${productCode}`);
  }

  // Create new product
  createProduct(product: ProductCreateRequest, imageFile?: File): Observable<any>{
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('price', product.price.toString());
    formData.append('minimumQuantity', product.minimumQuantity.toString());
    formData.append('discountRate', product.discountRate.toString());
    
    // Always send ImageCoverFile - use actual file or create a dummy one
    if (imageFile) {
      formData.append('imageCoverFile', imageFile);
    } else {
      // Create a minimal dummy file to satisfy the required field
      const dummyFile = new File([''], 'dummy.txt', { type: 'text/plain' });
      formData.append('imageCoverFile', dummyFile);
    }
    
    return this._http.post(`${RouteUrl}/api/Products`, formData);
  }

  // Update existing product
  updateProduct(product: ProductUpdateRequest, imageFile?: File): Observable<any>{
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('price', product.price.toString());
    formData.append('minimumQuantity', product.minimumQuantity.toString());
    formData.append('discountRate', product.discountRate.toString());
    
    // Always send ImageCoverFile - use actual file or create a dummy one
    if (imageFile) {
      formData.append('imageCoverFile', imageFile);
    } else {
      // Create a minimal dummy file to satisfy the required field
      const dummyFile = new File([''], 'dummy.txt', { type: 'text/plain' });
      formData.append('imageCoverFile', dummyFile);
    }
    
    return this._http.put(`${RouteUrl}/api/Products/${product.productCode}`, formData);
  }

  // Delete product
  deleteProduct(productCode: string): Observable<any>{
    return this._http.delete(`${RouteUrl}/api/Products/${productCode}`);
  }

  // Legacy methods for backward compatibility
  getItems(): Observable<any>{
    return this._http.get(`${RouteUrl}/api/Products`);
  }

  getItemDetails(id:string | null): Observable<any>{
    return this._http.get(`${RouteUrl}/api/products/${id}`);
  }
}
