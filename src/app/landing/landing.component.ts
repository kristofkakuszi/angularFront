import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HeroService } from '../hero.service';
import { Router } from '@angular/router';


@Component({
    selector: 'cdk-drag-drop-boundary-example',
    templateUrl: 'landing.component.html',
    styleUrls: ['landing.component.css']
})
export class LandingComponent {


    fileName = '';

    images = [];
    myForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        file: new FormControl('', [Validators.required]),
        fileSource: new FormControl('', [Validators.required])
    });



    constructor(private httpService: HttpClient, private heroService: HeroService, private router: Router, private formBuilder: FormBuilder) { }



    get f() {
        return this.myForm.controls;
    }

    onFileChange(event) {
        if (event.target.files && event.target.files[0]) {
            var filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event: any) => {
                    console.log(event.target.result);
                    this.images.push(event.target.result);

                    this.myForm.patchValue({
                        fileSource: this.images
                    });
                }

                reader.readAsDataURL(event.target.files[i]);
            }
        }
    }





    onFileSelected(event) {

        const file: File = event.target.files[0];


        console.warn(this.heroService.token);

        if (file) {

            this.fileName = file.name;

            const formData = new FormData();

            formData.append("thumbnail", file);

            const upload$ = this.httpService.post("/onUpload", formData);

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