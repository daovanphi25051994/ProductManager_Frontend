import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'dgCheckSelected',
})
export class DgCheckSelectedPipe implements PipeTransform {
  transform(selected: any[], value: any, type: 'one' | 'all'): any {
    if (type === 'one') {
      const row = value;
      let index = -1;
      for (let i = 0; i < selected.length; i++) {
        if (_.isEqual(selected[i], row)) {
          index = i;
          break;
        }
      }
      return index >= 0;
    } else if (type === 'all') {
      const wrappedRows = value;
      const unwrappedRows = wrappedRows.map(el => el.data);
      let isAll = false;
      for (const row of unwrappedRows) {
        if (this.findIndexInSelected(row, selected) < 0) {
          isAll = false;
          break;
        }
        isAll = true;
      }
      return isAll;
    }
  }

  private findIndexInSelected(item: any, selected: any[]) {
    let index = -1;
    for (let i = 0; i < selected.length; i++) {
      if (_.isEqual(selected[i], item)) {
        index = i;
        break;
      }
    }
    return index;
  }
}
