import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../register/service/register.service';
import { emailValidator, getErrorMessage, toggleLoader } from '../../../shared/helpers/function-helpers.service';
import { ModalService } from '../../../shared/services/modal.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { finalize } from 'rxjs';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, RouterModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {

  private formBuilder = inject(FormBuilder);
  private registerService = inject(RegisterService);
  private modalService = inject(ModalService);
  private loaderService = inject(LoaderService);
  loginForm!: FormGroup;
  private _destroyRef = inject(DestroyRef);


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  public login(): void {
    if(  this.loginForm.invalid ){
      console.log('invalid');
      this.loginForm.markAllAsTouched();
      this.modalService.openModal('Error', '¡Por favor, complete todos los campos!','error');
      return;
    }
    toggleLoader(this.loaderService, true,'Iniciando sesión...');
    this.registerService.login(this.loginForm.value)
    .pipe(
      finalize(() => toggleLoader(this.loaderService, false)),
      takeUntilDestroyed(this._destroyRef)
    )
    .subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.log(error);
        this.modalService.openModal('Error', error.error.message || '¡Ocurrió un error, estamos trabajando para solucionarlo!','error');
      }
    })  


   
  }


  getFieldError(fieldName: string): string {
    const control = this.loginForm.get(fieldName);
    if (!control) return '';
    
    return control.touched && control.errors 
      ? getErrorMessage(control, fieldName)
      : '';
  }

}
