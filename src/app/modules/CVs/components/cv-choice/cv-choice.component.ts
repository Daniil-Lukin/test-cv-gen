import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CvToGetData } from '../../interfaces/cv-to-get-interfaces/cv-to-get-data';
import { CvService } from '../../services/cv-service.service';
import { ProjectChoiceModalComponent } from '../project-choice-modal/project-choice-modal.component';
import {
  filter,
  forkJoin,
  Observable,
  switchMap,
} from 'rxjs';
import { ProjectService } from 'src/app/modules/projects/services/project.service';
import { EntitiesService } from 'src/app/modules/entities/services/entities.service';
import { ProjectsForkJoin } from '../../interfaces/projects-fork-join';
import { ProjectToGet } from 'src/app/modules/projects/interfaces/project-to-get';
import { EntityData } from 'src/app/modules/entities/interfaces/entity-data';
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
  public hidden: boolean = true;
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
    this.hidden = false;
    this.cvId = cvId;
    this.choosenCv = this.cvList.find((cv) => cv.id === this.cvId);
    this.selectedProjectsIds = this.choosenCv.attributes.projects;
    if (this.selectedProjectsIds.length) {
      this.forkJoinProjects(this.selectedProjectsIds).subscribe((response) => {
        this.changeDetectorRef.markForCheck();
        this.selectedProjectsList = response;
        this.projectsSkillsToDisplay = this.selectedProjectsList.reduce(
          (acc, item) => {
            acc.push(
              item.data.attributes.skills.data.map(
                (skill) => skill.attributes.name
              )
            );
            return acc;
          },
          []
        );
      });
    }
    this.patchAllValues(this.choosenCv);
  }

  createCv() {
    this.hidden = false;
    this.cvId = null;
    this.choosenCv = null;
    this.selectedProjectsIds = [];
    this.selectedProjectsList = [];
    this.cvForm.reset();
  }

  public deleteCv(cvId: number) {
    this.cvService.deleteCvHTTP(cvId).subscribe((response) => {
      this.changeDetectorRef.markForCheck();
      this.cvList = this.cvList.filter((cv) => cv.id != response.data.id);
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
          this.selectedProjectsIds = selectedProjectsIdList;
          return this.forkJoinProjects(selectedProjectsIdList);
        })
      )
      .subscribe((response) => {
        this.changeDetectorRef.markForCheck();
        this.selectedProjectsList = response;
      });
  }

  public deleteProject(projectId: number) {
    console.log(this.selectedProjectsIds);
    this.selectedProjectsList = this.selectedProjectsList.filter(
      (project) => project.data.id != projectId
    );

    this.selectedProjectsIds = this.selectedProjectsIds.filter(
      (selectedProjectId) => selectedProjectId != projectId
    );
  }

  public onSave() {
    if (this.cvForm.valid) {
      this.cvForm.markAllAsTouched();
      let observable: Observable<CvToGet>;
      const CvToPost = {...this.cvForm.getRawValue(), projects: this.selectedProjectsIds};
      if (this.cvId) {
        observable = this.cvService.changeCvHTTP(CvToPost, this.cvId);
      } else {
        observable = this.cvService.createCvHTTP(CvToPost);
      }
      observable
        .pipe(switchMap(() => this.cvService.getAllCvHTTP()))
        .subscribe((response) => {
          this.changeDetectorRef.markForCheck();
          this.cvList = response.data;
        });
    }
  }

  onCancelClick() {
    this.createCv();
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
