import { Component, ContentChild, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
  IDataGridCheckBox,
  IDataGridManipulation,
  DataGrid,
  IDataGridColumn,
  IDataGridPage,
  DataGridRow,
} from './model';

@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss']
})
export class BaseTableComponent implements OnInit, OnChanges, OnDestroy, DataGrid  {

  @Input() rows: any[];
  @Input() columns: IDataGridColumn[];
  @Input() checkbox: IDataGridCheckBox;
  @Input() manipulation: IDataGridManipulation;
  @Input() page: IDataGridPage;
  @Input() type: 'client-side' | 'server-side' = 'client-side';
  @Input() totalColumn: number;
  rows$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  @Input() serverSideApi: (currentPage: number, pageSize: number) => Observable<any>;
  dgSubscription = new Subscription();
  @ContentChild('dataGridHeader', { static: false })
  dataGridHeader: TemplateRef<any>;
  @ContentChild('dataGridHeaderContentStart', { static: false })
  dataGridHeaderContentStart: TemplateRef<any>;
  @ContentChild('dataGridHeaderContent', { static: false })
  dataGridHeaderContent: TemplateRef<any>;
  @ContentChild('dataGridHeaderContentEnd', { static: false })
  dataGridHeaderContentEnd: TemplateRef<any>;

  @ContentChild('dataGridRow', { static: false })
  dataGridRow: TemplateRef<any>;
  @ContentChild('dataGridRowContentStart', { static: false })
  dataGridRowContentStart: TemplateRef<any>;
  @ContentChild('dataGridRowContent', { static: false })
  dataGridRowContent: TemplateRef<any>;
  @ContentChild('dataGridRowContentEnd', { static: false })
  dataGridRowContentEnd: TemplateRef<any>;

  @ContentChild('dataGridDataHeader', { static: false })
  dataGridDataHeader: TemplateRef<any>;
  @ContentChild('dataGridDataFooter', { static: false })
  dataGridDataFooter: TemplateRef<any>;
  constructor(
    // private spinnerService: SpinnerService
    ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.rows) {
      this.update();
    }
  }

  ngOnInit(): void {
    this.update();
    /* subscribe page update event */
    if (this.page && this.page.updatePageEvent) {
      this.dgSubscription.add(
        this.page.updatePageEvent.subscribe(() => {
          this.update();
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.dgSubscription.unsubscribe();
  }

  update = () => {
    // this.spinnerService.show();
    switch (this.type) {
      case 'client-side': {
        this.runClientSide();
        break;
      }
      case 'server-side': {
        this.runServerSide();
        break;
      }
      default: {
        this.runClientSide();
      }
    }
  }

  runClientSide() {
    try {
      if (this.rows) {
        if (this.page && this.page.show) {
          this.runPagingClientSideGrid();
        } else {
          this.runFlattenClientSideGrid();
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      // this.spinnerService.hide();
    }
  }

  runServerSide() {
    try {
      if (this.serverSideApi) {
        this.serverSideApi(this.page.currentPage, this.page.pageSize).subscribe(res => {
          if (res && res.data && res.data.items ) {
            const lastPage = this.getActualLastPage(res.data.total, this.page.pageSize);
            if (lastPage > 0 && this.page.currentPage > lastPage) {
              /* server side return empty data when currentPage > lastPage */
              this.page.currentPage = lastPage;
              /* callback again to get data */
              this.update();
              return;
            }
            const wrappedRows = this.getWrappedRows(res.data.items);
            this.rows$.next(wrappedRows);
            this.page.calc(res.data.total);
            // this.spinnerService.hide();
          }
        });
      }
    } catch (e) {
      console.log(e);
      // this.spinnerService.hide();
    }
  }
  private getClientSidePageRows(currentPage: number, pageSize: number, rows: any[]): any[] {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize < rows.length ? startIndex + pageSize : rows.length;
    return this.getWrappedRows(rows.slice(startIndex, endIndex));
  }

  private getActualLastPage(totalRecord: number, pageSize: number): number {
    return Math.ceil(totalRecord / pageSize);
  }

  private runPagingClientSideGrid() {
    // this.spinnerService.show();
    const lastPage = this.getActualLastPage(this.rows.length, this.page.pageSize);
    if (lastPage > 0 && this.page.currentPage > lastPage) {
      this.page.currentPage = lastPage;
    }
    this.page.calc(this.rows.length);
    const currentPageRows = this.getClientSidePageRows(
      this.page.currentPage,
      this.page.pageSize,
      this.rows
    );
    if (currentPageRows) {
      this.rows$.next(currentPageRows);
    }
    // this.spinnerService.hide();
  }

  private runFlattenClientSideGrid() {
    // this.spinnerService.show();
    const wrappedRows = this.getWrappedRows(this.rows);
    this.rows$.next(wrappedRows);
    // this.spinnerService.hide();
  }

  getWrappedRows(data: any[]): DataGridRow[] {
    return data.map((el, index) => {
      let actualIndex = index;
      if (this.page) {
        actualIndex = index + (this.page.currentPage - 1) * this.page.pageSize;
      }
      return {
        index: actualIndex,
        data: el,
      };
    });
  }

}
