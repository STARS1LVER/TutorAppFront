import { Component } from '@angular/core';
import { HeaderSharedComponent } from '../../../shared/components/header-shared/header-shared.component';
import { CommonModule } from '@angular/common';
import { CarrouselComponent } from './components/carrousel/carrousel.component';
import { FooterSharedComponent } from '../../../shared/components/footer-shared/footer-shared.component';
import { AboutComponent } from './components/about/about.component';
import { BenefitsComponent } from './components/benefits/benefits.component';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [ HeaderSharedComponent, CommonModule, CarrouselComponent, FooterSharedComponent, AboutComponent, BenefitsComponent ],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export default class WelcomePageComponent {

}
