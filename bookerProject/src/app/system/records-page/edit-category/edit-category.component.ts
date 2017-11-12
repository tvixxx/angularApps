import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CategoriesService} from "../../shared/services/categories.service";
import {Category} from "../../shared/models/category.model";
import {Message} from "../../../shared/models/message.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  sub1: Subscription;

  @Input()
  categories: Category[] = [];

  @Output()
  onCategoryEdit: EventEmitter<Category> = new EventEmitter<Category>();

  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.message = new Message('success', '');
    this.onCategoryChange();
  }

  onCategoryChange() {
    this.currentCategory = this.categories.find( (category) => {
      return category.id === +this.currentCategoryId
    });
  }

  onSubmit(form: NgForm) {
    let { categoryName, categoryCapacity } = form.value;

    if (categoryCapacity < 0) {
      categoryCapacity *= -1;
    }

    const category = new Category(categoryName, categoryCapacity, +this.currentCategoryId);

    this.sub1 = this.categoriesService
      .updateCategory(category)
      .subscribe( (category: Category) => {
        this.onCategoryEdit.emit(category);
        this.message.text = 'Категория успешно обновлена';

        setTimeout(() => {
          this.message.text = '';
        }, 3000);
      });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
