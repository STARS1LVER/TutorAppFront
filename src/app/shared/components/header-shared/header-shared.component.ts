import { LoaderService } from './../../services/loader.service';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RegisterService } from '../../../features/auth/register/service/register.service';
import { CommonModule } from '@angular/common';
import { toggleLoader } from '../../helpers/function-helpers.service';
import { finalize } from 'rxjs';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-header-shared',
  standalone: true,
  imports: [ RouterModule, CommonModule ],
  templateUrl: './header-shared.component.html',
  styleUrl: './header-shared.component.css'
})
export class HeaderSharedComponent {
  private authService = inject(RegisterService);
  private router = inject(Router);
  private loaderService = inject(LoaderService);
  private modalService = inject(ModalService);

  get isLoggedIn(): boolean {
    return !!this.authService.getToken();
  }

  public logout(): void {
    toggleLoader(this.loaderService, true, 'Cerrando sesión...');
   this.authService.logout().pipe(
    finalize(() => toggleLoader(this.loaderService, false))
   ).subscribe({
    next: (response) => {
      this.router.navigate(['/welcome-page']);
    },
    error: (error) => {
      console.log(error);
      this.modalService.openModal('Error', error.error.message || 'Error al cerrar sesión', 'error');

    }
   })
  }


}
