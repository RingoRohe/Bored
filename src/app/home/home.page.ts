import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { Activity } from '../shared/activity';
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

  constructor(private api: ApiService) { }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
  }
  
  loadActivity() {
    this.api.request().pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log(data);
      this.currentActivity = data;
    });
  }

}
