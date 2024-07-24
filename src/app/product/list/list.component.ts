import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../core/model/product';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { catchError, EMPTY } from 'rxjs';
import { NotificationService } from '../../core/service/notification/notification.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  product!: Product[];
  searchText: string = '';

  constructor(
    private productService: ProductService,
    private route: Router,
    private notification: NotificationService,
  ){}

  ngOnInit() {
    this.getProduct();
  }

  getProduct(){
    this.productService.getProduct().subscribe(product => {
      console.log(product);

      this.product = product;
    });
  }

  navigateToDetails(id: number){
    this.route.navigate(['/products/details/' + id]);
  }

  addProduct(){
    this.route.navigate(['/products/add']);
  }

  get filteredProducts(): Product[] {
    if (!this.searchText) {
      return this.product;
    }
    return this.product.filter(product =>
      product.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  confirmDelete(productId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProduct(productId);
      }
    });
  }

  deleteProduct(id: number){
    this.productService.deleteProduct(id)
    .pipe(
      catchError(error => {
        this.notification.error('Error deleting product');
        return EMPTY;
      })
    )
    .subscribe(() => {
      this.notification.success('Product deleted successfully');
      this.getProduct();
    });
  }

}
