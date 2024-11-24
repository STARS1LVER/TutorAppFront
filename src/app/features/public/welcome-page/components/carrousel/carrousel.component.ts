import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-carrousel',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './carrousel.component.html',
  styleUrl: './carrousel.component.css'
})
export class CarrouselComponent {


  currentSlide = 0;
  
  moveSlide(direction: number): void {
    const totalSlides = 2;
    this.currentSlide = (this.currentSlide + direction + totalSlides) % totalSlides;
    this.updateCarousel();
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.updateCarousel();
  }

  private updateCarousel(): void {
    const carousel = document.getElementById('carousel');
    if (carousel) {
      carousel.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    }
  }

}
