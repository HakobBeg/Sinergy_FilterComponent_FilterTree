import {Injectable} from '@angular/core';
import {Item, ExpressionTree} from '../definitions';
import {ServerWorkerService} from './server-worker.service';
import {Subject} from 'rxjs';
import {Node} from '../definitions';


@Injectable({
  providedIn: 'root'
})
export class TableDBHandlerService {

  allItems: Item[] = [];
  itemsModel: Item[] = [];
  moduleChanges$: Subject<Item[]> = new Subject<Item[]>();
  tableColumns: string[] = ['id', 'name', 'category', 'price', 'count', 'date'];
  filterTree: ExpressionTree;

  constructor(private SWService: ServerWorkerService) {
    this.initializeModel();
  }

  initializeModel() {
    this.SWService.getItems().subscribe((items) => {
      this.allItems = items;
      this.itemsModel = items;
      this.moduleChanges$.next(this.itemsModel);
    });
  }


  filterModel(exp: string) {
    this.filterTree = new ExpressionTree(exp);
    this.itemsModel = this.filterList(this.filterTree.tree);
    this.moduleChanges$.next(this.filterList(this.filterTree.tree));
  }


  filterList(treeNode: Node) {
    if (treeNode.Left == null && treeNode.Right == null) {
      return treeNode.method(this.allItems);
    }

    let left = this.filterList(treeNode.Left);
    let right = this.filterList(treeNode.Right);

    return treeNode.method(left, right);

  }


  getModelItems$() {
    return this.moduleChanges$;
  }

  getColumnTitles() {
    return this.tableColumns;
  }


}
