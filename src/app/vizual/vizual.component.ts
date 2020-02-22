import {Component, OnDestroy, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {TableDBHandlerService} from '../../Services/table-dbhandler.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-vizual',
  templateUrl: './vizual.component.html',
  styleUrls: ['./vizual.component.css']
})
export class VizualComponent implements OnInit, OnDestroy {

  chart: any;
  prices = [];
  dates = [];
  graphType = 'line';
  private subscriptions$ = new Array<Subscription>();


  constructor(private dbHandler: TableDBHandlerService, private route: Router) {
  }

  changeGrapghType(type: string) {
    this.graphType = type;
  }

  navigateBack() {
    this.route.navigate(['']);
  }


  ngOnInit(): void {
    console.log(this.dbHandler.moduleChanges$);
    this.subscriptions$.push(this.dbHandler.moduleChanges$.subscribe((items) => {
      this.prices.length = 0;
      this.dates.length = 0;
      items.forEach((item) => {
        this.prices.push(item.price);
        this.dates.push((new Date(item.date).toDateString()));
      });

      console.log(this.prices);

      this.chart = new Chart('canvas',
        {
          type: this.graphType,
          options: {
            legend: {
              labels: {
                fontColor: 'whitesmoke'
              }
            },
            title: {
              display: true,
              fontColor: 'whitesmoke',
              text: 'Visual Spent'
            },
            scales: {
              yAxes: [{
                ticks: {
                  fontColor: 'whitesmoke'
                },
              }],
              xAxes: [{
                ticks: {
                  fontColor: 'whitesmoke'
                },
              }]
            }

          },
          data: {
            labels: this.dates,
            datasets: [
              {
                label: 'Spent Mount Per Mount',
                data: this.prices,
                backgroundColor: 'rgba(206,197,200,0.8)',
                borderColor: 'rgba(0, 62, 73, 0.45)',
                fill: true
              }
            ]
          },
        });


    }));
  }


  ngOnDestroy() {
    this.subscriptions$.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

}
