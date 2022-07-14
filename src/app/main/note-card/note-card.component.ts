import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  @Input() id!: any;
  @Output() sendId = new EventEmitter();
  amount = '600';
  notes: any;
  allNotes: any;
  errorMessage: any;
  // note_id: string | undefined;
  noteToDelete:any;
  note_id!:number;


  constructor(private noteData: NoteService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.isVisible = false;
    // this.getNotes();
    // this.deleteNote(this.note_id);
    // this.note_id = this.route.snapshot.params['id'];
  }

  cardHover() {
    this.isVisible = true;
  }

  hideCloseBtn() {
    this.isVisible = false;
  }

  // getNotes() {
  //   this.noteData.getAll().subscribe((res) => {
  //     this.allNotes = res.data;
  //     console.log('All my notes', this.allNotes)
  //     // return this.notes[]
  //   })
  // }


    deleteNote(note_id:number, type: string) {
     this.sendId.emit({note_id, actionType: type})
  }

  
}
