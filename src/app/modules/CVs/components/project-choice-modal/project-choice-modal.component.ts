import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ProjectsToGet } from 'src/app/modules/projects/interfaces/projects-to-get';
import { ProjectsToGetData } from 'src/app/modules/projects/interfaces/projects-to-get-data';
import { ProjectService } from 'src/app/modules/projects/services/project.service';
import { CheckboxGroup } from '../../interfaces/checkbox-group';

@Component({
  selector: 'app-project-choice-modal',
  templateUrl: './project-choice-modal.component.html',
  styleUrls: ['./project-choice-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectChoiceModalComponent implements OnInit {
  public projectsList: CheckboxGroup[];
  @Input() selectedProjectsId: number[] = [];

  constructor(
    private projectService: ProjectService,
    private changeDetectorRef: ChangeDetectorRef,
    private nzModalRef: NzModalRef
  ) {}

  ngOnInit(): void {
    this.projectService.getAllProjectsHTTP().subscribe((projects) => {
      this.changeDetectorRef.markForCheck();
      this.fillCheckboxGroup(projects);
    });
  }

  public projectSelected(value: CheckboxGroup[]) {
    this.selectedProjectsId = value
      .filter((project) => project.checked === true)
      .map((filteredProjects) => filteredProjects.value);
  }

  public onCancel() {
    this.nzModalRef.close();
  }

  public onApply() {
    this.nzModalRef.close(this.selectedProjectsId);
  }

  private fillCheckboxGroup(projects: ProjectsToGet): void {
    this.projectsList = projects.data.map((value) => {
      if (this.selectedProjectsId.includes(value.id)) {
        return {
          label: value.attributes.name,
          value: value.id,
          checked: true,
          disabled: true,
        };
      }
      return {
        label: value.attributes.name,
        value: value.id,
      };
    });
  }
}
