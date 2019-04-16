import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from "../products-service";
import { CategoriesService } from '../categories-service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { LoadingService } from '../loading-service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList;
  categoryList;
  dataSource;
  displayedColumns: string[] = ['productId', 'productName', 'categoryId'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productsService: ProductsService, private categoriesService: CategoriesService, private loadingService: LoadingService) { }

  ngOnInit() {

    //this.loadingService.addCall();

    this.productsService.getAll().subscribe(data => {
      console.log("product-service.getAll().sub() done");
      this.productList = data;
      this.dataSource = new MatTableDataSource(this.productList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      //this.loadingService.removeCall();
    });

    //this.loadingService.addCall();
    this.categoriesService.getAll().subscribe(data => {
      this.categoryList = data;
      //this.loadingService.removeCall();
    });
  }
}
