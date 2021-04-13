import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({ templateUrl: 'landing.component.html' })
export class LandingComponent {

    imgFile: string;

    uploadForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        file: new FormControl('', [Validators.required]),
        imgSrc: new FormControl('', [Validators.required])
    });

    constructor(private httpService: HttpClient) { }

    get uf() {
        return this.uploadForm.controls;
    }

    onImageChange(e) {
        const reader = new FileReader();

        if (e.target.files && e.target.files.length) {
            const [file] = e.target.files;
            reader.readAsDataURL(file);

            reader.onload = () => {
                this.imgFile = reader.result as string;
                this.uploadForm.patchValue({
                    imgSrc: reader.result
                });

            };
        }
    }

    upload() {
        console.log(this.uploadForm.value);
        this.httpService.post("/onUpload", this.uploadForm.value)
            .subscribe(response => {
                console.warn(this.uploadForm.value)
            })
    }
    /*
    selectedFile: File = null;

    constructor(private httpService: HttpClient) { }

    onFileSelected(event) {
        this.selectedFile = <File>event.target.files[0];
    }

    Upload() {
        const fd = new FormData();
        fd.append('image', this.selectedFile, this.selectedFile.name);
        this.httpService.post("/onUpload", this.selectedFile).subscribe(res => {
            console.log(res);
            console.warn(this.selectedFile);
        });
    }
    //this.selectedFile ha elfogad binaryt onUpload után (fd helyett)
    */

}