import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CreateArticleComponent} from "./create-article.component";

const createArticleRoutes: Routes = [
    {
        path: '',
        component: CreateArticleComponent,
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(createArticleRoutes),
    ],
    exports: [
        RouterModule
    ]
})
export class CreateArticleRouting {}
