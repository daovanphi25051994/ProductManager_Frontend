import { ProductsService } from './products.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataGrid, IDataGridColumn, IDataGridManipulation } from 'app/shared/components/base-table/model';
import { DataGridPage } from 'app/shared/components/base-table/model/dataGridPageImpl';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductComponent } from './them-moi/them-moi.component';
import { Product } from 'app/core/models/product';

const fakeDate: Product[] = [
  {
    id: 1,
    name: 'phi1',
    description: '0929292929',
    isActive: true
  },
  {
    id: 2,
    name: 'phi2',
    description: '0929292929',
    isActive: false
  }
]

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterViewInit {

  @ViewChild('resourceGrid') resourceGrid: DataGrid;
  @ViewChild('searchForm') searchFormRef: ElementRef;
  resultRows: Product[] = fakeDate;

  pageCustomer = new DataGridPage(20, 1);
  searchForm: FormGroup;
  manipulation: IDataGridManipulation = {
    show: true,
    buttons: [
      {
        tooltip: 'Chi tiết',
        icon: 'ic_btn_view_table',
        onClick: (row: any, index: any) => {
          this.detail( row);
        },
      },
      {
        tooltip: 'Cập nhật',
        icon: 'ic_btn_edit_table',
        onClick: (row: any, index: any) => {
          // this.updateTeam(row.id);
        },
        // invisibleWhen: (row: any) => {
        //   if (row.status === 0) {
        //     return true;
        //   } else {
        //     return false;
        //   }
        // }
      },
      {
        tooltip: 'Xóa',
        icon: 'ic_btn_delete_table',
        style: 'background-color: #dd3030;',
        onClick: (row: any, index: any) => {
          // this.deleteTeam(row);
        },
        // invisibleWhen: (row: any) => {
        //   if (row.status === 0) {
        //     return true;
        //   } else {
        //     return false;
        //   }
        // }
      },
    ],
  };

  resourceGridApi = (page, size) => {
    const conditions = this.searchForm.value;
    console.log('conditions', conditions);
    conditions.page = page;
    conditions.size = size;
    return this.productsService.search(conditions);
  }

  constructor( private fb: FormBuilder ,
    // public notificationService: NotificationService,
    public router: Router,
    private productsService: ProductsService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      fullname: [null],
      phone: [null],
    });
  }
  ngAfterViewInit() {
    this.submitFormSearch();
  }
  submitFormSearch() {
    this.resourceGrid.update();
  }

  addCustomer(): void {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '50%',
      height: '500px',
      panelClass: 'dialog-family',
      data: { id: null },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
  }
  detail(data: any): void {
    // const dialogRef = this.dialog.open(ThemMoiComponent, {
    //   width: '50%',
    //   height: '500px',
    //   panelClass: 'dialog-family',
    //   data: { data: data },
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     console.log(result);
    //   }
    // });
  }

}
