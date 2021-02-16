import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PagesModule} from '../app/pages/pages.module';
import {HomeComponent} from './pages/home/home.component';
import {ProductsComponent} from './pages/products/products.component';
import {HeaderComponent} from './pages/header/header.component';
import {FooterComponent} from './pages/footer/footer.component';
import {AccountComponent} from './pages/account/account.component';
import {HttpClientModule} from '@angular/common/http'
import { CartComponent } from './pages/cart/cart.component';
// import all necessary modules
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    HeaderComponent,
    FooterComponent,
    AccountComponent,
    CartComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
