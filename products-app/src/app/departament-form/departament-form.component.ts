import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-departament-form',
  templateUrl: './departament-form.component.html',
  styleUrls: ['./departament-form.component.css']
})
export class DepartamentFormComponent implements OnInit {

  depName: string;
  constructor(private departmentService: DepartmentService) { }

  ngOnInit() {
  }

  save(){
    this.departmentService.addDepartment(
      { name: this.depName }
    );
    this.clear();
  }

  clear(){
    this.depName="";
  }
}
