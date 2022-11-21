import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CvPageComponent } from "./components/cv-page/cv-page.component";

const routes: Routes = [
  {
    path: '',
    component: CvPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CvPageRoutingModule {}