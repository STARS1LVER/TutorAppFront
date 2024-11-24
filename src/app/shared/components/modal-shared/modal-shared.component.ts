import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';



@Component({
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 , scale: 0.5}),
        animate(100, style({ opacity: 1, scale: 1 }))
      ]),
      transition(':leave', animate(100, style({ opacity: 0, scale: 0.5}))),
    ]),
  ],
  standalone: true,
  imports:[CommonModule],
  selector: 'app-modal-shared',
  templateUrl: './modal-shared.component.html',
  styleUrls: ['./modal-shared.component.scss']
})
export class ModalSharedComponent {
  showModal: boolean = false;
  title: string = '';
  description: string = '';
  type: string = 'info';
  buttonConfig = { acceptText: 'Aceptar', cancelText: 'Cancelar', showCancel: false }; // Configuración para los botones
  register!: number;

  constructor(public modalService: ModalService) {}

  ngOnInit() {
    // Nos suscribimos al observable que controla cuándo mostrar el modal
    this.modalService.showModal$.subscribe(showModal => {
      this.showModal = showModal;
    });

    // Nos suscribimos al observable que emite los datos del modal (título, descripción, tipo, y configuración de botones)
    this.modalService.modalData$.subscribe(data => {
      this.title = data.title;
      this.description = data.description;
      this.type = data.type;
      this.buttonConfig = data.buttonConfig;
      this.register = data.register;
    });
  }

  // Método que se llama cuando el usuario presiona el botón "Aceptar"
  acceptModal() {
    this.modalService.acceptModal();
  }

  // Método que se llama cuando el usuario presiona el botón "Cancelar" o cierra el modal
  closeModal() {
    this.modalService.closeModal();
  }

  // Método que se llama cuando el usuario presiona el botón "Rechazar" (si existe)
  rejectModal() {
    this.modalService.rejectModal();
  }
}
