import { Injectable } from '@angular/core';
import { Department } from './models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private departments: Department[] = [
    {id:1 , name:"Clothig"}
    ,{id:2 , name:"books"}
    ,{id:3 , name:"Eletronics"}
    ,{id:4 , name:"Computers"}
  ];

  private nextID: number = 5;
  constructor() { }

  getDepartments(): Department[]{
    return this.departments;
  }

  addDepartment(d: Department){
    // d.id= this.nextID++;
    this.departments.push({...d, id:  this.nextID++});
    console.log(this.departments);
  }

  getDepartmentByID(id: number):Department{
    return this.departments.find((d) => d.id == id)
  }

}
