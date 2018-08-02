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

  //GET http://localhost/api/product
  getProductsFromData(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${environment.urlApiRootEndpoint}api/product`, {
      headers: this.headers
    }
    );
  }

    //POST http://localhost/api/product
  addProduct(product: ProductModel): Observable<ProductModel>{
   return this.http.post<ProductModel>(
      environment.urlApiRootEndpoint + 'api/product',
      JSON.stringify({ product: product }),
      { headers: this.headers }
    )     
  }

    //PUT http://localhost/api/product/id
  updateProduct(product: ProductModel): Observable<ProductModel>{   
      return this.http.put<ProductModel>(
        environment.urlApiRootEndpoint + 'api/product/' + product.id,
        JSON.stringify({ product: product }),
        { headers: this.headers }
      )     
  }

    //DELETE http://localhost/api/product/id
  deleteProduct(product: ProductModel) {
    this.http.delete(
      environment.urlApiRootEndpoint + 'api/product/' + product.id,
      { headers: this.headers }
    )
      .subscribe(response => {

      });
  }

}