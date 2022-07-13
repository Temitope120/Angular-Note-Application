import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from 'src/app/note.service';
import { Component, OnInit } from '@angular/core';
import { Note } from '../Models/notes';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {
  notes:Note[]= new Array<Note>();
  editNote!: FormGroup;
  notevalues: any;
  note_id!: number;
  noteToEdit:any;
  NotesHeading: string = "Edit Note";
  userFirstName: any;
  userLastName: any;

  constructor(private noteData:NoteService, private fb: FormBuilder, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.note_id = this.route.snapshot.params['id'];
    this.initEditNoteForm();
    this.EditNoteById(this.note_id)
    
  }

  initEditNoteForm(){
    this.editNote = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    })
  }

  submitEditedNote(){
    const payload = this.editNote.value;
    this.updateNote(this.note_id);
  }

  EditNoteById(noteId: number) {
    this.noteData.getNote(noteId).subscribe((res) =>{
      console.log("The whole response for a note I want to Edit", res);
      console.log("The status for a note I want to Edit", res.status);
      this.userFirstName = res.data.user.first_name;
      this.userLastName = res.data.user.last_name;
      if(res.data === null){
        this.initEditNoteForm();
      }
      if(res.status === "success"){
        this.noteToEdit = res.data;
        console.log('This is the note I want to Edit',this.noteToEdit);
        this.populateNoteToEdit()
      }
     
    })

  }

  populateNoteToEdit(){
    this.editNote = this.fb.group({
      title: [this.noteToEdit.title, Validators.required],
      content: [this.noteToEdit.content, Validators.required]
    })
  }


  updateNote(note_id:number){
    const noteValues = {
      title: this.editNote.value.title,
      content: this.editNote.value.content
    }
    this.noteData.update(note_id, noteValues).subscribe((res)=>{
      console.log(res)
      if(res.data !== null){
        this.notevalues = res.data;
        this.populateNote();
        this.router.navigateByUrl(`/main/dashboard`);
        let note = this.notes[note_id];
      }
     
    })
  }
  

  populateNote(){
    this.editNote = this.fb.group({
      title: [this.notevalues.title, Validators.required],
      content: [this.notevalues.content, Validators.required]
    })
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/auth/']);
  }

}
