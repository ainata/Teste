import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-classy',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './classy.component.html',
  styleUrl: './classy.component.scss'
})
export class ClassyComponent {

  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('active');
    }
  }

}
