import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-binding',
  templateUrl: './property-binding.component.html',
  styleUrls: ['./property-binding.component.css']
})
export class PropertyBindingComponent implements OnInit {

  color: string="accent";
  btnDisabled=false;
  colors=['primary','accend','warn','']
  idx=0;

  constructor() { }

  ngOnInit() {
    this.idx=1;

    setInterval(()=>{
      this.idx=(this.idx+1) %this.color.length;
    },1000);

  }

}
