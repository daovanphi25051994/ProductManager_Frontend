import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'app/core/models/customer';
import { DataGrid, IDataGridColumn, IDataGridManipulation } from 'app/shared/components/base-table/model';
import { DataGridPage } from 'app/shared/components/base-table/model/dataGridPageImpl';

const fakeDate: Customer[] = [
  {
    id: 1,
    fullname: 'phi1',
    phone: '0929292929',
    address: 'hai duong',
    isActive: true
  },
  {
    id: 2,
    fullname: 'phi2',
    phone: '0929292929',
    address: 'hai duong',
    isActive: false
  }
]
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  @ViewChild('danhSachMenu') grid: DataGrid;
  columns: IDataGridColumn[] = [
    {
      name: 'Mã Menu/API',
      prop: 'code',
    },
    {
      name: 'Tên Menu/API',
      prop: 'name',
    },
    {
      name: 'Đường dẫn',
      prop: 'path',
    },
    {
      name: 'Trạng thái',
      prop: 'isActive',
      style: 'width: 110px',
    },
  ];
  @ViewChild('searchForm') searchFormRef: ElementRef;
  resultRows: Customer[] = fakeDate;

  // search
  menuNameSearchInput = '';
  isActiveSearchInput: boolean | number = 0;



  pageMenu = new DataGridPage(20, 1);
  searchForm: FormGroup;
  manipulation: IDataGridManipulation = {
    show: true,
    buttons: [
      {
        tooltip: 'Phân quyền menu',
        icon: 'ic_settings',
        onClick: (row: any) => {
          // this.openDecentralizationMenu(row);
        },
        // invisible: !this.actionService.hasPermission(menuManagementActions[3].code)
      },
      {
        tooltip: 'Cập nhật',
        icon: 'ic_btn_edit_table',
        onClick: (row: any) => {
          // this.openPopupEditMenu(row);
        },
        // invisible: !this.actionService.hasPermission(menuManagementActions[2].code)
      },
      {
        tooltip: 'Xóa',
        icon: 'ic_btn_delete_table',
        style: 'background-color: #dd3030;',
        onClick: (row: any) => {
          // this.openDeleteConfirm(row);
        },
        // invisible: !this.actionService.hasPermission(menuManagementActions[4].code)
      },
    ],
  };


  resourceGridApi = (page, size) => {
    const conditions = this.searchForm.value;
    conditions.page = page;
    conditions.size = size;
    return this.getAllCustomer();
  }

  constructor( private fb: FormBuilder ,
    // public notificationService: NotificationService,
    public router: Router,
    ) { }

  ngOnInit(): void {
    // this.searchForm = this.fb.group({
    //   name: [null],
    // });(
    this.getAllCustomer();
  }
  ngAfterViewInit() {
    // this.submitFormSearch();
  }
  // submitFormSearch() {
  //   this.resourceGrid.update();
  // }

  onClickSearch() {
    this.getAllCustomer();
  }

  getAllCustomer(): void {
    // this.resultRows = fakeDate;
    // this.sysMenuService.findAll().subscribe(
    //   res => {
    //     if (res && res.data !== undefined && res.data !== null) {
    //       const menus: Menu[] = res.data;
    //       this.generateTableData(menus);
    //     }
    //   },
    //   () => {
    //     this.notificationService.showError('Không thể load được danh sách menu', 'Quản lý menu');
    //   }
    // );
  }

  addCustomer(): void {
    console.log('add customer');
  }

}
