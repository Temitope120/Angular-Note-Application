import { Router, ActivatedRoute } from '@angular/router';
import { NoteService } from 'src/app/note.service';
import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/Models/notes';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[] = new Array<Note>();
  allNotes: any;
  errorMessage:any;
  note_id!: string | undefined;
  noteId!: number;
  userName: any;
  NotesHeading: string = "Add a New Note Today!"

  constructor(private noteData: NoteService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    // retrieve all notes from note service
    // this.noteId = this.route.snapshot.params['id'];
    this.getNotes()
    // this.getNoteById(this.noteId)

  }


  getNotes() {
    this.noteData.getAll().subscribe((res) => {
      this.allNotes = res.data;
      console.log('All my notes', this.allNotes);
      console.log("The User's Name", this.allNotes[0].user.first_name)
      this.userName = this.allNotes[0].user.first_name;
      // return this.notes[]
    })

  }


  getNoteById(noteId: number) {
    this.noteData.getNote(noteId).subscribe((res) => {
      console.log(res)
      this.router.navigateByUrl(`/main/view/${noteId}`);
      return this.notes[noteId];
    })

  }

  // deleteNote(note_id: string | undefined) {
  //   if (note_id) {
  //     this.noteData.delete(note_id).subscribe((data) => {
  //       this.getNotes()
  //     }, (error) => {
  //       this.errorMessage = error
  //     })
  //   }
  // }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/auth/']);
  }

}




