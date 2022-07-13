import { Note } from './../../Models/notes';
import { NoteService } from './../../note.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit {
  addNoteForm!:FormGroup;
  loading:boolean = false;
  newNote: any;
  notes:Note[]= new Array<Note>();
  NotesHeading: string = "Add New Note"
 

  constructor(private fb:FormBuilder, private router: Router, private noteData:NoteService, private activatedRoute: ActivatedRoute) { }

  initAddNoteForm(){
    this.addNoteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.initAddNoteForm();
    // this.getNoteIdFromUrl();
  }
  // getNoteIdFromUrl() {
  //   this.activatedRoute.params.subscribe((param: Params) => {
  //     if (!param['id']) {
  //       this.router.navigateByUrl("main/dashboard");
  //     }
  //     this.note_id = param['id'];
  //     this.viewNoteForUser();
  //   });
  // }

  // viewNoteForUser(){
  //   this.noteData.getNoteForUser(this.addNoteForm.value).subscribe((res) => {
  //     this.noteDetails = res;
  //     console.log("Logged in User note Details", this.noteDetails)

  //     //   if(res.status == error){
  //     //     this.noteDetails = res.data;
  //     //   }else{
  //     //     this.notify.publishMessages(res.message, "danger", 1);

  //     //   }
  //     }
  //   )
  // }


  SaveNote(){
   const noteValues = this.addNoteForm.value;
    console.log(noteValues);
    // first: Store the note with an endpoint for storing.
    this.noteData.addNote(noteValues).subscribe((res)=> {
      this.newNote = res;
      if(noteValues !== null){
        console.log(this.newNote.data)
        let newLength = this.notes.push(noteValues);
        this.router.navigateByUrl('/main/dashboard');
        console.log("New Length:", newLength);
        console.log(this.notes);
        return newLength;
      }else{
        this.router.navigateByUrl('/main/dashboard');
      }
     
      return this.newNote.data;
    })

  }

  
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/auth/']);
  }

}
