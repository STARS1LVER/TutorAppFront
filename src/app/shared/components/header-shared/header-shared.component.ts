import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-shared',
  standalone: true,
  imports: [ RouterModule ],
  templateUrl: './header-shared.component.html',
  styleUrl: './header-shared.component.css'
})
export class HeaderSharedComponent {

}
