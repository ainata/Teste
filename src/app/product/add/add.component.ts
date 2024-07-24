import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { NgIf } from '@angular/common';
import { NotificationService } from '../../core/service/notification/notification.service';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private notification: NotificationService,
  ) {}

  ngOnInit() {
    this.initForm();

  }

  initForm() {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      image: ['', Validators.required]
    });
  }

  get title() {
    return this.productForm.get('title');
  }

  get description() {
    return this.productForm.get('description');
  }

  get price() {
    return this.productForm.get('price');
  }

  get image() {
    return this.productForm.get('image');
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value)
      .pipe(
        catchError(error => {
          this.notification.error('Error adding product');
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.router.navigate(['/products/list']);
        this.notification.success('Added product successfully')
      });
    }
  }

}
