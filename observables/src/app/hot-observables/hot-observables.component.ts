import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subject, ConnectableObservable } from 'rxjs';
import {publish, refCount,share} from 'rxjs/operators'
@Component({
  selector: 'app-hot-observables',
  templateUrl: './hot-observables.component.html',
  styleUrls: ['./hot-observables.component.css']
})
export class HotObservablesComponent implements OnInit {
  
  n1:number=0;
  n2:number=0;
  s1:string='';
  s2:string='';
  
  myObservable: Observable<number>;

  constructor() { }

  ngOnInit() {
    this.myObservable= new Observable(
      (observer: Observer<number>)=>{
        let i : number = 0;
        console.log('%c Observable Created','background: #cccccc; color: #ff0000');
        setInterval(()=>{
          i++;
          console.log('%c i = ' + i,'background: #cccccc; color: #0000FF');
          (i==100) ? observer.complete() : observer.next(i);
        },1000);
      }
    );
    //this.usingSubjects();
    //this.usingPublish();
    this.usingShare();
  }

  usingShare(){
    const multcasted = this.myObservable.pipe(share())

    
    //SubsCriber 1
    this.s1 ="Waiting for Interval...";
    setTimeout(()=>{
      multcasted.subscribe((_n)=>{
        // console.
        this.n1 = _n;
        this.s1='OK';
      });
    },2000);
    //SubsCriber 2
    this.s2 ="Waiting for Interval...";
    setTimeout(()=>{
      multcasted.subscribe((_n)=>{
        // console.
        this.n2 = _n;
        this.s2='OK';
      });
    },4000);      


  }

  usingPublish(){
    // const multcasted = this.myObservable.pipe(publish(), refCount())
    const multcasted : ConnectableObservable<number> = this.myObservable
      .pipe(publish()) as ConnectableObservable<number>;
    // multcasted.connect();
    
    //SubsCriber 1
    this.s1 ="Waiting for Interval...";
    setTimeout(()=>{
      multcasted.subscribe((_n)=>{
        // console.
        this.n1 = _n;
        this.s1='OK';
      });
    },2000);
    //SubsCriber 2
    this.s2 ="Waiting for Interval...";
    setTimeout(()=>{
      multcasted.connect();
      multcasted.subscribe((_n)=>{
        // console.
        this.n2 = _n;
        this.s2='OK';
      });
    },4000);      


  }

  usingSubjects(){
    const subject=new Subject<number>();
    this.myObservable.subscribe(subject);    

    //SubsCriber 1
    this.s1 ="Waiting for Interval...";
    setTimeout(()=>{
      subject.subscribe((_n)=>{
        // console.
        this.n1 = _n;
        this.s1='OK';
      });
    },2000);
    //SubsCriber 2
    this.s2 ="Waiting for Interval...";
    setTimeout(()=>{
      subject.subscribe((_n)=>{
        // console.
        this.n2 = _n;
        this.s2='OK';
      });
    },4000);    
  }
}
