import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd ! : boolean;
  showUpdate !: boolean;
  constructor(private formBuilder: FormBuilder,private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      salary : ['']
    })
    this.getAllEmployee();
  }
postEmployeeDetails(){
  this.employeeModelObj.firstName = this.formValue.value.firstName;
  this.employeeModelObj.lastName = this.formValue.value.lastName;
  this.employeeModelObj.email = this.formValue.value.email;
  this.employeeModelObj.mobile = this.formValue.value.mobile;
  this.employeeModelObj.salary = this.formValue.value.salary;

  this.api.postEmployee(this.employeeModelObj)
  .subscribe(res=>{
    console.log(res);
    alert("Employee Added Successfully")
    let ref = document.getElementById('cancel')
    ref?.click();
  },
  err=>{
    alert("something went wrong")
  })
}
getAllEmployee(){
  this.api.getEmployee()
  .subscribe(res=>{
    this.employeeData=res;
  })
}
deleteEmployee(row:any){
  console.log("x");
  this.api.deleteEmployee(row.id)
  .subscribe(res=>{
    alert("employee Deleted")
    this.getAllEmployee();
  })
}
onEdit(row:any){
  this.showAdd = false;
  this.showUpdate = true;
  this.employeeModelObj.id=row.id;
  this.formValue.controls['firstName'].setValue(row.firstName);
  this.formValue.controls['lastName'].setValue(row.lastName);
  this.formValue.controls['email'].setValue(row.email);
  this.formValue.controls['mobile'].setValue(row.mobile);
  this.formValue.controls['salary'].setValue(row.salary);
}
clickAddEmploye(){
  this.formValue.reset();
  this.showAdd = true;
  this.showUpdate = false;
} 
updateEmployeeDetails(){
  this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary= this.formValue.value.salary;
}
}
