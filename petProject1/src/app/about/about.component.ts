import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../shared/article.service";
import {IArticle} from "../model/article.interface";

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    currentArticle;
    currentId;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private articleService: ArticleService
    ) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {

            if (params.id) {
                this.currentId = params.id;
            }
        });

        this.currentArticle = this.articleService.getArticleById(this.currentId)[0];
    }

    goHomePage() {
        this.router.navigateByUrl('/');
    }

}
