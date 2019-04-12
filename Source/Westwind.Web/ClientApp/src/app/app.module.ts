import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatToolbarModule,
  MatSelectModule,
  MatTableModule,
} from '@angular/material';

import { MatSortModule } from '@angular/material/sort';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from "./product-list/product-list.component"

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavMenuComponent,
    HomeComponent,
    ProductComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'product/add', component: ProductComponent },
      { path: 'product/edit/:productId', component: ProductComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent] // Startup
})
export class AppModule { }
