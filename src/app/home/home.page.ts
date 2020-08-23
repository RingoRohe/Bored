import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { Activity, Type, ActivityType } from '../shared/activity';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  currentActivity: Activity = null;
  destroy$: Subject<boolean> = new Subject<boolean>();
  currentActivityType: ActivityType = { text: null, icon: null };
  isLoading: boolean = false;

  constructor(private api: ApiService) { }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
  }
  
  loadActivity() {
    this.isLoading = true;
    this.api.request().pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.currentActivity = data;
      this.setActivityType();
      this.isLoading = false;
      console.log(this.currentActivity);0
    });
  }

  setActivityType() {
    this.currentActivityType.text = this.currentActivity.type;

    switch (this.currentActivity.type) {
      case Type.EDUCATION:
        this.currentActivityType.icon = 'library';
        break;
      case Type.RECREATIONAL:
        this.currentActivityType.icon = 'bicycle-outline';
        break;
      case Type.SOCIAL:
        this.currentActivityType.icon = 'chatbubbles-outline';
        break;
      case Type.DIY:
        this.currentActivityType.icon = 'hammer-outline';
        break;
      case Type.CHARITY:
        this.currentActivityType.icon = 'thumbs-up-outline';
        break;
      case Type.COOKING:
        this.currentActivityType.icon = 'fast-food-outline';
        break;
      case Type.RELAXATION:
        this.currentActivityType.icon = 'bed-outline';
        break;
      case Type.MUSIC:
        this.currentActivityType['icon'] = 'musical-notes-outline';
        break;
      case Type.BUSYWORK:
        this.currentActivityType['icon'] = 'construct-outline';
        break;
    }

    console.log(this.currentActivityType);
  }

  get price(): string {
    if (this.currentActivity.price === 0) {
      return 'free';
    }
    if (this.currentActivity.price < 0.1) {
      return 'almost free';
    }
    if (this.currentActivity.price < 0.3) {
      return 'cheap';
    }
    if (this.currentActivity.price < 0.5) {
      return 'affordable';
    }
    if (this.currentActivity.price < 0.6) {
      return 'okay';
    }
    if (this.currentActivity.price < 0.7) {
      return 'pricey';
    }
    if (this.currentActivity.price <= 0.9) {
      return 'expensive';
    }
    if (this.currentActivity.price > 0.9) {
      return 'luxury';
    }
  }

}
