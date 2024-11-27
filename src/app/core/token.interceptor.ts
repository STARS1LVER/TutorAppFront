import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { RegisterService } from '../features/auth/register/service/register.service';




export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
    const authService = inject(RegisterService);
    const router = inject(Router);
    const token = authService.getToken();

    // ... existing code ...

    // Comprobar si es una ruta pública
    if (request.url.endsWith('/auth')) {
        return next(request);
    }

    // Lista de URLs permitidas
    const allowedUrls = [
        'http://127.0.0.1:8000',
        'localhost',

    ];

    // Verificar si la URL está en la lista de permitidas
    const isAllowedUrl = allowedUrls.some(url => request.url.includes(url));

    if (token && isAllowedUrl) {
        request = request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    }

    return next(request).pipe(
        catchError((error) => {
            if (error.status === 401) {
                authService.logout(); // Recomiendo crear este método en AuthService
                router.navigate(['/iniciar-sesion']);
            }
            return throwError(() => error);
        })
    );
};