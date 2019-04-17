import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../categories-service';
import { Product } from '../product';
import { Category } from '../category';

@Component({
  selector: 'app-product-add-component',
  templateUrl: './product-add.component.html'
})
export class ProductAddComponent implements OnInit {

  productId: number;
  product: Product = new Product();
  categoryList: Array<Category> = new Array<Category>();
  
  constructor(private route: ActivatedRoute, private productsService: ProductsService, private categoriesService: CategoriesService, private router: Router) {}

  ngOnInit() {

    this.route.paramMap.subscribe(params => {

      this.productId = +params.get("productId"); // The + operator converts a string to a number.

      if (this.productId) {
        this.productsService.getOne(this.productId).subscribe(data => {
          this.product = data;
        });
      }

      this.categoriesService.getAll().subscribe(data => {
        this.categoryList = data;
      });

    });    
  }

  saveChanges() {

    this.productsService.add(this.product).subscribe(data => {
      this.productId = data.productId;
      this.product = data;
      this.router.navigate(["/products/edit/", this.productId]);
    });

  }
}
