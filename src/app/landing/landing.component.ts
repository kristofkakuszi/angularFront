import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HeroService } from '../hero.service';
import { Router } from '@angular/router';
import * as fileSaver from 'file-saver';

@Component({
    templateUrl: 'landing.component.html',
    styleUrls: ['landing.component.css']
})
export class LandingComponent {

    fileName = '';
    images = [];
    selectedImages = []; //ezekbe lesznek amiket kivalasztottam

    constructor(private httpService: HttpClient, private heroService: HeroService, private router: Router, private formBuilder: FormBuilder) {
        const getImages$ = this.httpService.get("/getImages");
        getImages$.subscribe(
            (info: HttpResponse<any>) => {

                alert("sikeres képlekérés");
                console.log(info);
                this.images = info["result"];
                setTimeout(() => {
                    this.images = this.images;
                }, 1000);
                console.log(this.images);
            },
            (error: HttpErrorResponse) => {
                alert("Sikertelen képlekérés");
                console.error(error);
                if (error.status == 401) {
                    this.heroService.token = "";
                    this.router.navigate(['./home']);
                }

            }
        );
    }

    addImage(image) { //ez a fgvnek egy idt kellen varnia de az nem sikerult
        if (!this.containsImage(image["id"])) {
            this.selectedImages.push(image["id"]);
            console.log(this.selectedImages);
            console.log(typeof this.selectedImages);
        } else {
            this.selectedImages.forEach((element, index) => {
                if (element == image["id"]) {
                    this.selectedImages.splice(index, 1);
                }
            })
        }
    }

    containsImage(image) {
        return this.selectedImages.includes(image["id"]);
    }


    onDownload() { //kuldenie kellene postba de nevvel amivel le tudom kerni
        console.log(this.selectedImages)
        const postImg$ = this.httpService.post("/downloadImages", this.selectedImages, { responseType: 'blob' });
        postImg$.subscribe(
            (response: any) => {
                let blob: any = new Blob([response]);
                const url = window.URL.createObjectURL(blob);
                fileSaver.saveAs(blob, 'picture.zip');
                alert("sikeres letoltes");
            },
            (error: HttpErrorResponse) => {
                console.log(error)
                if (error.status == 401) {
                    //this.heroService.token = "";
                    this.router.navigate(['landing']);
                    console.log("vmi info rossz agban");
                    alert("nem futott bele");
                }
            }
        )
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

    public getNothingList() {
        return this.images.filter(i => i["nothingFound"]);
    }


    getId = this.images.filter(i => i["id"]);



}