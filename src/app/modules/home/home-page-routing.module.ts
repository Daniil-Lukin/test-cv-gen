import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./components/home-page/home-page.component";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: 'entities',
        loadChildren: () => import('../entities/entities.module').then((m) => m.EntitiesModule),
        data: {title: 'headers.title.entities', description: 'headers.description.entities.selection-page'}
      },
      {
        path: 'employees',
        loadChildren: () => import('../employees/employees.module').then((m) => m.EmployeesModule),
        data: {title: 'headers.title.employees', description: 'headers.description.employees.employee-display'}
      },
      {
        path: 'cvs',
        loadChildren: () => import('../CVs/cvs.module').then((m) => m.CvsModule),
        data: {title: 'headers.title.cvs', description: 'headers.description.cvs'}
      },
      {
        path: 'projects',
        loadChildren: () => import('../projects/projects.module').then((m) => m.ProjectsModule),
        data: {title: 'headers.title.projects', description: 'headers.description.projects.project-display'}
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}