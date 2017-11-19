import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {EventsService} from "../../shared/services/events.service";
import {CategoriesService} from "../../shared/services/categories.service";
import {CategoryEvent} from "../../shared/models/event.model";
import {Category} from "../../shared/models/category.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  isLoaded: boolean = false;
  event: CategoryEvent;
  category: Category;
  subscription1: Subscription;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.subscription1 = this.route.params
      .mergeMap( (params: Params) => {
        const id = params['id'];
        return this.eventsService.getEventById(id);
      })
      .mergeMap((event: CategoryEvent) => {
        this.event = event;
        return this.categoriesService.getCategoryById(event.category);
      })
      .subscribe( (category: Category) => {
        this.category = category;
        this.isLoaded = true;

        console.log('event is: ', this.event);
        console.log('category is: ', this.category);
      });
  }

  ngOnDestroy() {
    if (this.subscription1) {
      this.subscription1.unsubscribe();
    }
  }
}
