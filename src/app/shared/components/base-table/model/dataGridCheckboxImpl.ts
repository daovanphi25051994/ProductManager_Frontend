import * as _ from 'lodash';
import { IDataGridCheckBox } from '.';
/* Not recommend use for complex and optimize require */
export class DataGridCheckBox implements IDataGridCheckBox {
  hideWhen: (row: any) => boolean;
  disableWhen: (row: any) => boolean;
  public selected: any[] = [];
  show = true;

  public onChange = (checked: boolean, row: any, wrappedRows: any[]) => {
    if (checked === true) {
      this.selected.push(row);
    } else {
      const index = this.findIndexInSelected(row);
      if (index >= 0) {
        this.selected.splice(index, 1);
      }
    }
    this.selected = [...this.selected];
  }

  public onChangeAll = (checked: boolean, wrappedRows: any[]) => {
    const unwrappedRows = wrappedRows.map(value => value.data);
    if (checked) {
      this.addToSelected(unwrappedRows);
    } else {
      this.removeFromSelected(unwrappedRows);
    }
  }

  private findIndexInSelected(item: any) {
    let index = -1;
    for (let i = 0; i < this.selected.length; i++) {
      if (_.isEqual(this.selected[i], item)) {
        index = i;
        break;
      }
    }
    return index;
  }

  private addToSelected(list: any[]) {
    const notDuplicateCheckedList = [];
    for (const checkedItem of list) {
      let isEqual = false;
      for (const selectedItem of this.selected) {
        if (_.isEqual(checkedItem, selectedItem)) {
          isEqual = true;
          break;
        }
      }
      if (!isEqual) { notDuplicateCheckedList.push(checkedItem); }
    }
    this.selected = [...this.selected, ...notDuplicateCheckedList];
  }

  private removeFromSelected(listToRemoved: any[]) {
    for (const removedItem of listToRemoved) {
      const removedIndex = this.selected.findIndex(el => _.isEqual(removedItem, el));
      if (removedIndex >= 0) { this.selected.splice(removedIndex, 1); }
    }
    this.selected = [...this.selected];
  }
}
