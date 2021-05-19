import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HeroService } from '../hero.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'landing.component.html',
    styleUrls: ['landing.component.css']
})
export class LandingComponent {

    fileName = '';
    images = [];

    constructor(private httpService: HttpClient, private heroService: HeroService, private router: Router, private formBuilder: FormBuilder) {
        const getImages$ = this.httpService.get("/getImages");
        getImages$.subscribe(
            (info: HttpResponse<any>) => {
                alert("sikeres képlekérés");
                console.log(info);
                this.images = info["result"];
                console.log(this.images)
            },
            (error: HttpErrorResponse) => {
                alert("Sikertelen képlekérés");
                console.error(error);
                if (error.status == 401) {
                    this.heroService.token = "";
                    this.router.navigate(['landing']);
                }

            }
        );
    }


    validateFile(name: String) {
        var ext = name.substring(name.lastIndexOf('.') + 1);
        if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'jpeg') {
            return true;
        }
        else {
            alert("file format is wrong");
            return false;

        }
    }

    onFileSelected(event) {

        const file: File = event.target.files[0];

        console.warn(this.heroService.token);

        if (file) {

            this.fileName = file.name;

            if (this.validateFile(this.fileName)) {
                const formData = new FormData();

                formData.append("thumbnail", file);

                const upload$ = this.httpService.post("/onUpload", formData);

                upload$.subscribe(
                    (info: HttpResponse<any>) => {
                        alert("Sikeres kepfeltoltes");
                    },
                    (error: HttpErrorResponse) => {
                        if (error.status == 401) {
                            this.heroService.token = "";
                            this.router.navigate(['landing']);
                            alert("Sikertelen képfeltöltés");
                        }
                    }
                );
            }
        }
    }

    onLogout() {
        console.warn("angular feluleten a token" + this.heroService.token);
        this.heroService.token = "";
        console.warn("angular feluleten a token" + this.heroService.token);
        this.router.navigate(['./home']);
        alert("Sikeres kijelentkezés");
    }

    public getFaceList() {
        return this.images.filter(i => i["faceFound"]);
    }

    public getTextList() {
        return this.images.filter(i => i["textFound"]);
    }

    public getPlateList() {
        return this.images.filter(i => i["plateFound"]);
    }

}