import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HeroService } from './hero.service'; //pl auth-token 

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private heroService: HeroService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            headers: req.headers.append('auth-token', this.heroService.token)
        });
        return next.handle(req);
    }
}


