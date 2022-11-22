import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionPageComponent } from './components/selection-page/selection-page.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { EntitiesRoutingModule } from './entities-routing.module';



@NgModule({
  declarations: [
    SelectionPageComponent
  ],
  imports: [
    CommonModule,
    EntitiesRoutingModule,
    NzMenuModule,
  ]
})
export class EntitiesModule { }
