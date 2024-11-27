import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { getErrorMessage } from '../../../../shared/helpers/function-helpers.service';
import { ModalService } from '../../../../shared/services/modal.service';

@Component({
  selector: 'app-request-tutoring',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './request-tutoring.component.html',
  styleUrls: ['./request-tutoring.component.css']
})
export class RequestTutoringComponent {
  tutorForm: FormGroup;
  tutores = [
    { id: 1, nombre: 'Juan Pérez', especialidad: 'Matemáticas' },
    { id: 2, nombre: 'María García', especialidad: 'Física' },
    { id: 3, nombre: 'Carlos López', especialidad: 'Programación' },
  ];
  fechaMinima: string = new Date().toISOString().split('T')[0];
  private modalService = inject(ModalService);

  constructor(private fb: FormBuilder) {
    this.tutorForm = this.fb.group({
      fecha: ['', Validators.required],
      tutor: ['', Validators.required]
    });
  }

  cerrarModal() {
    const modal = document.getElementById('tutoring-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
  }

  solicitarTutoria() {
    if(!this.tutorForm.valid) {
      this.tutorForm.markAllAsTouched();
      this.modalService.openModal('Error', '¡Por favor, complete todos los campos!','error');
      return;
    }
    console.log(this.tutorForm.value);
  }

  getFieldError(fieldName: string): string {
    const control = this.tutorForm.get(fieldName);
    if (!control) return '';
    
    return control.touched && control.errors 
      ? getErrorMessage(control, fieldName)
      : '';
  }

}