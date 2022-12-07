import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
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

  constructor(
    private entitiesService: EntitiesService,
    private modalService: NzModalService,
  ) {}

  ngOnInit(): void {
    this.entitiesService.setEntityType();
    this.entitiesService.getEntity().subscribe((value) => this.entitiesArray = value);
  }

  onEntityClick(id: number, name: string) {
    const modal = this.modalService.create({
      nzTitle: `Editing ${name} entity`,
      nzContent: ModalEditComponent,
      nzComponentParams: {
        id: id,
      },
    });
    modal.afterClose.subscribe(() =>
      this.entitiesService.getEntityArray().subscribe((data) => {
        this.entitiesService.updateStoragedData(data)
        this.entitiesService.getEntity().subscribe((value) => this.entitiesArray = value);
        console.log('close');
      })
    );
  }

  onAddClick() {
    const modal = this.modalService.create({
      nzTitle: `Create new entity`,
      nzContent: ModalEditComponent,
    });
    modal.afterClose.subscribe(() =>
      this.entitiesService.getEntityArray().subscribe((data) => {
        this.entitiesService.updateStoragedData(data)
        this.entitiesService.getEntity().subscribe((value) => this.entitiesArray = value);
        console.log('close');
        console.log(this.entitiesArray);
      })
    );
  }
}
