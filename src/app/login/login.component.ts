import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";

import { ConfirmedValidator } from '../register/confirmed.validator';
import { HeroService } from '../hero.service';


@Component({
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    submitted = false;

    constructor(private httpService: HttpClient, private router: Router, private formBuilder: FormBuilder, private heroService: HeroService) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required,], //inpPassword: ['', [Validators.required, Validators.minLength(6)]],
        }, {

        });
    }
    get f() { return this.loginForm.controls; }



    onLogin() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }
        this.httpService.post("/onLogin", this.loginForm.value).subscribe(
            (status: HttpResponse<any>) => {
                if (status['result']) {
                    this.heroService.token = status['token'];
                    this.router.navigate(['landing']);
                    alert('Sikeres Bejelentkezés!\n\n')
                }
            },
            (error: HttpErrorResponse) => {
                alert("nem jo nev vagy jelszo");
                //alert(error.message);
            }
        )
        //alert('Sikeres Bejelentkezés!\n\n')
        console.warn(this.loginForm.value);
    }
}
