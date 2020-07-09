import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-binding',
  templateUrl: './event-binding.component.html',
  styleUrls: ['./event-binding.component.css']
})
export class EventBindingComponent implements OnInit {
  buttonName="My button";
  i=0;
  value=10;
  constructor() { }
  spinnerMode="determinate";
  btnEnabled=true;
  selectDisabled=false;
  selectedOption=1;
  inputName="João";
  ngOnInit() {
  }
  save(){
    console.log("click");
  }
  inc(){
    this.i++;
    this.buttonName="It  was clicked " + this.i + " times";
    this.value++;
  }
  disabled(){
    this.btnEnabled=false;
    this.spinnerMode="indeterminate";
    setTimeout( () => {
      this.btnEnabled=true;
      this.spinnerMode="determinate";

    },3000);
  }
  cbChange(event){
    console.log(event.checked);
    this.selectDisabled=event.checked;
  }

  selectionChange(event){
    console.log(event);
    this.selectedOption=event.value;
  }
  // inputEvent(event){
  //   console.log(event.target.value);
  //   console.log(this.inputName);
  // }
}
