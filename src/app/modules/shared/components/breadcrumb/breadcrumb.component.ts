import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Breadcrumb } from '../../interfaces/breadcrumb';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent implements OnInit {
  public routerArray: Breadcrumb[];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.routerArray = this.breadcrumbService.getBreadcrumbsArray();
    this.breadcrumbService.getRouterArrayObservable().subscribe(() => {
      this.changeDetectorRef.markForCheck();
      this.routerArray = this.breadcrumbService.getBreadcrumbsArray();
    });
  }
}
