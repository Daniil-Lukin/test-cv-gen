import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsDisplayComponent } from './components/projects-display/projects-display.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ProjectInfoComponent } from './components/project-info/project-info.component';



@NgModule({
  declarations: [
    ProjectsDisplayComponent,
    ProjectInfoComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    NzTableModule,
  ]
})
export class ProjectsModule { }
