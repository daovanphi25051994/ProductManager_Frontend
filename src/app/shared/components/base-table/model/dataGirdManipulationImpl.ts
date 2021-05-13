// import { IDataGridButton, IDataGridManipulation } from '@app/shared/components/data-grid/model';

import { IDataGridButton, IDataGridManipulation } from '.';

const LABEL = 'Thao tác';
export class DataGridManipulation implements IDataGridManipulation {
    show: true;
    label?: string = LABEL;
    buttons: IDataGridButton[] = [];
}
