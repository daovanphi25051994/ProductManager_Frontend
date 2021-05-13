import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseTableComponent } from './components/base-table/base-table.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatIconModule } from '@angular/material/icon';

const COMPONENTS = [BaseTableComponent]

@NgModule({
  declarations: [...COMPONENTS, ConfirmDialogComponent],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [...COMPONENTS]
})
export class SharedModule { }
