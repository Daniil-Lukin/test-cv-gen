import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ForkJoinResponse } from 'src/app/modules/entities/interfaces/fork-join-response';
import { EntitiesService } from 'src/app/modules/entities/services/entities.service';
import { ProjectService } from 'src/app/modules/projects/services/project.service';

@Component({
  selector: 'app-cv-page',
  templateUrl: './cv-page.component.html',
  styleUrls: ['./cv-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvPageComponent implements OnInit {
  constructor(
    private entitiesService: EntitiesService,
  ) {}

  ngOnInit(): void {
    this.entitiesService.getEntitiesData().subscribe((value) => {
      this.entitiesService.setEntitiesData(value);
    });
  }
}
