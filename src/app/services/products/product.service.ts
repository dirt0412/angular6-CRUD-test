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
    return this.http.get<ProductModel[]>(`${environment.urlApiRootEndpoint}api/product`, {
      headers: this.headers
    }
    );
  }

  addProduct(product: ProductModel): Observable<ProductModel>{
   return this.http.post<ProductModel>(
      environment.urlApiRootEndpoint + 'api/product',
      JSON.stringify({ product: product }),
      { headers: this.headers }
    )     
  }

  updateProduct(product: ProductModel): Observable<ProductModel>{
    console.log("http PUT");   
    
      return this.http.put<ProductModel>(
        environment.urlApiRootEndpoint + 'api/product/' + product.id,
        JSON.stringify({ product: product }),
        { headers: this.headers }
      )
      // .pipe(
      //   //catchError(this.handleError('updateHero', hero))
      // );


        // .subscribe(
        // val => {
        //   console.log("PUT call successful value returned in body",
        //     val);
        // },
        // response => {
        //   console.log("PUT call in error", response);
        // },
        // () => {
        //   console.log("The PUT observable is now completed.");
        // }
        // );  
  }

  deleteProduct(product: ProductModel) {
    this.http.delete(
      environment.urlApiRootEndpoint + 'api/product/' + product.id,
      { headers: this.headers }
    )
      .subscribe(response => {

      });
  }

}