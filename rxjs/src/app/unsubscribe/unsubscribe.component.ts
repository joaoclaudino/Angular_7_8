import { Component, OnInit } from '@angular/core';
import { interval, fromEvent, Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit {
  private subscriptionAreActive = false;
  private subscriptions: Subscription[]=[];
  private unsubcribeAll$: Subject<any> =  new Subject();
  private intevalSubscription: Subscription = null;
  constructor() { }

  ngOnInit() {
    this.checkSubscriptions();
  }

  subscribe(){
    const subscription1=interval(100)
      .pipe(takeUntil(this.unsubcribeAll$))
      .subscribe((i)=>{
          console.log(i);
        }
    );
    const subscription2=fromEvent(document,'mousemove')
      .pipe(takeUntil(this.unsubcribeAll$))
      .subscribe((e)=>console.log(e));
    this.subscriptions.push(subscription1);
    this.subscriptions.push(subscription2);
  }

  checkSubscriptions(){
    this.intevalSubscription=interval(100).subscribe(()=>{
        let active = false;
        this.subscriptions.forEach((s)=>{
          if (!s.closed)
            active=true;
        })
        this.subscriptionAreActive=active;
      }
    );
  }

  unsubscribe(){
    this.unsubcribeAll$.next();
  }

  ngOnDestroy(){
    if( this.intevalSubscription!=null)
      this.intevalSubscription.unsubscribe();
    console.log('Destroy');
    this.unsubcribeAll$.next();
  }

}
