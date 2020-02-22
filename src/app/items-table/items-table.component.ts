import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ServerWorkerService} from '../../Services/server-worker.service';
import {Item} from '../../definitions';
import {MatTable} from '@angular/material';
import {TableDBHandlerService} from '../../Services/table-dbhandler.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.css']
})
export class ItemsTableComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'count', 'date'];
  dataSource = [];
  loading = true;
  private subscriptions$ = new Array<Subscription>();

  @ViewChild(MatTable, {static: false}) table: MatTable<any>;

  constructor(private itemsService: ServerWorkerService, private modelService: TableDBHandlerService) {
  }

  onSelectionChange(value: string) {
    this.sortBy(value);
  }


  sortBy(type: string) {
    if (type === 'price' || type === 'count' || type === 'id') {
      this.dataSource.sort((a, b) => {
        return a[type] - b[type];
      });
    } else {
      this.dataSource.sort((a, b) => {
        if (a[type] > b[type]) {
          return 1;
        }
        if (b[type] > a[type]) {
          return -1;
        }
        return 0;
      });
    }

    this.table.renderRows();

  }

  ngOnInit() {

    this.subscriptions$.push(this.modelService.getModelItems$().subscribe((items) => {
      this.dataSource = items;
      this.loading = false;
    }));
  }

  ngOnDestroy() {
    this.subscriptions$.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

}
