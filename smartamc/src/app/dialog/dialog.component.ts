import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  dataForm!:FormGroup;
  actionBtn:string = "Save"
  constructor(private formBuilder : FormBuilder, 
    private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.dataForm=this.formBuilder.group({
      refId:['',Validators.required],
      tenderNo:['',Validators.required],
      tenderDescription:['',Validators.required],
      modeOfTender:['',Validators.required],
      tenderValue:['',Validators.required],
      tenderFloatedOn:['',Validators.required],
      tenderOpenedOn:['',Validators.required],
      awardNo:['',Validators.required],
      awardedOn:['',Validators.required],
      awardedFirmName:['',Validators.required],
      awardedAddress:['',Validators.required],
      awardedFirmSapVendorCode:['',Validators.required],
      awardedValue:['',Validators.required],
      unitId:['',Validators.required],
      unitName:['',Validators.required],
      divisonId:['',Validators.required],
      divisonName:['',Validators.required],
      hodName:['',Validators.required],
      hodContactnoNLC:['',Validators.required],
      hodContactnoMob:['',Validators.required]
      
    });

    if(this.editData){
      this.actionBtn="update";
      this.dataForm.controls['refId'].setValue(this.editData.refId);
      this.dataForm.controls['tenderNo'].setValue(this.editData.tenderNo);
      this.dataForm.controls['tenderDescription'].setValue(this.editData.tenderDescription);
      this.dataForm.controls['modeOfTender'].setValue(this.editData.modeOfTender);
      this.dataForm.controls['tenderValue'].setValue(this.editData.tenderValue);
      this.dataForm.controls['tenderFloatedOn'].setValue(this.editData.tenderFloatedOn);
      this.dataForm.controls['tenderOpenedOn'].setValue(this.editData.tenderOpenedOn);
      this.dataForm.controls['awardNo'].setValue(this.editData.awardNo);
      this.dataForm.controls['awardedOn'].setValue(this.editData.awardedOn);
      this.dataForm.controls['awardedFirmName'].setValue(this.editData.awardedFirmName);
      this.dataForm.controls['awardedAddress'].setValue(this.editData.awardedAddress);
      this.dataForm.controls['awardedFirmSapVendorCode'].setValue(this.editData.awardedFirmSapVendorCode);
      this.dataForm.controls['awardedValue'].setValue(this.editData.awardedValue);
      this.dataForm.controls['unitId'].setValue(this.editData.unitId);
      this.dataForm.controls['unitName'].setValue(this.editData.unitName);
      this.dataForm.controls['divisonId'].setValue(this.editData. divisonId);
      this.dataForm.controls['divisonName'].setValue(this.editData.divisonName);
      this.dataForm.controls['hodName'].setValue(this.editData.hodName);
      this.dataForm.controls['hodContactnoNLC'].setValue(this.editData.hodContactnoNLC);
/*       this.dataForm.controls['hodContactnoMob'].setValue(this.editData.hodContactnoMob);
 */
    }

  }
  addData(){
    if(!this.editData){
      this.api.postData(this.dataForm.value)
        .subscribe({
          next:(res)=>{
            alert("Data added successfully");
            this.dataForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error while adding the data");
          }
        })
  }
  else{
      this.updateData();
  }
}
  updateData() {
    this.api.putData(this.dataForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Data updated Successfully");
        this.dataForm.reset();
        this.dialogRef.close("update");
      },
      error:()=>{
        alert("Error while updating the record");
      }
    })
  }
}
