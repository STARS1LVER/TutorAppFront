import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SubjectService } from '../../services/subject.service';
import { LoaderService } from '../../../../shared/services/loader.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { toggleLoader } from '../../../../shared/helpers/function-helpers.service';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RequestTutoringComponent } from '../../components/request-tutoring/request-tutoring.component';
import { BreadcumbComponent } from '../../../../shared/components/breadcumb/breadcumb.component';

interface Tutor {
  id: number;
  nombre: string;
  especialidad: string;
}

@Component({
  selector: 'app-subject-info',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    RequestTutoringComponent,
    BreadcumbComponent,
    RouterModule
  ],
  templateUrl: './subject-info.component.html',
  styleUrl: './subject-info.component.css'
})
export default class SubjectInfoComponent {
  private activatedRoute= inject(ActivatedRoute);
  private subjectService = inject(SubjectService);
  private loaderService = inject(LoaderService);
  private modalService = inject(ModalService);
  public subject: any;
  public isLoading: boolean = false;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      // console.log(params['id']);
      this.getSubjectById(params['id']);
    })
    
  }

  public getSubjectById(id: string): void {
    this.isLoading = true;
    toggleLoader(this.loaderService, true, 'Cargando información de la materia...');
    this.subjectService.getSubjectById(id).pipe(
      finalize(() => {
        toggleLoader(this.loaderService, false)
        this.isLoading = false;
      })
    ).subscribe({
      next: (res) => {
        this.subject = res;
      },
      error: (error) => {
        this.modalService.openModal('Error', error.error.message || 'Error al cargar la información de la materia', 'error');
      }
    })
  }

  public solicitarTutoria(): void {
    const modal = document.getElementById('tutoring-modal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }
}
