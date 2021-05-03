import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HeroService } from '../hero.service';
import { Router } from '@angular/router';


@Component({
    templateUrl: 'landing.component.html',
    styleUrls: ['landing.component.css']
})
export class LandingComponent implements OnInit {

    uploadForm: FormGroup;
    submitted = false;

    fileName = '';


    constructor(private httpService: HttpClient, private heroService: HeroService, private router: Router, private formBuilder: FormBuilder) { }


    ngOnInit() {
        this.uploadForm = this.formBuilder.group({
            name: ['', Validators.required],
        });
    }

    get f() { return this.uploadForm.controls; }

    upload() {

    }

    onFileSelected(event) {

        const file: File = event.target.files[0];


        console.warn(this.heroService.token);

        if (file) {

            this.fileName = this.uploadForm.value.name;

            const formData = new FormData();

            formData.append("thumbnail", file);

            const upload$ = this.httpService.post("/onUpload", formData);

            console.warn(this.uploadForm.value.name);

            upload$.subscribe(
                (info: HttpResponse<any>) => {
                    alert("Done");
                },
                (error: HttpErrorResponse) => {
                    if (error.status == 401) {
                        this.heroService.token = "";
                        this.router.navigate(['landing']);
                    }
                }
            );
        }
    }

    onLogout() {
        console.warn(this.heroService.token);
        this.heroService.token = "";
        console.warn(this.heroService.token);
    }

}