import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../categories-service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../product';
import { Category } from '../category';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { noDankValidator } from '../no-dank-validator';

@Component({
  selector: 'app-product-add-edit-component',
  templateUrl: './product-add-edit.component.html'
})
export class ProductAddEditComponent implements OnInit {

  product: Product = new Product();
  categoryList: Category[] = new Array<Category>();
  productForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private toast: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {

    this.productForm = this.fb.group({
      productId: [''],
      productName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25), noDankValidator]],
      categoryId: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      let productId = +params.get("productId"); // The + operator converts a string to a number.
      if (productId) {
        this.productsService.getOne(productId).subscribe(data => {
          this.product = data;
          this.productForm.controls.productId.setValue(this.product.productId);
          this.productForm.controls.productName.setValue(this.product.productName);
          this.productForm.controls.categoryId.setValue(this.product.categoryId);
        });
      }
      this.categoriesService.getAll().subscribe(data => {
        this.categoryList = data;
      });
    });    
  }

  onSubmit({ value, valid }: { value: Product, valid: boolean }) {
    if (valid) {
      if (value.productId) {
        this.productsService.edit(value).subscribe(data => {
          this.product = data;
          this.toast.success("Product edited");
        });
      }
      else {
        value.productId = 0; // The Northwind API requires each product to have a productId.
        this.productsService.add(value).subscribe(data => {
          this.product = data;
          this.productForm.controls.productId.setValue(this.product.productId);
          this.toast.success("Product added");
        });
      }
    }
  }

  delete() {
    this.productsService.delete(this.product).subscribe(data => {
      this.toast.success("Product deleted");
      this.router.navigate(["/"]);
    });
  }

}
