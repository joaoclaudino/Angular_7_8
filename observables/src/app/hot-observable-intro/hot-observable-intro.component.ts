import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, fromEvent, Observer } from 'rxjs';

@Component({
  selector: 'app-hot-observable-intro',
  templateUrl: './hot-observable-intro.component.html',
  styleUrls: ['./hot-observable-intro.component.css']
})
export class HotObservableIntroComponent implements OnInit {
  
  @ViewChild('myButton') button: ElementRef;
  n1:number=0;
  n2:number=0;
  s1:string='';
  s2:string='';

  constructor() { }

  ngOnInit() {
    let myBtnClickObservable: Observable<any> = fromEvent(
      this.button.nativeElement,'click'
      );

    myBtnClickObservable.subscribe((event) =>{
      console.log('Button Clicked 1');
    });
    myBtnClickObservable.subscribe((event) =>{
      console.log('Button Clicked 2');
    });

    class Producer{
      private MyListiners = [];
      private n = 0;
      private  id;

      addListiner( l ){
        console.log(this.MyListiners.length);
        this.MyListiners.push(l);
      }

      start(){
        this.id= setInterval(()=>{
          this.n++;
          console.log('From Producer: ' + this.n);
          for(let l of this.MyListiners)
            l(this.n);
        },1000);
      }

      stop(){
        clearInterval(this.id);
      }
    }

    let producer: Producer =  new Producer();
    producer.start();

    setTimeout(
      ()=>{
        producer.addListiner((n)=> console.log('From Listiner 1', n));
        producer.addListiner((n)=> console.log('From Listiner 2', n));
      },4000
    );

    const myHotObservable = new Observable(
      (observer: Observer<number>) => {
        producer.addListiner((n)=> observer.next(n))
      }
    );

    myHotObservable.subscribe(
      (n)=>console.log('From Subricriber 1', n)
    );
    myHotObservable.subscribe(
      (n)=>console.log('From Subricriber 2', n)
    );    
  }
}