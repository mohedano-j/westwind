import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from "../products-service";
import { CategoriesService } from '../categories-service';
import { SpinnerService } from '../spinner-service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

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

  constructor(private productsService: ProductsService, private categoriesService: CategoriesService, private spinner: SpinnerService) { }

  ngOnInit() {

    this.spinner.show();
    this.productsService.getAll().subscribe(data => {
      this.productList = data;
      this.dataSource = new MatTableDataSource(this.productList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
    });

    this.spinner.show();
    this.categoriesService.getAll().subscribe(data => {
      this.categoryList = data;
      this.spinner.hide();
    });
  }
}
