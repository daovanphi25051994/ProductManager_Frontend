import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export class InputDialogModel {
  constructor(public id: any) { }
}

@Component({
  selector: 'app-them-moi',
  templateUrl: './them-moi.component.html',
  styleUrls: ['./them-moi.component.css']
})
export class CreateProductComponent implements OnInit {

  productForm: FormGroup;
  isAddNext = false;
  isSubmitted = false;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InputDialogModel
  ) { }

  ngOnInit(): void {
    console.log('data', this.data);
    this.productForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.maxLength(255)]],
      description: [null, [Validators.maxLength(500)]],
      isActive: [true, [Validators.required]],
    });
    if (this.data.id) {
      this.productForm.get('id').setValue(this.data.id);
    }
  }

  onCheck(): void {
    this.isAddNext = !this.isAddNext;
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

  submitForm(): void {
    console.log(this.productForm.value);
  //   this.customerForm.markAllAsTouched();
  //   if (this.customerForm.valid) {
  //     this.spinner.show();
  //     this.isSubmitted = true;
  //     this.formatEmptyStringToNull();
  //     if (this.isAddNext && !this.customerForm.get('id').value) {
  //       this.nhomBenhService.create(this.customerForm.value).subscribe(res => {
  //         this.spinner.hide();
  //         if(res.code === 20000) {
  //           this.notificationService.showSuccess('Thêm mới thành công', 'Chỉ tiêu');
  //           this.groupDiseasesForm.reset();
  //           this.groupDiseasesForm.get('isActive').setValue(true);
  //           this.isSubmitted = false;
  //         } else {
  //           if(res.message === 'code.existed') {
  //             this.notificationService.showWarning('Mã chỉ tiêu ' + this.groupDiseasesForm.get('code').value + ' đã tồn tại', 'Chỉ tiêu');
  //           } else {
  //             this.notificationService.showError('Thêm mới thất bại', 'Chỉ tiêu');
  //           }
  //           this.isSubmitted = false;
  //         }
  //       }, err => {
  //         this.spinner.hide();
  //       });
  //     } else if (!this.isAddNext && !this.customerForm.get('id').value) {
  //       this.nhomBenhService.create(this.customerForm.value).subscribe(res => {
  //         this.spinner.hide();
  //         if(res.code === 20000) {
  //           this.notificationService.showSuccess('Thêm mới thành công', 'Chỉ tiêu');
  //           this.dialogRef.close(true);
  //         } else {
  //           if(res.message === 'code.existed') {
  //             this.notificationService.showWarning('Mã chỉ tiêu ' + this.customerForm.get('code').value + ' đã tồn tại', 'Chỉ tiêu');
  //           } else {
  //             this.notificationService.showError('Thêm mới thất bại', 'Chỉ tiêu');
  //           }
  //           this.isSubmitted = false;
  //         }
  //       }, err => {
  //         this.spinner.hide();
  //       });
  //     } else {
  //       this.nhomBenhService.create(this.customerForm.value).subscribe(res => {
  //         this.spinner.hide();
  //         if(res.code === 20000) {
  //           this.dialogRef.close(this.customerForm.value);
  //           this.notificationService.showSuccess('Cập nhật thành công', 'Chỉ tiêu');
  //         } else {
  //           if(res.message === 'code.existed') {
  //             this.notificationService.showWarning('Mã chỉ tiêu ' + this.customerForm.get('code').value + ' đã tồn tại', 'Chỉ tiêu');
  //           } else {
  //             this.notificationService.showError('Cập nhật thất bại', 'Chỉ tiêu');
  //           }
  //           this.isSubmitted = false;
  //         }
  //       }, err => {
  //         this.spinner.hide();
  //       });
  //     }
  // } else {
  //   this.formHelperService.notifyFormInvalid(this.customerForm, 'Chỉ tiêu');
  // }
}


}
