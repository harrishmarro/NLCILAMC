import { HttpClient } from '@angular/common/http';
import { compileDeclareInjectableFromMetadata } from '@angular/compiler';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  postData(data : any){
    return this.http.post<any>("http://localhost:3000/dataList/",data);
  }
  getData(){
    return this.http.get<any>("http://localhost:3000/dataList");
  }
  putData(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/dataList/"+id,data);
  }
  deleteData(id:number){
    return this.http.delete<any>("http://localhost:3000/dataList/"+id);
  }
}
