import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-two-way-data-binding',
  templateUrl: './two-way-data-binding.component.html',
  styleUrls: ['./two-way-data-binding.component.css']
})
export class TwoWayDataBindingComponent implements OnInit {
  name1: string="João";
  name2: string="Claudino";
  client={
    firstname:"João",
    lastname:"claudino",
    address:"",
    age:0
  };
  constructor() { }

  ngOnInit() {
  }

}
