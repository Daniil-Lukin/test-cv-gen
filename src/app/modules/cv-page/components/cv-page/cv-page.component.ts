import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/modules/shared/services/breadcrumb.service';

@Component({
  selector: 'app-cv-page',
  templateUrl: './cv-page.component.html',
  styleUrls: ['./cv-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CvPageComponent implements OnInit {

  constructor(private router: Router, private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    
  }

}
