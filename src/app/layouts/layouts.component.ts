import { Component } from '@angular/core';
import { ClassyComponent } from "./classy/classy.component";
import { EmptyComponent } from "./empty/empty.component";
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [ClassyComponent, EmptyComponent, NgIf],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss'
})
export class LayoutsComponent {
  layout!: string;

  constructor(
    private route: ActivatedRoute
  ){
    this.route.data.subscribe(data => {
      this.layout = data['layout'];
    });
  }
}
