
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({providedIn: 'root'})
export class ModalService {
  private showModalSubject = new Subject<boolean>(); 
  public showModal$ = this.showModalSubject.asObservable();
  private modalDataSubject = new Subject<any>(); 
  public modalData$ = this.modalDataSubject.asObservable();
  private actionSubject = new Subject<boolean>();
  private actionObservable: Observable<boolean>; 
  constructor() {
    this.actionObservable = this.actionSubject.asObservable();
  }
  // Abre el modal con los datos necesarios
  public openModal(
    title: string = '',
    description: string | string[] = '',
    type: string = 'info',
    buttonConfig: { acceptText?: string, cancelText?: string, showCancel?: boolean } = { acceptText: 'Aceptar', cancelText: 'Cancelar', showCancel: false }, // Configuración para los botones
    register?: number
  ): Observable<boolean> {
    // Emitimos los datos del modal, incluida la configuración de los botones
    this.modalDataSubject.next({ title, description, type, buttonConfig, register });
    // Emitimos que se debe mostrar el modal
    this.showModalSubject.next(true);
    return this.actionObservable;
  }
  // Cierra el modal sin aceptar (Cancel)
  public closeModal(): void {
    this.showModalSubject.next(false);
    this.actionSubject.next(false); // Emitimos "cancel" si el usuario cierra sin aceptar
    this.actionSubject.complete();
    this.resetSubject();
  }
  // Acepta la acción del modal
  public acceptModal(): void {
    this.showModalSubject.next(false);
    this.actionSubject.next(true); // Emitimos "accept" si el usuario acepta
    this.actionSubject.complete();
    this.resetSubject();
  }
  // Rechaza la acción (opcional)
  public rejectModal(): void {
    this.showModalSubject.next(false);
    this.actionSubject.next(false); // Emitimos "reject" si el usuario rechaza
    this.actionSubject.complete();
    this.resetSubject();
  }
  // Resetea el Subject para evitar que esté completado en futuras llamadas
  private resetSubject(): void {
    this.actionSubject = new Subject<boolean>();
    this.actionObservable = this.actionSubject.asObservable();
  }
}