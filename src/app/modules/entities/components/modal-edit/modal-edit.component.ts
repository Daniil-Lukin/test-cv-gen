import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, Subject } from 'rxjs';
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
    let observable: Observable<unknown>;
    if (this.id) {
      observable = this.entitiesService.changeEntity(this.newName, this.id);
    } else {
      observable = this.entitiesService.createEntity(this.newName);
    }
    observable.subscribe(() => this.destroyModal(true)); //Захендлить ошибку, и если успешно то дестрой
  }

  public deleteClick(): void {
    this.entitiesService
      .deleteEntity(this.id).subscribe(() => this.destroyModal(true))
  }

  public destroyModal(isChanged = false): void {
    this.nzModalRef.destroy(isChanged);
  }
}
