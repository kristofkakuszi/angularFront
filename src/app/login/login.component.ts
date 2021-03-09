import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';


@Component({
    templateUrl: 'login.component.html'
})

export class LoginComponent {

    loginForm = new FormGroup({

        username: new FormControl(''),
        password: new FormControl(''),
    });

    onLogin() {
        console.warn(this.loginForm.value)
    }

    /*
    username = new FormControl('');

    password = new FormControl('');

    onLogin() {
        console.warn(this.username.value)
        console.warn(this.password.value)
    }
    */


}
