import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from '../products-service';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../categories-service';
import { ToastService } from '../toast-service';

@Component({
  selector: 'app-product-component',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  productId: any;
  product: any;
  categoryList: any;

  constructor(private route: ActivatedRoute, private productsService: ProductsService, private categoriesService: CategoriesService, private toast: ToastService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get("productId");
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

  showEdit() {
    return this.productId !== null;
  }

  showAdd() {
    return this.productId === null;
  }
    
  add(productName, categoryId) {
    this.productsService.add(productName, categoryId).subscribe(data => {
      this.productId = data.productId;
      this.product = data;
      this.toast.success("Product added!");
    });
  }

  edit(productName, categoryId) {
    this.productsService.edit(this.productId, productName, categoryId).subscribe(data => {
      this.product = data;
      this.toast.success("Product edited");
    });
  }
}
