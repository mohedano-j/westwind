import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort, MatTableDataSource, MatSelect, MatPaginator } from '@angular/material';
import { ProductsService } from '../products-service';
import { CategoriesService } from '../categories-service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList;
  categoryList;
  dataSource;
  displayedColumns: string[] = ['productId', 'productName', 'categoryId'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;  

  constructor(private productsService: ProductsService, private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe(data => {
      this.productList = data;
      this.dataSource = new MatTableDataSource(this.productList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.categoriesService.getCategories().subscribe(data => {
      this.categoryList = data;
    });
  }
}
