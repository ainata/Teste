import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../core/model/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getProduct(): Observable<Product[]> {
    const url = `${environment.API}products`;
    return this.http.get<Product[]>(url);
  }

  getProductById(id: string|null): Observable<Product> {
    const url = `${environment.API}products/${id}`;
    return this.http.get<Product>(url);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    const url = `${environment.API}products/${id}`;
    return this.http.put<Product>(url, product);
  }

  addProduct(product: Product){
    const url = `${environment.API}products`;
    return this.http.post<Product>(url, product);

  }

  deleteProduct(id:number){
    const url = `${environment.API}products/${id}`;
    return this.http.delete(url);
  }

}
