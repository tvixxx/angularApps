import {Injectable} from "@angular/core";
import {BaseApi} from "../../../shared/core/base-api";
import {HttpClient} from "@angular/common/http";

import {Category} from "../models/category.model";
import {Observable} from "rxjs";

@Injectable()
export class CategoriesService extends BaseApi{

  categoriesUrl: string = 'categories';

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }

  addCategory(category: Category): Observable<Category> {
    return this.post(this.categoriesUrl, category)
  }

  getCategories(): Observable<Category[]> {
    return this.get(this.categoriesUrl);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.put(`${this.categoriesUrl}/${category.id}`, category);
  }
}
