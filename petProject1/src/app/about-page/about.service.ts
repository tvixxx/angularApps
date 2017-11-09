import {Injectable} from '@angular/core';
import {IAbout} from "../model/about.interface";

@Injectable()
export class AboutService {

    aboutInfo: IAbout = {
        mainTitle: 'This SPA was made using Angular 4',
        subTitle: 'Technologies:',
        technologies: [
            'Angular Animations',
            'Routing',
            'Reactive forms',
            'Lazy load modules',
            'Two way data-binding',
            'One way data-binding',
            'Component modular architecture',
            'Guard routing',
            'Services',
            'Dependency Injection',
            'Directives and custom directives',
            'Pipes and custom pipes',
            'ES6 + TS',
            'rxjs',
            'BEM',
            'HTML',
            'CSS'
        ]
    };

    constructor() {}

    getInfo() {
        return this.aboutInfo;
    }
}
