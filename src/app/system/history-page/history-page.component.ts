import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {combineLatest, Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';

import * as moment from 'moment';
import {Category} from '../shared/models/category.model';
import {WFMEvent} from '../shared/models/event.model';


@Component({
  selector: 'wfm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  constructor(private categoriesService: CategoriesService,
              private eventService: EventsService,
              private title: Title
              ) {
    title.setTitle('Страница истории');
  }

  isLoaded = false;
  s1: Subscription;
  categories: Category[] = [];
  events: WFMEvent[] = [];
  filterEvents: WFMEvent[] = [];
  // расход
  chartData = [];
  chartDataEmpty = true;
  // доход
  chartDataIncome = [];
  chartDataIncomeEmpty = true;
  isFilterVisible = false;
  ngOnInit() {
    this.s1 = combineLatest([this.categoriesService.getCategories(),
      this.eventService.getEvents()])
      .subscribe((data: [Category[], WFMEvent[]]) => {
        this.categories = data[0];
        this.events = data[1];

        this.setOriginalevents();
        this.calculateCharData();
        this.isLoaded = true;
        });
  }

  private setOriginalevents() {
    // slice - извлекает секцию массива и возвращает новый массив
    this.filterEvents = this.events.slice();
  }

  calculateCharData(): void {
    this.chartData = [];
    this.chartDataEmpty = true;
    this.categories.forEach((cat) => {
      const catEvent = this.filterEvents.filter((e) => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => {
          total += e.amount;
          if (total !== 0) { this.chartDataEmpty = false; }
          return total;
        }, 0)
      });
    });
    if (this.chartDataEmpty) {this.chartData = null; }
    this.chartDataIncome = [];
    this.chartDataIncomeEmpty = true;
    this.categories.forEach((cat) => {
      const catEvent = this.filterEvents.filter((e) => e.category === cat.id && e.type === 'income');
      this.chartDataIncome.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => {
          total += e.amount;
          if (total !== 0) { this.chartDataIncomeEmpty = false; }
          return total;
        }, 0)
      });
    });
    if (this.chartDataIncomeEmpty) {this.chartDataIncome = null; }
  }

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  }
  openFilter() {
    this.toggleFilterVisibility(true);
  }

  onFilterApply(filterData) {
    this.toggleFilterVisibility(false);
    this.setOriginalevents();

    // определяем границы периода перед филтрацией
    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filterEvents = this.filterEvents
      .filter((e) => {
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter ((e) => {
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e) => {
        // moment() 1- объект где хранится дата, 2 - формат в котором эта дата хранится
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });
    this.calculateCharData();

  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.setOriginalevents();
    this.calculateCharData();
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }

}
