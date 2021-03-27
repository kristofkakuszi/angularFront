import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

import { ConfirmedValidator } from '../register/confirmed.validator';


@Component({
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    submitted = false;

    constructor(private httpService: HttpClient, private router: Router, private formBuilder: FormBuilder) { }

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

        /*
        loginForm = new FormGroup({
    
            username: new FormControl(''),
            password: new FormControl(''),
        });
    
        onLogin() {
            console.warn(this.loginForm.value)
        }
        */

        /*
        username = new FormControl('');
    
        password = new FormControl('');
    
        onLogin() {
            console.warn(this.username.value)
            console.warn(this.password.value)
        }
        */


    }
}
