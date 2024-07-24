import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-empty',
  standalone: true,
  imports: [NgIf,RouterModule],
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.scss'
})
export class EmptyComponent {

}
