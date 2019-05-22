import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateMemeComponent } from './meme-catalog/create-meme/create-meme.component';
import { MemeCatalogComponent } from './meme-catalog/meme-catalog.component';
import { EditMemeComponent } from './meme-catalog/edit-meme/edit-meme.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ExploreComponent } from './explore/explore.component';
import { CanvasComponent } from './canvas/canvas.component';

const routes: Routes = [
   { path: '', redirectTo: '/memes', pathMatch: 'full' },
   { path: 'memes', component: MemeCatalogComponent },
   { path: 'create', component: CreateMemeComponent },
   { path: 'edit/:id', component: EditMemeComponent },
   { path: 'explore', component: ExploreComponent },
   { path: 'makeMeme', component: CanvasComponent },
   { path: '**', component: NotFoundComponent }
];

@NgModule({
   imports: [RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
   }),
   ],
   exports: [RouterModule]
})
export class AppRoutingModule { }
