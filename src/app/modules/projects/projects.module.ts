import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsDisplayComponent } from './components/projects-display/projects-display.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ProjectInfoComponent } from './components/project-info/project-info.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ProjectsDisplayComponent,
    ProjectInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProjectsRoutingModule,
    NzTableModule,
    NzFormModule,
    NzDatePickerModule,
    NzTagModule,
    NzSelectModule,
    NzInputModule,
    NzButtonModule,
    TranslateModule,
  ]
})
export class ProjectsModule { }
