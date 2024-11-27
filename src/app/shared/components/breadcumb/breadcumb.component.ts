import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';


export interface BreadcrumbItem {
  label: string;
  url?: string;
  icon?: string;
}

@Component({
  selector: 'app-breadcumb',
  standalone: true,
  imports: [ CommonModule, RouterModule ],
  templateUrl: './breadcumb.component.html',
  styleUrl: './breadcumb.component.css'
})


export class BreadcumbComponent {
  @Input() items: BreadcrumbItem[] = [];
}
