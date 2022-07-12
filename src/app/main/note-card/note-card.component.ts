import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NoteService } from 'src/app/note.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements OnInit {
  isVisible: boolean = true;
  @Input() title!: string;
  @Input() content!: string;
  @Input() date!: number;
  notes: any;
  allNotes: any;
  errorMessage: any;
  // note_id: string | undefined;
  noteToDelete:any;


  constructor(private noteData: NoteService) { }

  ngOnInit(): void {
    this.isVisible = false;
    this.getNotes();
    // this.note_id = this.route.snapshot.params['id'];
  }

  cardHover() {
    this.isVisible = true;
  }

  hideCloseBtn() {
    this.isVisible = false;
  }

  // deleteNote(note_id: number) {
  //   // if (note_id) {
  //   //   this.noteData.delete(note_id).subscribe((data) => {
  //   //     this.getNotes()
  //   //   }, (error) => {
  //   //     this.errorMessage = error
  //   //   })
  //   // }

  //   const noteValues = {
  //     title: this.title,
  //     content: this.content
  //   }

  //   this.noteData.delete(note_id).subscribe((res) => {
  //     this.noteToDelete = res;
  //     if(note_id){
  //       console.log("Delete this note", res)
  //       noteValues.title = "",
  //       noteValues.content = ""
  //     }

  //   })
  // }


  getNotes() {
    this.noteData.getAll().subscribe((res) => {
      this.allNotes = res.data;
      console.log('All my notes', this.allNotes)
      // return this.notes[]
    })
  }
}
