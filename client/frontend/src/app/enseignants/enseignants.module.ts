import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnseignantsRoutingModule } from './enseignants-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [ListComponent, FormComponent],
  imports: [
    CommonModule,
    EnseignantsRoutingModule
  ]
})
export class EnseignantsModule {}