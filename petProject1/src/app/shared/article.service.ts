import {Injectable} from '@angular/core';
import {IArticle} from "../model/article.interface";
import {Http, Jsonp, Response} from '@angular/http';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/Observable/throw";
import {Observable} from "rxjs";

// const ARTICLES_API = './assets/articles';

@Injectable()
export class ArticleService {

    // articles: Observable<any>;
    articles: Array<IArticle> = [
        {
            id: 1,
            name: 'Get Started with Angular',
            description: 'Angular is basically a collection of Components brought together within modules. The many tools, such as the Angular CLI, allow you to easily creat...',
            img_src: 'https://d2eip9sf3oo6c2.cloudfront.net/tech/defaults/course_image_full_angular2.png'
        },
        {
            id: 2,
            name: 'Getting Started with Redux',
            description: 'orem dd sasada  adssaih apodjapd asd aknpihs as',
            img_src: 'https://d2eip9sf3oo6c2.cloudfront.net/series/square_covers/000/000/025/full/EGH_Redux-New.png?1496436379'
        },
        {
            id: 3,
            name: 'Using Webpack for Production JavaScript Applications',
            description: 'rem ds asd aknpihs as',
            img_src: 'https://d2eip9sf3oo6c2.cloudfront.net/series/square_covers/000/000/054/full/EGH_Webpack-Final.png?1496436445'
        },
        {
            id: 4,
            name: 'Understand How to Style Angular Components',
            description: 'Developers usually have a love-hate relationship with CSS and styling user interfaces. But it is a fundamental part of creating nice-looking, adorable and successful user interfaces. In this course we will take a deep dive into the various possibilities Angular offers for styling components. We learn about the different APIs, how they allow us to conditionally apply one or multiple styles in the form of style attributes and CSS classes. We also explore the concept of style encapsulation and how it helps prevent our styles from leaking into other components.',
            img_src: 'https://d2eip9sf3oo6c2.cloudfront.net/series/square_covers/000/000/132/full/EGH_Angular_Style-Final.png?1500692925'
        },
        {
            id: 5,
            name: 'Understand Angular Directives in Depth',
            description: 'Angular Directives allow you to add custom behavior to elements and components. Rather than creating a hierarchy of components to try to "extend" behavior, Angular Directives enable you to compose behaviors on to your components. This includes adding event listeners that hook into services, manipulating templates, and adding more configuration to basic elements. This course helps you understand the concepts around building our Angular directives and provides examples from basic directives that inspect elements to advanced structural directives that completely re-write templates. If Angular is new and the syntax foreign, you will want to check out ',
            img_src: 'https://d2eip9sf3oo6c2.cloudfront.net/series/square_covers/000/000/091/full/EGH_A2_Directives_Final.png?1496436575'
        },
        {
            id: 6,
            name: 'Angular Dependency Injection (DI) Explained',
            description: 'This course will teach you the ins and outs of dependency injection in Angular. You will learn what dependency injection means, how it applies to software in general and how it is implemented in Angular. We will take a look at simple use cases like injecting services, to exploring different providers recipes and when they are useful. We will also cover almost unknown features like viewProviders, OpaqueToken and edge cases where forwardRef() is needed.',
            img_src: 'https://d2eip9sf3oo6c2.cloudfront.net/series/square_covers/000/000/066/full/EGH_A2_DependencyEngine_Final.png?1496436482'
        }
    ];

    constructor(private _jsonp: Jsonp, private http: Http) {
    }

    // getData(): Observable<any> {
    //   return this.http
    //     .get('https://dog.ceo/api/breeds/list/all')
    //     .map(response => response.json())
    //     .map(data => data);
    // }

    // getArticles(): Observable<IArticle> {
    //   return this.http
    //     .get(ARTICLES_API)
    //     .map( (response: Response) => response.json().articles)
    //     .catch( (error: any) => Observable.throw(error.json() ));
    // }

    // addNewArticle(newArticle) {
    //   return this.http
    //     .put()
    // }

    getArticles(): IArticle[] {
        return this.articles;
    }

    getArticleById(id) {
        return this.articles.filter((article) => {
            return article.id === parseInt(id, 10);
        });
    }

    getLastArticleId() {
        let lastArticle = this.articles.length;
        return this.articles[lastArticle - 1];
    }

    addNewArticle(newArticle) {
        this.articles.push(newArticle);
    }

    updateArticle(item) {
        this.articles = this.articles.map((article: IArticle) => {
            if (article.id === item.id) {
                article.name = item.name;
                return article;
            }
            return article;
        });
    }

    removeArticle(item) {
        this.articles = this.articles.filter((article: IArticle) => {
            return article.id !== item.id;
        });
    }

    // updateArticle(article: IArticle): Observable<IArticle> {
    //
    //   return this.http
    //     .put(ARTICLES_API, article)
    //     .map( (response: Response) => response.json().articles )
    //     .catch( (error: any) => Observable.throw(error.json() ));
    // }
}