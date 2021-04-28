import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';                                                       //ez illetve
import { HttpClient } from "@angular/common/http";              //ez is kell ahhoz hogy mukodjon a post

import { ConfirmedValidator } from './confirmed.validator';


@Component({
    templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

    //ez a ketto
    registerForm: FormGroup;
    submitted = false;
    //error = false;


    //innentol
    constructor(private httpService: HttpClient, private router: Router, private formBuilder: FormBuilder) { }


    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            inpPassword: ['', Validators.required,], //inpPassword: ['', [Validators.required, Validators.minLength(6)]],
            inpPassword1: ['', Validators.required]
        }, {
            validator: ConfirmedValidator('inpPassword', 'inpPassword1')
        });
    }

    get f() { return this.registerForm.controls; }

    onRegister() {
        this.submitted = true;
        //this.error = false;


        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.httpService.post("/onRegister", this.registerForm.value).subscribe(
            (status: any) => {
                console.warn(status);
                this.router.navigate(['login']);
                alert('Sikeres Regisztárció!\n\n')
            }
        )
        //alert('Sikeres Regisztárció!\n\n')
        console.warn(this.registerForm.value)
    }




    /*
      this.httpService.post("/onRegister", this.registerForm.value).subscribe((status) => {
            if (status.result == false) {
                alert("letezik mar ilyen user");
            }
            else {
                alert("rendben van nincs ilyen mehetsz");
            }
            console.warn(status);
            this.router.navigate(['login']);
        });
        */




    /*
    registerForm = new FormGroup({

        username: new FormControl(''),
        inpPassword: new FormControl(''),
        inpPassword1: new FormControl(''),
    });
    */
    /*
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
        */


}