import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CvToGetData } from '../../interfaces/cv-to-get-interfaces/cv-to-get-data';
import { CvService } from '../../services/cv-service.service';
import { ProjectsToGetData } from '../../../projects/interfaces/projects-to-get-data';
import { ProjectChoiceModalComponent } from '../project-choice-modal/project-choice-modal.component';
import { filter, forkJoin, map, observable, Observable, of, switchMap } from 'rxjs';
import { ProjectService } from 'src/app/modules/projects/services/project.service';
import { EntitiesService } from 'src/app/modules/entities/services/entities.service';
import { ProjectsForkJoin } from '../../interfaces/projects-fork-join';
import { ProjectToGet } from 'src/app/modules/projects/interfaces/project-to-get';
import { SkillsResponse } from 'src/app/modules/entities/interfaces/skills-response';
import { SkillsForkJoin } from '../../interfaces/skills-fork-join';
import { EntityData } from 'src/app/modules/entities/interfaces/entity-data';
import { ProjectToPost } from 'src/app/modules/projects/interfaces/project-to-post';
import { CvToGet } from '../../interfaces/cv-interfaces/cv-to-get';

@Component({
  selector: 'app-cv-edit',
  templateUrl: './cv-choice.component.html',
  styleUrls: ['./cv-choice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvChoiceComponent implements OnInit {
  public cvList: CvToGetData[];
  public projectsSkillsToDisplay = [];
  public listOfOptions: EntityData[] = [];
  public cvId: number;
  public choosenCv: CvToGetData;
  public visibility: boolean = false;
  public selectedProjectsList: ProjectToGet[];
  private selectedProjectsIds: number[];
  public cvForm: FormGroup;

  constructor(
    private cvService: CvService,
    private projectService: ProjectService,
    private entitiesService: EntitiesService,
    private changeDetectorRef: ChangeDetectorRef,
    private nzModalService: NzModalService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cvService.getAllCvHTTP().subscribe((cvs) => {
      this.cvList = cvs.data;
      this.changeDetectorRef.markForCheck();
    });
    this.entitiesService.getEntity('skills').subscribe((value) => {
      this.listOfOptions = value;
    });
    this.cvForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      skills: [],
    });
  }

  onCvClick(cvId: number) {
    this.visibility = true;
    this.cvId = cvId;
    this.choosenCv = this.cvList.find((cv) => cv.id === this.cvId);
    this.selectedProjectsIds = this.choosenCv.attributes.projects;
    if (this.selectedProjectsIds.length) {
      this.forkJoinProjects(this.selectedProjectsIds).subscribe((response) => {
        this.selectedProjectsList = response;
        this.changeDetectorRef.markForCheck();
        this.selectedProjectsList.map((project) => {
          this.projectsSkillsToDisplay.push(
            project.data.attributes.skills.data.map(
              (skill) => skill.attributes.name
            )
          );
        });
        console.log(this.projectsSkillsToDisplay);
      });
    }
    this.patchAllValues(this.choosenCv);
  }

  createCv() {
    this.visibility = true;
    this.cvId = null;
    this.choosenCv = null;
    this.selectedProjectsIds = [];
    this.selectedProjectsList = [];
    this.cvForm.reset();
  }

  public deleteCv(cvId: number) {
    this.cvService.deleteCvHTTP(cvId).subscribe((response) => {
      this.changeDetectorRef.markForCheck();
      this.cvList.splice(this.cvList.findIndex((cv) => cv.id === response.data.id),1);
    });
  }

  public addProject() {
    const modal = this.nzModalService.create({
      nzTitle: 'Select projects from projects list',
      nzContent: ProjectChoiceModalComponent,
      nzComponentParams: {
        selectedProjectsId: this.selectedProjectsIds.slice(),
      },
    }); //Отсортировать и сравнивать по индексам
    modal.afterClose
      .pipe(
        // filter(
        //   (value) =>
        //     value &&
        //     value.length !== this.selectedProjectsIds.length &&
        //     !this.selectedProjectsIds.every((id) => value.includes(id))
        // ),
        filter((value) => value),
        switchMap((selectedProjectsIdList) => {
          return this.forkJoinProjects(selectedProjectsIdList);
        })
      )
      .subscribe((response) => {
        this.changeDetectorRef.markForCheck();
        this.selectedProjectsList = response;
        console.log(this.selectedProjectsList);
        console.log(response);
      });
  }

  public deleteProject(projectId: number) {
    this.selectedProjectsList.splice(
      this.selectedProjectsList.findIndex(
        (project) => project.data.id === projectId
      ),
      1
    );

    this.selectedProjectsIds.splice(
      this.selectedProjectsIds.findIndex((id) => id === projectId),
      1
    );
  }

  public onSave() {
    if (this.cvForm.valid) {
      let observable: Observable<CvToGet>;
      const CvToPost = {
        name: this.cvForm.get('name').value,
        description: this.cvForm.get('description').value,
        projects: this.selectedProjectsIds,
        skills: this.cvForm.get('skills').value,
      };

      if(this.cvId) {
        observable = this.cvService.changeCvHTTP(CvToPost, this.cvId); 
      } else {
        observable = this.cvService.createCvHTTP(CvToPost);
      }
      observable.subscribe((response) => {
        this.changeDetectorRef.markForCheck();
        this.cvList.push(response.data);
      });
    }
  }

  onCancelClick() {
    this.createCv();
    this.visibility = false;
  }

  private forkJoinProjects(ids: number[]): Observable<ProjectsForkJoin> {
    return forkJoin<ProjectsForkJoin>(
      ids.map((id) => this.projectService.getProjectHTTP(id))
    );
  }

  private patchAllValues(cvData: CvToGetData): void {
    this.cvForm.patchValue(cvData.attributes);
  }
}
