import {Component, OnInit} from '@angular/core';
import {AboutService} from "./about.service";
import {IAbout} from "../model/about.interface";

@Component({
    selector: 'app-about-page',
    templateUrl: './about-page.component.html',
    styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {

    aboutInfo: IAbout;

    constructor(private aboutService: AboutService) {
    }

    ngOnInit() {
        this.aboutInfo = this.aboutService.getInfo();
    }

}
