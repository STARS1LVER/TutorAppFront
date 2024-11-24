import { Component } from '@angular/core';
import { HeaderSharedComponent } from '../../../shared/components/header-shared/header-shared.component';
import { CommonModule } from '@angular/common';
import { CarrouselComponent } from './components/carrousel/carrousel.component';
import { FooterSharedComponent } from '../../../shared/components/footer-shared/footer-shared.component';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [ HeaderSharedComponent, CommonModule, CarrouselComponent, FooterSharedComponent ],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export default class WelcomePageComponent {

}
