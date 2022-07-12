import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from 'src/app/note.service';
import { Component, OnInit } from '@angular/core';
import { Note } from '../Models/notes';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.component.html',
  styleUrls: ['./view-note.component.css']
})
export class ViewNoteComponent implements OnInit {
  noteId!: number;
  notes:Note[]= new Array<Note>();
  particularNote: any;
  viewNote!: FormGroup;
  NotesHeading: string = "View Note";

  constructor(private noteData:NoteService, private route:ActivatedRoute, private fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.noteId = this.route.snapshot.params['id'];
    this.initViewNote();
    this.viewNoteById(this.noteId);
    // this.getNoteById(this.noteId)
  }

  initViewNote(){
    this.viewNote = this.fb.group({
      title: ["", Validators.required],
      content: ["", Validators.required]
    })
  }

  // since you can already view the note her, just call the Edit or update endpoint here so you can edit a note as you view it.

  // for view

  viewNoteById(noteId: number) {
    this.noteData.getNote(noteId).subscribe((res) =>{
      // this.router.navigateByUrl(`/main/edit/${noteId}`
      console.log("The whole response for a note I view", res);
      if(res.data === null){
        this.initViewNote();
      }
      if(res.data !== null){
        this.particularNote = res.data;
        console.log('particular note',this.particularNote);
        this.populateNote()
        // return this.notes[noteId];
      }
     
    })

  }
  getNoteById(noteId: number) {
    this.noteData.getNote(noteId).subscribe((res) =>{
      this.router.navigateByUrl(`/main/edit/${noteId}`);
      console.log("The whole response for a note I want to Edit", res);
      if(res.data === null){
        this.initViewNote();
      }
      if(res.data.status === "success"){
        this.particularNote = res.data;
        console.log('particular note',this.particularNote);
        this.populateNote()
        // return this.notes[noteId];
      }
     
    })

  }

  populateNote(){
    this.viewNote = this.fb.group({
      title: [this.particularNote.title, Validators.required],
      content: [this.particularNote.content, Validators.required]
    })
  }


  // this is not needed here

  // updateNote(note_id: number, title: string, content:string){
  //   this.noteData.update(note_id, title, content).subscribe((res)=>{
  //     let note = this.notes[note_id];
  //     note.title = title;
  //     note.content = content;
  //   })
  // }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/auth/']);
  }
  
}
