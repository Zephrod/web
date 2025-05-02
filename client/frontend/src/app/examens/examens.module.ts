import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamensRoutingModule } from './examens-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [ListComponent, FormComponent],
  imports: [
    CommonModule,
    ExamensRoutingModule
  ]
})
export class ExamensModule {}