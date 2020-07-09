import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child-item',
  templateUrl: './child-item.component.html',
  styleUrls: ['./child-item.component.css']
})
export class ChildItemComponent implements OnInit {

  @Input() title: string;
  @Output() inc= new EventEmitter<number>();
  // @Output() plusTwo= new EventEmitter<any>();
  // @Output() minusOne= new EventEmitter<any>();
  // @Output() minusTwo= new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }
  btnClick(n){
    this.inc.emit(n);
  } 
  // plusOneClick(){
  //     this.inc.emit(1);
  // }

  // plusTwoClick(){
  //   this.inc.emit(2);
  // }

  // minusOneClick(){
  //   this.inc.emit(-1);
  // }

  // minusTwoClick(){
  //   this.inc.emit(-2);
  // }  
}
