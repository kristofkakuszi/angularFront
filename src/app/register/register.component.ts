import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';                                                       //ez illetve
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";              //ez is kell ahhoz hogy mukodjon a post

@Component({
    templateUrl: 'register.component.html'
})
export class RegisterComponent {

    //innentol
    constructor(private httpService: HttpClient, private router: Router) { }

    registerForm = new FormGroup({

        username: new FormControl(''),
        inpPassword: new FormControl(''),
        inpPassword1: new FormControl(''),
    });

    onRegister() {
        console.warn(this.registerForm.value)
        this.httpService.post("/onRegister", this.registerForm.value).subscribe(
            (status) => {
                console.warn(status);
                this.router.navigate(['login']);
            }
        )
    }
    //idaig


    /*
    registerForm = new FormGroup({

        username: new FormControl(''),
        inpPassword: new FormControl(''),
        inpPassword1: new FormControl(''),
    });

    onRegister() {
        console.warn(this.registerForm.value)
    }
    */

}