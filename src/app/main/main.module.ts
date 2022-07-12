import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import {DatePipe} from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { NotesComponent } from './notes/notes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NoteCardComponent } from './note-card/note-card.component';
import { NoteDetailsComponent } from './note-details/note-details.component';

@NgModule({
  declarations: [
    NotesComponent,
    NoteCardComponent,
    NoteDetailsComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
     ReactiveFormsModule,
     MatFormFieldModule,
     MatInputModule,
    //  DatePipe,
  ]
})
export class MainModule { }
