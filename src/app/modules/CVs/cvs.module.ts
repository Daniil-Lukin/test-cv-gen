import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvsRoutingModule } from './cvs-routing.module';
import { CvChoiceComponent } from './components/cv-choice/cv-choice.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ProjectChoiceModalComponent } from './components/project-choice-modal/project-choice-modal.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';


@NgModule({
  declarations: [
    CvChoiceComponent,
    ProjectChoiceModalComponent,
  ],
  imports: [
    CommonModule,
    CvsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NzListModule,
    NzCollapseModule,
    NzInputModule,
    NzIconModule,
    NzFormModule,
    NzButtonModule,
    NzCheckboxModule,
    NzModalModule,
    NzSelectModule, 
  ],
  exports: [
    CvChoiceComponent
  ]
})
export class CvsModule { }
