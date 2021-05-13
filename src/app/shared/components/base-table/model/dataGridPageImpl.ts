import { Subject } from 'rxjs';
import { IDataGridPage } from './index';
export class DataGridPage implements IDataGridPage {
  show = true;
  currentPage = 1;
  pageRange = 1;
  pageSize = 10;
  totalRecord: number;
  startIndex: number;
  endIndex: number;
  updatePageEvent = new Subject();
  visiblePages: number[];
  totalPage: number;

  constructor(pageSize?: number, pageRange?: number) {
    if (pageSize) {
      this.pageSize = pageSize;
    }

    if (pageRange) {
      this.pageRange = pageRange;
    }
    this.currentPage = 1;
  }

  calc(totalRecord?: number) {
    if (totalRecord !== null && totalRecord !== undefined) {
      this.totalRecord = totalRecord;
    }
    this.totalPage = Math.ceil(this.totalRecord / this.pageSize);
    this.startIndex = (this.currentPage - 1) * this.pageSize;
    this.endIndex =
      this.startIndex + this.pageSize < this.totalRecord
        ? this.startIndex + this.pageSize - 1
        : this.totalRecord - 1;
    this.calculateVisiblePages();
  }

  calculateVisiblePages(): void {
    const totalPage = Math.ceil(this.totalRecord / this.pageSize);
    this.visiblePages = [];
    let start: number;
    if (this.currentPage - this.pageRange <= 0) { start = 1; } else {
      if (this.currentPage + this.pageRange > totalPage) {
        start = totalPage - 2 * this.pageRange;
        if (start < 1) { start = 1; }
      } else { start = this.currentPage - this.pageRange; }
    }
    let count = 0;
    while (start + count <= totalPage && count < this.pageRange * 2 + 1) {
      this.visiblePages.push(start + count);
      count++;
    }
  }

  goToPage = (num: number) => {
    if (0 < num && num <= this.totalPage) {
      this.currentPage = num;
      this.updatePageEvent.next();
    }
  }

  nextPage = () => {
    if (this.currentPage < this.totalPage) {
      ++this.currentPage;
      this.updatePageEvent.next();
    }
  }

  previousPage = () => {
    if (this.currentPage > 1) {
      --this.currentPage;
      this.updatePageEvent.next();
    }
  }

  goToLastPage = () => {
    if (this.currentPage !== this.totalPage) {
      this.currentPage = this.totalPage;
      this.updatePageEvent.next();
    }
  }

  goToFirstPage = () => {
    if (this.currentPage !== 1) {
      this.currentPage = 1;
      this.updatePageEvent.next();
    }
  }

  /* API */
  updateCurrentPage(newCurrentPage: number) {
    if ((newCurrentPage - 1) * this.pageRange <= this.totalRecord) {
      this.currentPage = newCurrentPage;
      this.updatePageEvent.next(true);
    }
  }
}
