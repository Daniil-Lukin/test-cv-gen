import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { EntitiesService } from '../../services/entities.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalEditComponent {
  @Input() id: number;
  public newName: string;

  constructor(
    private nzModalRef: NzModalRef,
    private entitiesService: EntitiesService,
  ) {}

  public submitClick(): void {
    if (this.id) {
      this.entitiesService.changeEntity(this.newName, this.id).subscribe();
    } else {
      this.entitiesService.createEntity(this.newName).subscribe();
    }
    this.destroyModal(true);
  }

  public deleteClick(): void {
    this.entitiesService
      .deleteEntity(this.id)
    this.destroyModal(true);
  }

  public destroyModal(isChanged = false): void {
    this.nzModalRef.destroy(isChanged);
  }
}
