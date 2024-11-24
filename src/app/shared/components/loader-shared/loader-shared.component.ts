import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader-shared',
  standalone: true,
  imports: [ AsyncPipe, CommonModule ],
  templateUrl: './loader-shared.component.html',
  styleUrl: './loader-shared.component.css'
})
export class LoaderSharedComponent {

  constructor(public loaderService: LoaderService) { }

}
