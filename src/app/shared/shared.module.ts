import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseTableComponent } from './components/base-table/base-table.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const COMPONENTS = [BaseTableComponent]

@NgModule({
  declarations: [...COMPONENTS, ConfirmDialogComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [...COMPONENTS, FormsModule, ReactiveFormsModule]
})
export class SharedModule { }
