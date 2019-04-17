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
  selector: 'app-product-edit-component',
  templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit {

  product: Product = new Product();
  categoryList: Array<Category> = new Array<Category>();
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
      productId: ['', Validators.required],
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

  /*
   *onSubmit({ value, valid }: { value: Hero, valid: boolean }) {
    this.submitted = true;
    this.submittedModel = value;
  }
   * */

  onSubmit({ value, valid }: { value: Product, valid: boolean }) {
    console.table(value);
    console.table(value);
    if (valid) {
      this.productsService.edit(value).subscribe(data => {
        this.product = data;
        this.toast.success("Product changes saved!");
      });
    }
  }

  delete() {
    this.productsService.delete(this.product).subscribe(data => {
      this.router.navigate(["/"]);
    });
  }

}
