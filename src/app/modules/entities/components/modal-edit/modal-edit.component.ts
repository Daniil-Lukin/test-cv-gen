import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
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
    this.destroyModal();
  }

  public deleteClick(): void {
    this.entitiesService
      .deleteEntity(this.id)
      .subscribe((response) => console.log(response));
    this.destroyModal();
  }

  public destroyModal(): void {
    this.nzModalRef.destroy();
  }
}
