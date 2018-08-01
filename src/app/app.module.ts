import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProductService } from '../app/services/products/product.service';

import { NumberOnlyDirective } from './common/number.directive';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    NumberOnlyDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
