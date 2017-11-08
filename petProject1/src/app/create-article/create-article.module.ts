import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

import {CreateArticleComponent} from "./create-article.component";
import {ArticleService} from "../shared/article.service";
import {CreateArticleRouting} from "./create-article.routing";

@NgModule({
    declarations: [
        CreateArticleComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        CreateArticleRouting
    ],
    providers: [
        ArticleService
    ]

})
export class CreateArticleModule {}
