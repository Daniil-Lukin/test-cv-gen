import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EMPTY, filter, map, Subject, switchMap } from 'rxjs';
import { EntityData } from '../../interfaces/entity-data';
import { EntitiesService } from '../../services/entities.service';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';

@Component({
  selector: 'app-entitie',
  templateUrl: './entitie.component.html',
  styleUrls: ['./entitie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitieComponent implements OnInit {
  public entitiesArray: EntityData[] = []; //Заполнять массив опр сущности в зависимости от того, в какой вкладке я нахожусь
  public isLoading: boolean = false;
  private entityType = this.activatedRoute.snapshot.params['entity'];

  constructor(
    private entitiesService: EntitiesService,
    private modalService: NzModalService,
    private changeDetectionRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.entitiesService
      .getEntity(this.entityType)
      .subscribe((value) => {
        this.entitiesArray = value;
        this.changeDetectionRef.markForCheck();
      });
  }

  onEntityClick(id: number, name: string) {
    const modal = this.modalService.create({
      nzTitle: `Editing ${name} entity`,
      nzContent: ModalEditComponent,
      nzComponentParams: {
        id: id,
      },
    });
    modal.afterClose.pipe(
      filter(Boolean),
      switchMap(() => this.entitiesService.getEntityArrayHTTP())
    ).subscribe((data) => {
      this.entitiesService.updateStoragedData(data);
    });
  }

  onAddClick() {
    const modal = this.modalService.create({
      nzTitle: `Create new entity`,
      nzContent: ModalEditComponent,
    });
    modal.afterClose.pipe(
      map((isChanged) => {
        if(isChanged) {
          this.entitiesService.getEntityArrayHTTP().subscribe();
        }
      })
    ).subscribe();
  }
}
