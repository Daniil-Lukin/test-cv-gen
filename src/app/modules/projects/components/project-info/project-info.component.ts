import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  @Input() id = this.activatedRoute.snapshot.params['id'];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private entitiesService: EntitiesService,
    private projectService: ProjectService,
    private changeDetectorRef: ChangeDetectorRef
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
      skills: [],
      internalName: [null, Validators.required],
    });

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
      let observable: Observable<unknown>;
      if (this.id === 'new') {
        observable = this.projectService.createProjectHTTP(
          this.projectForm.value
        );
      } else {
        observable = this.projectService.changeProjectHTTP(
          this.projectForm.value,
          this.id
        );
      }
      observable.subscribe();
    }
  }

  private patchAllValues(projectData: ProjectsToGetData): void {
    const { skills, ...other } = projectData.attributes;
    this.projectForm.patchValue(other);
    const skillsId = skills.data.map((skill) => skill.id);
    this.projectForm.patchValue({ skills: skillsId });
  }
  public setId(newId) {
    this.id = newId;
  }
}
