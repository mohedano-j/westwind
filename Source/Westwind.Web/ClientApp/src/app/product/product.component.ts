import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../categories-service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../product';
import { Category } from '../category';

@Component({
  selector: 'app-product-component',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  productId: string;
  product: Product = new Product();
  categoryList: Array<Category> = new Array<Category>();
  
  constructor(private route: ActivatedRoute,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private toast: ToastrService,
    private router: Router) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.productId = params.get("productId");
      console.log(this.productId);
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

  showAdd() {
    return this.productId === null;
  }

  showEdit() {
    return this.productId !== null;
  }

  showDelete() {
    return this.productId !== null;
  }

  add() {
    this.productsService.add(this.product).subscribe(data => {
      this.productId = data.productId.toString();
      this.product = data;
      this.toast.success("Product added!");
    });
  }

  edit() {
    this.productsService.edit(this.product).subscribe(data => {
      this.product = data;
      this.toast.success("Product edited");
    });
  }

  delete() {
    this.productsService.delete(this.product).subscribe(data => {
      this.router.navigate(["/"]);
    });
  }
}
