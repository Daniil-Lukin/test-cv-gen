import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvPageComponent } from './components/cv-page/cv-page.component';
import { CvPageRoutingModule } from './cv-page-routing.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BreadcrumbComponent } from '../shared/components/breadcrumb/breadcrumb.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CvPageComponent
  ],
  imports: [
    CommonModule,
    CvPageRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    SharedModule,
  ]
})
export class CvPageModule { }
