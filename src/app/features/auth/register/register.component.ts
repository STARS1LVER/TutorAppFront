import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator, getErrorMessage, toggleLoader } from '../../../shared/helpers/function-helpers.service';
import { RegisterService } from './service/register.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { finalize } from 'rxjs';
import { ModalService } from '../../../shared/services/modal.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, RouterModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export default class RegisterComponent {


  private formBuilder = inject(FormBuilder);
  registerForm!: FormGroup;
  private registerService = inject(RegisterService);
  private loaderService = inject(LoaderService);
  private modalService = inject(ModalService);
  private _destroyRef = inject(DestroyRef);
  private router = inject(Router);



  ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, emailValidator()]],
        password: ['', Validators.required],
        semester: ['', Validators.required],
        modality: ['', Validators.required],
        career: ['', Validators.required],
      });
    }
  


  public register(): void {

    if( this.registerForm.invalid ) {
      this.modalService.openModal('Error', '¡Por favor, complete todos los campos!','error');
      this.registerForm.markAllAsTouched();
      return;
    }

    toggleLoader(this.loaderService, true, 'Registrando usuario...');
    this.registerService.register(this.registerForm.value).pipe(
      finalize(() => toggleLoader(this.loaderService, false)),
      takeUntilDestroyed(this._destroyRef)
    ).subscribe({
      next: (response) => {
        const buttonConfig = { acceptText: 'Iniciar sesión', showCancel: false };
        this.modalService.openModal('Success', '¡Usuario registrado correctamente!','success', buttonConfig).subscribe({
          next: (response) => {
            if(response) {
              this.router.navigate(['/login']);
            }
          }
        })
      }
      ,error: (error) => {
        console.log(error)
        this.modalService.openModal('Error', error.error.message || '¡Ocurrió un error, estamos trabajando para solucionarlo!','error');
      }
    })

    

    
   

  }

  getFieldError(fieldName: string): string {
    const control = this.registerForm.get(fieldName);
    if (!control) return '';
    
    return control.touched && control.errors 
      ? getErrorMessage(control, fieldName)
      : '';
  }

}
