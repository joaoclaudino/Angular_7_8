import { Component, OnInit } from '@angular/core';
import { Observable, Observer, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-cold-observables',
  templateUrl: './cold-observables.component.html',
  styleUrls: ['./cold-observables.component.css']
})
export class ColdObservablesComponent implements OnInit {
  subscription1: Subscription;
  subscription2: Subscription;
  n1:number=0;
  n2:number=0;
  s1:string='';
  s2:string='';

  constructor() { }

  ngOnInit() {
    this.s1 = 'Inicializing...';
    this.s2 = 'Inicializing...';
    // console.log("joao");


    const myInternalObservable = new Observable(
      (observer: Observer<any>) =>{
        let i:number=0;
        let id = setInterval(()=>{
            i++;
            console.log('from observable: ', i);
            if  (i==10){
              observer.complete();
            }else if ((i%2)==0){
                observer.next(i);
            }
          },1000
        );
        return ()=>{
          clearInterval(id);
        }
      }
    );

    this.s1='Wainting for interval...';
    this.subscription1=  myInternalObservable.subscribe(
      (n)=>{this.n1=n;},
      (error)=>{ this.s1='Erro> ' + error; },
      () => {this.s1 = 'Completed'}      
    );

  setInterval(()=>{
    this.subscription2=  myInternalObservable.subscribe(
      (n)=>{this.n2=n;},
      (error)=>{ this.s2='Erro> ' + error; },
      () => {this.s2 = 'Completed'}      
    );    
  },3000);



    setTimeout(()=>{
      this.subscription1.unsubscribe();
      this.subscription2.unsubscribe();
    },11000);
    
  }
}
