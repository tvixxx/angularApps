import {Route} from "@angular/router";
import {AboutComponent} from "../about/about.component";
import {HomeComponent} from "../home/home.component";
import {AboutGuard} from "../about-page/about.guard";
import {AboutPageComponent} from "../about-page/about-page.component";
import {CreateArticleComponent} from "../create-article/create-article.component";
import {NotFoundComponent} from "../not-found/not-found.component";

export const routes: Route[] = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'create-article',
        loadChildren: './create-article/create-article.module#CreateArticleModule'
    },
    {
        path: 'about/:id',
        component: AboutComponent
    },
    {
        path: 'about-page',
        component: AboutPageComponent,
        canActivate: [AboutGuard],
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
