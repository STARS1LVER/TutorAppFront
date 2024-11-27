import { Component } from '@angular/core';
import { HeaderSharedComponent } from '../../../shared/components/header-shared/header-shared.component';
import { FooterSharedComponent } from '../../../shared/components/footer-shared/footer-shared.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-content-component',
  standalone: true,
  imports: [ HeaderSharedComponent, FooterSharedComponent, RouterModule ],
  templateUrl: './content-component.component.html',
  styleUrl: './content-component.component.css'
})
export default class ContentComponentComponent {

}
