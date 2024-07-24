import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from '../product/product.service';
import { Product } from '../core/model/product';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective, NgxEchartsModule, provideEcharts } from 'ngx-echarts';
import { Observable } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgxEchartsModule,
    NgxEchartsDirective
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [provideEcharts()],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  data$!: Observable<Product[]>;
  @ViewChild('priceChart') priceChartRef!: ElementRef;
  @ViewChild('ratingChart') ratingChartRef!: ElementRef;

  priceChartOption: EChartsOption = {};
  ratingChartOption: EChartsOption = {};

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.data$ = this.productService.getProduct();
    this.data$.subscribe((products: Product[]) => {
      this.updateChartOptions(products);
      this.resizeCharts();
    });
  }

  ngAfterViewInit() {
    // Utiliser setTimeout pour s'assurer que le DOM est complètement chargé
    setTimeout(() => {
      this.resizeCharts();
    }, 0);
  }

  updateChartOptions(products: Product[]) {
    this.priceChartOption = {
      xAxis: {
        type: 'category',
        data: products.map(item => item.title)
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: products.map(item => item.price),
        type: 'bar',
        name: 'Price',
        itemStyle: {
          color: '#ff8c00'
        }
      }]
    };

    this.ratingChartOption = {
      xAxis: {
        type: 'category',
        data: products.map(item => item.title)
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: products.map(item => item.rating.rate),
        type: 'bar',
        name: 'Rating',
        itemStyle: {
          color: '#1e90ff'
        }
      }]
    };
  }

  resizeCharts() {
    setTimeout(() => {
      if (this.priceChartRef && this.priceChartRef.nativeElement) {
        const priceChartInstance = this.priceChartRef.nativeElement.getEchartsInstance();
        if (priceChartInstance) priceChartInstance.resize();
      }

      if (this.ratingChartRef && this.ratingChartRef.nativeElement) {
        const ratingChartInstance = this.ratingChartRef.nativeElement.getEchartsInstance();
        if (ratingChartInstance) ratingChartInstance.resize();
      }
    }, 0);
  }
}
