import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopoverController } from "@ionic/angular";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApiService } from '../shared/services/api.service';
import { Activity, Type, ActivityType } from '../shared/activity';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit, OnDestroy {
  currentActivity: Activity = null;
  destroy$: Subject<boolean> = new Subject<boolean>();
  currentActivityType: ActivityType = { text: null, icon: null };
  activityTypeKeys: Object = Object.keys(Type);

  isLoading: boolean = false;
  isFilterActive: boolean = false;

  filterParams: object = {
    participants: 1,
    participantsFilterDisabled: true,
    price: {
      lower: 0,
      upper: 1,
    },
    type: "SOCIAL",
    typeFilterDisabled: true,
  };

  participantsValue: number = 3;
  priceValues: Object = { lower: 0.2, upper: 1 };

  constructor(
    public api: ApiService,
    public modalController: PopoverController
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {}

  loadActivity() {
    this.isLoading = true;
    this.isFilterActive = false;
    this.api
      .request(this.filterParamsToHttpParams())
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.currentActivity = data;
        this.setActivityType();
        this.isLoading = false;
        // console.log(this.currentActivity);
        0;
      });
  }

  setActivityType() {
    this.currentActivityType.text = this.currentActivity.type;

    switch (this.currentActivity.type) {
      case Type.EDUCATION:
        this.currentActivityType.icon = "library";
        break;
      case Type.RECREATIONAL:
        this.currentActivityType.icon = "bicycle-outline";
        break;
      case Type.SOCIAL:
        this.currentActivityType.icon = "chatbubbles-outline";
        break;
      case Type.DIY:
        this.currentActivityType.icon = "hammer-outline";
        break;
      case Type.CHARITY:
        this.currentActivityType.icon = "thumbs-up-outline";
        break;
      case Type.COOKING:
        this.currentActivityType.icon = "fast-food-outline";
        break;
      case Type.RELAXATION:
        this.currentActivityType.icon = "bed-outline";
        break;
      case Type.MUSIC:
        this.currentActivityType.icon = "musical-notes-outline";
        break;
      case Type.BUSYWORK:
        this.currentActivityType.icon = "construct-outline";
        break;
    }
  }

  get activityTypes() {
    return Type;
  }

  get price(): string {
    if (this.currentActivity.price === 0) {
      return "free";
    }
    if (this.currentActivity.price < 0.1) {
      return "almost free";
    }
    if (this.currentActivity.price < 0.3) {
      return "cheap";
    }
    if (this.currentActivity.price < 0.5) {
      return "affordable";
    }
    if (this.currentActivity.price < 0.6) {
      return "okay";
    }
    if (this.currentActivity.price < 0.7) {
      return "pricey";
    }
    if (this.currentActivity.price <= 0.9) {
      return "expensive";
    }
    if (this.currentActivity.price > 0.9) {
      return "luxury";
    }
  }

  filterParamsToHttpParams(): Object {
    let params: Object = {};
    if (!this.filterParams["participantsFilterDisabled"]) {
      params["participants"] = this.filterParams["participants"];
    }
    if (
      this.filterParams["price"]["lower"] > 0 ||
      this.filterParams["price"]["upper"] < 1
    ) {
      params["minprice"] = this.filterParams["price"]["lower"];
      params["maxprice"] = this.filterParams["price"]["upper"];
    }
    if (!this.filterParams["typeFilterDisabled"]) {
      params["type"] = this.activityTypes[this.filterParams["type"]];
    }
    return params;
  }

  toggleFilterActivity() {
    this.isFilterActive = !this.isFilterActive;
  }
}
