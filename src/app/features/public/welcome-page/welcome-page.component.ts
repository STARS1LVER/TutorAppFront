import { Component } from '@angular/core';
import { HeaderSharedComponent } from '../../../shared/components/header-shared/header-shared.component';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [ HeaderSharedComponent ],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export default class WelcomePageComponent {

}
