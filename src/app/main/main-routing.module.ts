import { EditNoteComponent } from './../edit-note/edit-note.component';
import { ViewNoteComponent } from './../view-note/view-note.component';
import { AuthGuard } from './../auth.guard';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { NotesComponent } from './notes/notes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: 'dashboard', component: NotesComponent}, 
  {path: 'new', component: NoteDetailsComponent},
  {path: 'edit/:id', component: EditNoteComponent},
  {path: 'view/:id', component: ViewNoteComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
