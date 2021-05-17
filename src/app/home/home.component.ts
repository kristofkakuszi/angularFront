import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from '../hero.service';

@Component({
    templateUrl: 'home.component.html',
    //styleUrls: ['css/style.css'],
})
export class HomeComponent {

    constructor(private router: Router, private heroService: HeroService) { }

}