import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityData } from 'src/app/modules/entities/interfaces/entity-data';
import { EntitiesService } from 'src/app/modules/entities/services/entities.service';
import { ProjectToPost } from '../../interfaces/project-to-post';
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
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.entitiesService.getEntity('skills').subscribe((value) => {
      this.listOfOptions = value;
      console.log(value);
    });
    this.projectForm = this.formBuilder.group({
      name: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      domain: [null, Validators.compose([Validators.required])],
      from: [null, Validators.compose([Validators.required])],
      to: [null, Validators.compose([Validators.required])],
      skills: [null, Validators.compose([Validators.required])],
      internalName: [null, Validators.compose([Validators.required])],
    });
    if (this.id != 'new') {
      const projectData = this.projectService.getProject(Number(this.id));
      Object.keys(projectData.attributes).forEach((key) => {
        if(key !='skills') {
          this.projectForm.patchValue({[key]: projectData.attributes[key]});
        } else {
          const arrayOfSkillsId = projectData.attributes.skills.data.map((attr)=> attr.id);
          this.projectForm.patchValue({[key]: arrayOfSkillsId});
        }
      });
    }
    console.log(this.id);
    console.log(this.projectForm.get('skills').value);
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

  get name() {
    return this.projectForm.get('name').value;
  }

  get description() {
    return this.projectForm.get('description').value;
  }

  get domain() {
    return this.projectForm.get('domain').value;
  }

  get from() {
    return this.projectForm.get('from').value;
  }

  get to() {
    return this.projectForm.get('to').value;
  }

  get internalName() {
    return this.projectForm.get('internalName').value;
  }

  get selectedSkills() {
    return this.projectForm.get('skills').value;
  }
}
