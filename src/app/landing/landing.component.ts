import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({ templateUrl: 'landing.component.html' })
export class LandingComponent /*implements OnInit*/ {

    /*
    SERVER_URL = "http://localhost:4200/landing";
    uploadForm: FormGroup;
    constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }

    ngOnInit() {
        this.uploadForm = this.formBuilder.group({
            profile: ['']
        });
    }

    onFileSelect(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.uploadForm.get('profile').setValue(file);
        }
    }

    onSubmit() {
        const formData = new FormData();
        formData.append('file', this.uploadForm.get('profile').value);

        this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
            (res) => console.log(res),
            (err) => console.log(err)
        );
    }
    */
    selectedFile = null;

    onFileSelected(event) {

        this.selectedFile = event.target.files[0];
    }
    onUpload() {

    }
}