import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentBoxComponent } from './content-box/content-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import {environment} from '../environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import {
  MatCardModule, MatCheckboxModule,
  MatInputModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSelectModule, MatSliderModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ItemsTableComponent } from './items-table/items-table.component';
import { AddItemComponent } from './add-item/add-item.component';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import {FormsModule} from '@angular/forms';
import { FilterComponent } from './filter/filter.component';
import { VizualComponent } from './vizual/vizual.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentBoxComponent,
    NavbarComponent,
    ItemsTableComponent,
    AddItemComponent,
    FilterComponent,
    VizualComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatCheckboxModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
