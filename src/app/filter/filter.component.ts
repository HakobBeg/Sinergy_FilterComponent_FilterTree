import {Component, OnInit} from '@angular/core';
import {TableDBHandlerService} from '../../Services/table-dbhandler.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(private modelService: TableDBHandlerService) {
  }

  showComponent = false;
  categories = ['shoese', 'food', 'technique', 'tools', 'wear', 'electronics'];
  tableRows = [];

  chekboxsValues: any;
  priceAt: number;
  priceTo: number;
  selected: string;


  ngOnInit() {
    this.tableRows = this.modelService.getColumnTitles();
    this.chekboxsValues = this.categories.map((cat) => {
      return {[cat]: false};
    });
    this.priceAt = 0;
    this.priceTo = 100000;
    this.selected = 'Select';
  }


  generateExpression() {
    let exp = `(([price>${this.priceAt}])&([price<${this.priceTo}]))`;
    let chBxExp = '';
    for (const key in this.chekboxsValues) {
      if (this.chekboxsValues[key] === true) {
        if (chBxExp === '') {
          chBxExp = '(' + chBxExp + `[category==${key}]` + ')';
        } else {
          chBxExp = '(' + chBxExp + `|([category==${key}])` + ')';
        }
      }
    }

    if (this.selected === 'All') {
      return exp.slice(1, -1);
    }

    if (this.selected !== 'All') {
      (chBxExp === '') ? exp += '&' + `([category==${this.selected}])` : exp += '&' + `(([category==${this.selected}])|${chBxExp})`;
    } else {
      if (chBxExp === '') {
        exp = exp.slice(1, -1);
      }
    }
    return exp;
  }

  filterAction() {
    this.modelService.filterModel(this.generateExpression());
  }


  show() {
    this.showComponent = !this.showComponent;
  }

}
