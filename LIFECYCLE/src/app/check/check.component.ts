import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  
  @Input() test: string;
  
  private name: string="";
  private age: number=0;


  constructor() {
    console.log("        CheckChild: constructor");
   }

  ngOnInit() {
    console.log("        CheckChild: ngOnInit");
  }

  ngOnchanges(){
    console.log("        CheckChild: ngOnchanges");
  }

  ngDoCheck(){
    console.log("        CheckChild: ngDoCheck");
  }

  ngAfterContentInit(){
    console.log("        CheckChild: ngAfterContentInit");
  }

  ngAfterContentChecked(){
    console.log("        CheckChild: ngAfterContentChecked");
  }

  ngAfterViewInit(){
    console.log("        CheckChild: ngAfterViewInit");
  }

  ngAfterViewChecked(){
    console.log("        CheckChild: ngAfterViewChecked");
  }

  ngOnDestroy(){
    console.log("        CheckChild: ngOnDestroy");
  }
}
