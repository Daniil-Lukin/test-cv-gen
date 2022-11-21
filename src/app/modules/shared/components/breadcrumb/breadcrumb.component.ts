import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../interfaces/breadcrumb';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements OnInit {

  public routerArray: Breadcrumb[];

  constructor(private breadcrumbService: BreadcrumbService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => console.log(event));
    this.routerArray = this.breadcrumbService.getBreadcrumbsArray();
    this.breadcrumbService.getRouterArrayObservable().subscribe(() => {
        this.routerArray = this.breadcrumbService.getBreadcrumbsArray();
        console.log(this.routerArray);
      }
    );
  }

}
