import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VizualComponent} from './vizual/vizual.component';
import {ItemsTableComponent} from './items-table/items-table.component';


const routes: Routes = [
  {path: 'visual', component: VizualComponent},
  {path: '', component: ItemsTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
