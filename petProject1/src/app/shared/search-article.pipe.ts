import {Pipe, PipeTransform} from '@angular/core';
import {IArticle} from "../model/article.interface";

@Pipe({
    name: 'articleName'
})
export class SearchArticlePipe implements PipeTransform {

    transform(articles: Array<IArticle>, value: string): any {
        return articles.filter((article) => article.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
    }
}