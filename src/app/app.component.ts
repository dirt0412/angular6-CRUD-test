import { Component, OnInit } from '@angular/core';
import { ProductService } from '../app/services/products/product.service';
import { Product } from '../app/models/productModel';
import { clone } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  products: Product[];
  productForm: boolean = false;
  editProductForm: boolean = false;
  isNewForm: boolean;
  newProduct: Product;
  editedProduct: any = {};

  constructor(private _productService: ProductService) {
    this.newProduct = new Product();
    console.log(this.newProduct);
   }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.products = this._productService.getProductsFromData();
  }

  showEditProductForm(product: Product) {
    if(!product) {
      this.productForm = false;
      return;
    }
    this.editProductForm = true;
    this.editedProduct = clone(product);
  }

  showAddProductForm() {
    // resets form if edited product
    if(this.products.length) {
      this.newProduct = new Product();
    }
    this.productForm = true;
    this.isNewForm = true;
  }

  saveProduct(product: Product) {
    if(this.isNewForm) {
      // add a new product
      this._productService.addProduct(product);
    }
    this.productForm = false;
  }

  removeProduct(product: Product) {
    this._productService.deleteProduct(product);
  }

  updateProduct() {
    this._productService.updateProduct(this.editedProduct);
    this.editProductForm = false;
    this.editedProduct = {};
  }

  cancelNewProduct() {
    this.newProduct = new Product();
    this.productForm = false;
  }

  cancelEdits() {
    this.editedProduct = {};
    this.editProductForm = false;
  }

  
}
