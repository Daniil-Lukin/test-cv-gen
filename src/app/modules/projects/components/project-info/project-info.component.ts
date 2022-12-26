import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityData } from 'src/app/modules/entities/interfaces/entity-data';
import { EntitiesService } from 'src/app/modules/entities/services/entities.service';
import { ProjectToGet } from '../../interfaces/project-to-get';
import { ProjectToPost } from '../../interfaces/project-to-post';
import { ProjectsToGetData } from '../../interfaces/projects-to-get-data';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectInfoComponent implements OnInit {
  public projectForm: FormGroup;
  public listOfOptions: EntityData[] = [];
  private id = this.activatedRoute.snapshot.params['id'];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private entitiesService: EntitiesService,
    private projectService: ProjectService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.entitiesService.getEntity('skills').subscribe((value) => {
      this.listOfOptions = value;
    });
    this.projectForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      domain: [null, Validators.required],
      from: [null, Validators.required],
      to: [null, Validators.required],
      skills: [null, Validators.required],
      internalName: [null, Validators.required],
    }); // Поменять форич
    if (this.id != 'new') {
      this.projectService.getProjectHTTP(Number(this.id)).subscribe((value) => {
        this.changeDetectorRef.markForCheck();
        this.patchAllValues(value.data);
      });
    }
  }

  submitForm() {
    this.projectForm.markAllAsTouched();
    if (this.projectForm.valid) {
      if(this.id === 'new') {
        this.projectService
          .createProjectHTTP(this.projectForm.value)
          .subscribe((resp) => console.log(resp));
      } else {
        this.projectService
          .changeProjectHTTP(this.projectForm.value, this.id)
          .subscribe((resp) => console.log(resp));
      }
    }
  }

  private patchAllValues(projectData: ProjectsToGetData) {
    Object.keys(projectData.attributes).forEach((key) => {
      if(key !='skills') {
        this.projectForm.patchValue({[key]: projectData.attributes[key]});
      } else {
        const arrayOfSkillsId = projectData.attributes.skills.data.map((attr)=> attr.id);
        this.projectForm.patchValue({[key]: arrayOfSkillsId});
      }
    });
  }
}
