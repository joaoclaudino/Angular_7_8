import { Component, OnInit } from '@angular/core';
import { from, fromEvent, interval, Observable, Subscription, Subject, timer } from 'rxjs';
import { map, delay, filter, tap, take, first, last, debounceTime, takeWhile, takeUntil, toArray } from 'rxjs/operators';

interface User{
  login: string;
  name: string;
}

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.css']
})
export class AsyncComponent implements OnInit {

  private options$: Observable<string[]>;

  private user$: Observable<User>;

  constructor() { }

  ngOnInit() {
    this.options$ = Observable.create(
      (observer) => {
        for(let i=0;i<10;i++){
          observer.next(`This is my ${i}th option`)
        }
        observer.complete();
      }
    )
    .pipe(
      map(s=>s+'!'),
      toArray(),
      delay(1000)
    );

    //this.options$.subscribe(s=>console.log(s));

    this.user$ =  new Observable<User>((observer) => {
      let names = ["Mr. James", "Mr. John","Mr. Ray", "Ms Angle"];
      let logins = ["james", "john","ray", "angle"];
      let i = 0;
      console.log("Here in user$");
      setInterval(()=>{
        if (i==4)
          observer.complete();
        else{
          observer.next({login: logins[i], name: names[i]});
        }
        i++;
      },3000);
    });

    //this.user$.subscribe(s=>console.log(s));
  }
}
