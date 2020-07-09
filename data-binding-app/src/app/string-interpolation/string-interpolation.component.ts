import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-string-interpolation',
  templateUrl: './string-interpolation.component.html',
  styleUrls: ['./string-interpolation.component.css']
})
export class StringInterpolationComponent implements OnInit {

  firstname="Jhon";
  age=100;
  person = {
    firstname: "Jhon",
    lastname: "bro",
    age: 50,
    address: "Av Brazil"

  }
  constructor() { }

  ngOnInit() {
  }

}
