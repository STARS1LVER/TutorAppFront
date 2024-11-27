import { Component, inject } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { SubjectService } from '../../services/subject.service';
import { LoaderService } from '../../../../shared/services/loader.service';
import { toggleLoader } from '../../../../shared/helpers/function-helpers.service';
import { finalize } from 'rxjs';
import { Subjects } from '../../interfaces/subjects.interface';
import { ModalService } from '../../../../shared/services/modal.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BreadcumbComponent } from '../../../../shared/components/breadcumb/breadcumb.component';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CommonModule, BreadcumbComponent],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export default class SubjectComponent {

  private subjectService = inject(SubjectService);
  private loaderService = inject(LoaderService);
  private modalAlertService = inject(ModalService);
  private router = inject(Router);
  public subjects: Subjects[] = [];

  ngOnInit(): void {
    this.getSubjects();
  }



  public getSubjects(): void {
    toggleLoader(this.loaderService, true, 'Cargando Materias...');
    this.subjectService.getSubjects().pipe(
      finalize(() => toggleLoader(this.loaderService, false))
    ).subscribe({
      next: (res) => {
        // console.log(res);
        this.subjects = res
      },
      error: (error) => {
        console.log(error);
        this.modalAlertService.openModal('Error', error.error.message || 'Error al cargar las materias', 'error');
      }
    })
  }

  public verMasInformacion(subject: Subjects): void {
    console.log(subject.id);
    this.router.navigate(['/students/subject-detail', subject.id]);
  }





}
