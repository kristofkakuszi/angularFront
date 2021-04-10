import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';


@Component({ templateUrl: 'landing.component.html' })
export class LandingComponent {
    //implements OnInit

    //url; //Angular 8
    url: any; //Angular 11, for stricter type
    msg = "";

    //selectFile(event) { //Angular 8
    selectFile(event: any) { //Angular 11, for stricter type
        if (!event.target.files[0] || event.target.files[0].length == 0) {
            this.msg = 'You must select an image';
            return;
        }

        var mimeType = event.target.files[0].type;

        if (mimeType.match(/image\/*/) == null) {
            this.msg = "Only images are supported";
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = (_event) => {
            this.msg = "";
            this.url = reader.result;
        }
    }


    /*

    uploadForm: FormGroup;

    constructor(private httpService: HttpClient, private router: Router, private formBuilder: FormBuilder) { }


    ngOnInit() {
        this.uploadForm = this.formBuilder.group({
            inputFile: ['', Validators.required]
        });
    }



    onFileChanged(event) {
        const file = event.target.files[0]
    }

    onUpload() {

        this.httpService.post('/upload', this.uploadForm.value).subscribe(
            (status: any) => {
                console.warn(status);
                console.log("megynomtad")
            }
        )
        console.log(this.uploadForm.value)
    }
    */
}