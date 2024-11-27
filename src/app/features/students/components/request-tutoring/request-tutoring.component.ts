import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { getErrorMessage, toggleLoader } from '../../../../shared/helpers/function-helpers.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { SubjectService } from '../../services/subject.service';
import { finalize } from 'rxjs';
import { LoaderService } from '../../../../shared/services/loader.service';

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
  @Input() tutores: any[] = [];
  tutorForm: FormGroup;
  fechaMinima: string = new Date().toISOString().split('T')[0];
  private modalService = inject(ModalService);
  private subjectService = inject(SubjectService)
  private loaderService = inject(LoaderService);

  constructor(private fb: FormBuilder) {
    this.tutorForm = this.fb.group({
      fecha: ['', Validators.required],
      tutor: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log(this.tutores);
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

    toggleLoader(this.loaderService, true, 'Solicitando tutoría...');

    this.subjectService.requestTutoring(this.tutorForm.value.tutor, this.tutorForm.value.fecha)
    .pipe(
      finalize(() => {
        toggleLoader(this.loaderService, false)
      })
    ).subscribe({
      next: (res) => {
        console.log(res);
        this.modalService.openModal('Exitoso!', 'Pronto se te enviará un correo con los detalles de la tutoría', 'success');
      },
      error: (error) => {
        console.log(error);
        this.modalService.openModal('Error', error.error.message || 'Error al solicitar la tutoría', 'error');
      }
    })  
    
  }

  getFieldError(fieldName: string): string {
    const control = this.tutorForm.get(fieldName);
    if (!control) return '';
    
    return control.touched && control.errors 
      ? getErrorMessage(control, fieldName)
      : '';
  }

}