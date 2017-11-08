import {Component, OnInit, Inject} from '@angular/core';
import {IArticle} from "../model/article.interface";
import {ArticleService} from "../shared/article.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    articles: Array<IArticle> = [];
    query: string = '';

    styles: any = {
        maxHeight: '50px',
        overflow: 'hidden'
    };

    constructor(private articleService: ArticleService) {
    }

    ngOnInit() {
        this.articles = this.articleService.getArticles();

    }

    titleHandler(item: IArticle) {
        this.articleService.updateArticle(item);
    }

    removeArticleHandler(item: IArticle) {
        this.articleService.removeArticle(item);
        this.articles = this.articleService.getArticles();
    }

    changeSearchQuery(search) {
        this.query = search;
    }

    changeSearchQueryByBadge(search) {
        this.query = search;
    }
}