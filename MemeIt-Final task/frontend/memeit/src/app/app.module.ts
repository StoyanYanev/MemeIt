import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { MemeCatalogComponent } from './meme-catalog/meme-catalog.component';
import { EditMemeComponent } from './meme-catalog/edit-meme/edit-meme.component';
import { CreateMemeComponent } from './meme-catalog/create-meme/create-meme.component';
import { MemeListComponent } from './meme-catalog/meme-list/meme-list.component';
import { MemeItemComponent } from './meme-catalog/meme-list/meme-item/meme-item.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PaginationComponent } from './meme-catalog/pagination/pagination.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { NotFoundModule } from './not-found/not-found.module';
import { ExploreComponent } from './explore/explore.component';
import { CanvasComponent } from './canvas/canvas.component';


@NgModule({
   declarations: [
      AppComponent,
      NavigationComponent,
      FooterComponent,
      MemeCatalogComponent,
      EditMemeComponent,
      CreateMemeComponent,
      MemeListComponent,
      MemeItemComponent,
      PaginationComponent,
      ExploreComponent,
      CanvasComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      NgbModule,
      ReactiveFormsModule,
      TooltipModule.forRoot(),
      ButtonsModule.forRoot(),
      GridModule,
      BrowserAnimationsModule,
      NoopAnimationsModule,
      MatCardModule,
      MatGridListModule,
      NotFoundModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
