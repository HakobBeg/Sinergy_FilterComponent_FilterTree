import {Component, OnInit} from '@angular/core';
import {ServerWorkerService} from '../../Services/server-worker.service';
import {Item} from '../../definitions';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  newItem: Item = {name: '', category: '', price: null, count: null, date: null, Id: null};


  constructor(private itemsService: ServerWorkerService) {
    this.newItem.name = '';
    this.newItem.category = '';
    this.newItem.Id = 1000;
  }

  onAddButton() {
    this.newItem.date = Date.now();
    this.itemsService.addItem(this.newItem);
  }

  onResetField() {
  this.newItem = {name: '', category: '', price: null, count: null, date: null, Id: null};
  }

  ngOnInit() {
  }

}
