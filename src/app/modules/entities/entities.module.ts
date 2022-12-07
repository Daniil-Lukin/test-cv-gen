import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionPageComponent } from './components/selection-page/selection-page.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { EntitiesRoutingModule } from './entities-routing.module';
import { EntitieComponent } from './components/entitie/entitie.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ModalEditComponent } from './components/modal-edit/modal-edit.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';


@NgModule({
  declarations: [
    SelectionPageComponent,
    EntitieComponent,
    ModalEditComponent
  ],
  imports: [
    CommonModule,
    EntitiesRoutingModule,
    NzButtonModule,
    NzMenuModule,
    NzModalModule,
    NzFormModule,
    NzSpinModule,
    FormsModule,
  ]
})
export class EntitiesModule { }
