import { Router, ActivatedRoute } from '@angular/router';
import { NoteService } from 'src/app/note.service';
import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/Models/notes';

interface PaginateObj { }
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[] = new Array<Note>();
  allNotes: any;
  errorMessage: any;
  note_id!: string | undefined;
  noteId!: number;
  userFirstName: any;
  userLastName: any;
  NotesHeading: string = "Add a New Note Today!";
  noteSize: number = 10;
  page: number = 1;
  count: number = 0;
  responsePerPage: any;
  responseTotal: any;
  totalItems: any;

  showCloseBtn: string = "none";
  showSideMenu: string = "block";
  showCloseBtnDiv: string = "none";
  showMenu: boolean = false;
  showSideMennu: boolean = true;
  searchInput:any;

  constructor(private noteData: NoteService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // retrieve all notes from note service
    // this.noteId = this.route.snapshot.params['id'];
    this.getNotes(this.page, this.noteSize);
    this.showCloseBtn = "block";
    this.showSideMenu = "block";
    this.showCloseBtnDiv = "block";
    // this.getNoteById(this.noteId)

  }
  // pagination
  // onNoteDataChange(event: any) {
  //   this.page = event;
  //   this.getNotes(this.page, this.noteSize)
  // }
  // onnoteSizeChange(event: any): void {
  //   this.noteSize = event.target.value;
  //   this.page = 1;
  //   this.getNotes(this.page, this.noteSize)
  // }

  getNotes(page: number, per_page: number) {
    this.noteData.getAll(page, per_page).subscribe((res) => {
      this.responsePerPage = res.per_page;
      this.totalItems = res.total;

      console.log('Notes Per Page', this.responsePerPage)
      console.log('Total Notes', this.totalItems)
      this.allNotes = res.data;
      console.log('All my notes', this.allNotes);
      console.log("The User's Name", this.allNotes[0]?.user.first_name)
      this.userFirstName = this.allNotes[0]?.user.first_name;
      this.userLastName = this.allNotes[0]?.user.last_name;
      // return this.notes[]
    })

  }

  dropdown() {
    this.showSideMennu = !this.showSideMennu;
  }

  getPage(p: number) {
    // const url = `https://api.instantwebtools.net/v1/passenger?page=${page}&size=${this.itemsPerPage}`;
    this.getNotes(p, this.noteSize)
    // this.noteData.getAll().subscribe((res) => {
    //   this.responsePerPage = res.per_page;
    //   this.totalItems = res.total;

    //   console.log('Notes Per Page', this.responsePerPage)
    //   console.log('Total Notes', this.totalItems)
    //   this.allNotes = res.data;
    // })
  }

  getNoteById(noteId: number) {
    this.noteData.getNote(noteId).subscribe((res) => {
      console.log(res)
      this.router.navigateByUrl(`/main/view/${noteId}`);
      return this.notes[noteId];
    })

  }

  deleteNote(event: any) {
    console.log(event)
    if (event.actionType === 'delete') {
      console.log('do something')
      this.noteData.delete(event.note_id).subscribe((res: any) => {
        this.getNotes(this.page, this.noteSize)
      })
    } else {
      this.router.navigateByUrl(`/main/view/${event.note_id}`)
    }
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/auth/']);
  }

  search(event:any){
    event.target.value = this.searchInput;
    console.log(this.searchInput);
    // console.log('Search Value',this.searchInput)
  }

}




