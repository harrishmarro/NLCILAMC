import { ApiService } from './services/api.service';
import { Component, OnInit,ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'smartamc';
  displayedColumns: string[] = ['refId','tenderNo','tenderDescription','modeOfTender','tenderValue','tenderFloatedOn','tenderOpenedOn','awardNo','awardedOn','awardedFirmName','awardedAddress','awardedFirmSapVendorCode','awardedValue','unitId','unitName','divisonId','divisonName','hodName','hodContactnoNLC','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog,private api: ApiService){

  }
ngOnInit(): void {
  this.getAllData();
}
openDialog() {
  this.dialog.open(DialogComponent, {
  width:'30%'
  }).afterClosed().subscribe(val=>{
    if(val=='save'){
      this.getAllData();
    }
  });
}
getAllData(){
  this.api.getData()
  .subscribe({
    next:(res)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    },
    error:(err)=>{
      alert('error while fetching the records');
    }
  })
}
editData(row:any){
  this.dialog.open(DialogComponent,{
    width:'30%',
    data:row
  }).afterClosed().subscribe(val=>{
    if(val==='update'){
      this.getAllData();
    }
  })
}
deleteData(id:number){
  this.api.deleteData(id)
  .subscribe({
    next:(res)=>{
      alert("Deleted Successfully");
      this.getAllData();
    },
    error:()=>{
      alert("Error while deleting the record!!");
    }
  })
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
