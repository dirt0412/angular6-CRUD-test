import { Injectable } from '@angular/core';
import { ProductModel } from '../../models/productModel';
import { PRODUCT_ITEMS } from '../../data/product-data';
import { findIndex } from 'lodash';
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProductService {
  private pItems = PRODUCT_ITEMS;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'token ' + environment.keyApi
    });
  }

  //https://localhost/api/product
  getProductsFromData(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${environment.urpApiRootEndpoint}api/product`, {
      headers: this.headers
    }
    );
  }

  addProduct(product: ProductModel) {
    //this.pItems.push(product);
    console.log(product);
    this.http.post(
      environment.urpApiRootEndpoint + 'api/product',
      JSON.stringify({ product: product }),
      { headers: this.headers }
    )
      .subscribe(response => {

      });
  }


  updateProduct(product: ProductModel) {
    this.http.put(
      environment.urpApiRootEndpoint + 'api/product/'+product.id,
      JSON.stringify({ product: product }),
      { headers: this.headers }
    )
      .subscribe(response => {

      });
  }

  deleteProduct(product: ProductModel) {
    this.http.delete(
      environment.urpApiRootEndpoint + 'api/product/'+product.id,
      {headers:  this.headers}
    )
    .subscribe(response => {
      
    });
  }

}