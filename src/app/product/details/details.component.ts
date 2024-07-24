import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../../core/model/product';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, EMPTY } from 'rxjs';
import { NotificationService } from '../../core/service/notification/notification.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  id!: string | null
  product!: Product
  isEditing = false;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private notification:NotificationService){}

  ngOnInit(){
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getProductDetails(this.id);
  }

  getProductDetails(id: string|null){
    this.productService.getProductById(id).subscribe(product => {
      console.log(product);
      this.product = product;
    });
  }

  editProduct() {
    this.isEditing = true;
  }

  saveProduct() {
    const product = this.product
    this.productService.updateProduct(this.product.id, product)
    .pipe(
      catchError(error => {
        this.notification.error('Error updating product');
        return EMPTY;
      })
    )
    .subscribe(updatedProduct => {
      this.notification.success('Product updated successfully');
      this.product = updatedProduct;
      this.isEditing = false;
    });
  }

  cancelEdit() {
    this.isEditing = false;
  }
}
