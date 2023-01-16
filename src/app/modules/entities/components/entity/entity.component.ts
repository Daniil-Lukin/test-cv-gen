import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { filter, switchMap } from 'rxjs';
import { EntityData } from '../../interfaces/entity-data';
import { EntitiesService } from '../../services/entities.service';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityComponent implements OnInit {
  public entitiesArray: EntityData[] = [];
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
      .getEntityArrayHTTP(this.entityType)
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
      switchMap(() => this.entitiesService.getEntityArrayHTTP(this.entityType))
    ).subscribe((data) => {
      this.entitiesArray = data;
    });
  }

  onAddClick() {
    const modal = this.modalService.create({
      nzTitle: `Create new entity`,
      nzContent: ModalEditComponent,
    });
    modal.afterClose.pipe(
      filter(Boolean),
      switchMap(() => this.entitiesService.getEntityArrayHTTP(this.entityType))
    ).subscribe((data) => {
      this.entitiesArray = data;
    });
  }
}
