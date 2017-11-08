import {Component, OnInit} from '@angular/core';
import {IArticle} from "../model/article.interface";
import {ArticleService} from "../shared/article.service";
import {Router} from "@angular/router";
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'app-create-article',
    templateUrl: './create-article.component.html',
    styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

    newArticle: IArticle = {
        id: 0,
        name: '',
        description: '',
        img_src: ''
    };

    constructor(
        private articleService: ArticleService,
        private router: Router
    ) {}

    ngOnInit() {

    }

    get name() {
        return this.createForm.get('name');
    }

    get src() {
        return this.createForm.get('src');
    }

    get description() {
        return this.createForm.get('description');
    }

    createForm: FormGroup = new FormGroup({
        name: new FormControl('', [
            Validators.minLength(5),
            Validators.maxLength(40),
            Validators.required
        ]),
        src: new FormControl('', [
            Validators.minLength(7),
            Validators.required
        ]),
        description: new FormControl('', [
            Validators.minLength(10),
            Validators.required
        ])
    });

    setUniqueId(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    createArticleHandler() {
        this.newArticle.id = this.articleService.getLastArticleId().id;
        this.newArticle.id += 1;
        console.log(this.newArticle.id);
        this.articleService.addNewArticle(this.newArticle);
    }

    goHomePage() {
        this.router.navigateByUrl('/');
    }

    submit(event) {
        this.createArticleHandler();
        this.goHomePage();
    }
}