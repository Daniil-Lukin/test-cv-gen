import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { EntitiesService } from '../../services/entities.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalEditComponent {
  @Input() id: number;
  @Input() entityType: string;
  public newName: string;

  constructor(
    private nzModalRef: NzModalRef,
    private entitiesService: EntitiesService,
    private activatedRoute: ActivatedRoute
  ) {}

  public submitClick(): void {
    let observable: Observable<unknown>;
    if (this.id) {
      observable = this.entitiesService.changeEntityHTTP(
        this.newName,
        this.id,
        this.entityType
      );
    } else {
      observable = this.entitiesService.createEntityHTTP(
        this.newName,
        this.entityType
      );
    }
    observable.subscribe(() => this.destroyModal(true));
  }

  public deleteClick(): void {
    this.entitiesService
      .deleteEntityHTTP(this.id, this.entityType)
      .subscribe(() => this.destroyModal(true));
  }

  public destroyModal(isChanged = false): void {
    this.nzModalRef.destroy(isChanged);
  }
}
