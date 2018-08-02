import { Component, OnInit } from '@angular/core';
import { ProductService } from '../app/services/products/product.service';
import { ProductModel } from '../app/models/productModel';
import { clone } from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  productsArray: ProductModel[] = [];
  productForm: boolean = false;
  editProductForm: boolean = false;
  isNewForm: boolean;
  newProduct: ProductModel;
  editedProduct: any = {};
  private getProductsSubscribe: Subscription;

  constructor(private _productService: ProductService) {

  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productsArray = [];
    this.getProductsSubscribe = this._productService.getProductsFromData().subscribe((ProductModel) => {
      ProductModel.forEach(element => {
        this.productsArray.push(element);
      });
    });
  }

  showEditProductForm(product: ProductModel) {
    if (!product) {
      this.productForm = false;
      return;
    }
    this.editProductForm = true;
    this.editedProduct = clone(product);
  }

  showAddProductForm() {
    // resets form if edited product
    if (this.productsArray.length) {
      this.newProduct = new ProductModel();
    }
    this.productForm = true;
    this.isNewForm = true;
  }

  saveProduct(product: ProductModel) {
    if (this.isNewForm) {
      if (product.name != undefined && product.description != undefined && product.price != undefined) {
        // add a new product
        this._productService.addProduct(product)
        this.getProducts();
      }
      else
        alert('Please fill all data.');
    }
    this.productForm = false;
  }

  removeProduct(product: ProductModel) {
    this._productService.deleteProduct(product);
    this.getProducts();
  }

  updateProduct() {
    if (this.editedProduct.name != undefined && this.editedProduct.description != undefined && this.editedProduct.price != undefined) {
      this._productService.updateProduct(this.editedProduct);
      this.editProductForm = false;
      this.editedProduct = {};
      this.getProducts();
    }
  }

  cancelNewProduct() {
    this.newProduct = new ProductModel();
    this.productForm = false;
  }

  cancelEdits() {
    this.editedProduct = {};
    this.editProductForm = false;
  }

  ngOnDestroy() {
    this.getProductsSubscribe.unsubscribe();
  }


}
