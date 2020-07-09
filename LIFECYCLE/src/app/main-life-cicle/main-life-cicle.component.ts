import { Component, OnInit } from '@angular/core';
import { Client } from '../client';

@Component({
  selector: 'app-main-life-cicle',
  templateUrl: './main-life-cicle.component.html',
  styleUrls: ['./main-life-cicle.component.css']
})
export class MainLifeCicleComponent implements OnInit {

  private foods: string[]=["Rice","Beans","Pizza"];
  private clients: Client[]=[];

  private name:string;
  private age: number;
  private food: string;

  private editClient: number = -1;

  private randomNumber: number;

  constructor() {
    this.GenarateRandomNumber();
    // this.randomNumber =  get'
   }
   
   GenarateRandomNumber(){
     this.randomNumber=Math.round(Math.random()*1000);
   }


  ngOnInit() {
  }

  save(){
    if (this.editClient==-1){
      console.log("name: "+this.name);
      this.clients.push({name: this.name,age: this.age,food: this.food});
    }else{
      this.clients[this.editClient].name=this.name;
      this.clients[this.editClient].age=this.age;
      this.clients[this.editClient].food=this.food;
      this.editClient=-1;
    }
    this.name=null;
    this.age=null;
    this.food=null;
  }

  remove(i:number){
    this.clients.splice(i,1);
  }

  edit(i:number){
    this.name=this.clients[i].name;
    this.age=this.clients[i].age;
    this.food=this.clients[i].food;
    this.editClient=i;
  }
}
