import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { DateHelperService } from 'ng-zorro-antd/i18n';
import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { map } from 'rxjs';
import { ColumnItem } from '../../interfaces/column-item';
import { DataItem } from '../../interfaces/data-item';
import { ProjectsToGet } from '../../interfaces/projects-to-get';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects-display',
  templateUrl: './projects-display.component.html',
  styleUrls: ['./projects-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsDisplayComponent implements OnInit {
  public listOfColumns: ColumnItem[] = [];
  public listOfData: DataItem[];
  private listOfColumnsNames: string[] = ['Name', 'Domain', 'From', 'To'];

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.projectService
      .getAllProjectsHTTP()
      .pipe(
        map((response) => {
          return response.data.map((element) => {
            return {
              id: String(element.id),
              name: element.attributes.name,
              domain: element.attributes.domain,
              from: element.attributes.from,
              to: element.attributes.to,
            };
          });
        })
      )
      .subscribe((response) => {
        this.listOfData = response;
        this.changeDetectorRef.markForCheck();
      });
    this.fillTableColumns();
  }

  private fillTableColumns(): void {
    for (let columnName of this.listOfColumnsNames) {
      this.listOfColumns.push({
        name: columnName,
        sortFn: null,
        sortOrder: null,
        sortDirections: ['ascend', 'descend', null],
      });
    }
    for (let column of this.listOfColumns) {
      switch (column.name.toLowerCase()) {
        case 'name': {
          column.sortFn = (a: DataItem, b: DataItem) =>
            a.name.localeCompare(b.name);
          break;
        }
        case 'domain': {
          column.sortFn = (a: DataItem, b: DataItem) =>
            a.name.localeCompare(b.name);
          break;
        }
        case 'from': {
          column.sortFn = (a: DataItem, b: DataItem) =>
            a.from.getDate() - b.from.getDate();
          break;
        }
        case 'to': {
          column.sortFn = (a: DataItem, b: DataItem) =>
            a.to.getDate() - b.to.getDate();
          break;
        }
      }
    }
  }
}
