import { AbstractControl, ValidationErrors } from "@angular/forms";
import { LoaderService } from "../services/loader.service";



export function emailValidator(): ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      
      const valid = emailRegex.test(control.value);
      
      return !valid ? { invalidEmail: true } : null;
    };
  }

export function getErrorMessage(control: AbstractControl, fieldName: string): string {
  // Personalización de nombres para los campos select
  const fieldLabels: { [key: string]: string } = {
    semester: 'semestre',
    modality: 'modalidad'
  };

  // Usa el nombre personalizado si existe, si no usa el fieldName original
  const displayName = fieldLabels[fieldName] || fieldName;

  if (control.hasError('required')) {
    if (fieldName === 'semester' || fieldName === 'modality') {
      return `Debe seleccionar un ${displayName}`;
    }
    return `El campo ${displayName} es requerido`;
  }
  
  if (control.hasError('invalidEmail')) {
    return 'El formato del correo electrónico no es válido';
  }
  
  if (control.hasError('minlength')) {
    return `El campo ${fieldName} debe tener al menos ${control.errors?.['minlength'].requiredLength} caracteres`;
  }
  
  return '';
}




export function toggleLoader(
  loaderService: LoaderService ,
  show: boolean, 
  message: string = 'Cargando...'
): void {
  loaderService.setLoading(show);
  loaderService.setMessage(message);
}