import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    templateUrl: 'register.component.html'
})
export class RegisterComponent {

    registerForm = new FormGroup({

        username: new FormControl(''),
        inpPassword: new FormControl(''),
        inpPassword1: new FormControl(''),
    });

    onRegister() {
        console.warn(this.registerForm.value)
    }

}