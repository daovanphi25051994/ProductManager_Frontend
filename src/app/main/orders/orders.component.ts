import { CreateOrderComponent } from './create-order/create-order.component';
import { OrdersService } from './orders.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataGrid, IDataGridColumn, IDataGridManipulation } from 'app/shared/components/base-table/model';
import { DataGridPage } from 'app/shared/components/base-table/model/dataGridPageImpl';
import { MatDialog } from '@angular/material/dialog';
import { Order } from 'app/core/models/order';

const fakeDate: Order[] = [
  {
    id: 1,
    customerName: 'khách hàng 1',
    bossName: 'boss',
    saleDate: '20-04-2020',
    totalMoney: 3253252,
    paid: 435353,
    isActive: true
  },
  {
    id: 2,
    customerName: 'khách hàng 2',
    bossName: 'boss',
    saleDate: '20-04-2020',
    totalMoney: 3253252,
    paid: 435353,
    isActive: true
  }
]

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, AfterViewInit {
  @ViewChild('resourceGrid') resourceGrid: DataGrid;
  @ViewChild('searchForm') searchFormRef: ElementRef;
  resultRows: Order[] = fakeDate;

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
    return this.ordersService.search(conditions);
  }

  constructor( private fb: FormBuilder ,
    // public notificationService: NotificationService,
    public router: Router,
    private ordersService: OrdersService,
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
    const dialogRef = this.dialog.open(CreateOrderComponent, {
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
