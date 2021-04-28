import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        const idToken = localStorage.getItem("id_token");   /*ugye ezt postbol kell majd lekerni*/


        /*ha a token jelen van akkor a headerbe belerakjuk */
        if (idToken) {

            /*ezt nem tudjuk valtoztatni, viszont masolni ezt tudjuk es azon modositani*/
            const cloned = req.clone({
                headers: req.headers.set("Authorization", "Bearer" + idToken)
            });
            return next.handle(cloned);
        }
        else { /*ha nincs jelen*/
            return next.handle(req);
        }

    }

}











//felesleges mappa yet