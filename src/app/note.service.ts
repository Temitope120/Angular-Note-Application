import { Injectable } from '@angular/core';
import { Note } from './Models/notes';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
// import

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notes:Note[]= new Array<Note>();

  constructor(private http:HttpClient) { }

  getAll(){
    // return this.notes;
    let dataURL:string = `${environment.serverUrl}/note/`;
    return this.http.get<any>(dataURL).pipe(catchError(this.handleError))
  }
  
   // get id of a note
  
      // get a single note with its note id 
  public getNote(note_id: number):Observable<any>{
    let dataURL:string = `${environment.serverUrl}/note/${note_id}`;
    return this.http.get<any>(dataURL).pipe(catchError(this.handleError))
  }

  // Retrieve the id of a note object
  getId(note:Note){
    return this.notes.indexOf(note)
  }

  // Add a new note
  addNote(note:Note):Observable<Note>{   
  let dataURL:string = `${environment.serverUrl}/note/`;
    return this.http.post<Note>(dataURL,note).pipe(catchError(this.handleError)) 
  }

  // edit and update
  update(note_id:number, payload:any): Observable<any>{
    // this update function should take payload as a parameter since where I'm using it I've created a payload there as the Editnote form values
    let dataURL:string = `${environment.serverUrl}/note/${note_id}`;
    // be sure of this endpoint for update and know what to pass in for put method: DONE
    return this.http.put<any>(dataURL, payload).pipe(catchError(this.handleError));
  }

  delete(note_id: number):Observable<{}>{
    let dataURL:string = `${environment.serverUrl}/note/${note_id}`;
    return this.http.delete<{}>(dataURL).pipe(catchError(this.handleError))
  }
  // delete(payload) {
  //   const options = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //     body: payload,
  //   };
  //   const url = `${this.baseUrl(routes.deleteUser)}`;
  //   return this.http.delete(url, options);
  // }

   

 


  //  // Error handling
   public handleError(error: HttpErrorResponse){
    let errorMessage: string = ""
    if(error.error instanceof ErrorEvent){
      errorMessage = `Errror: ${error.status} \n Message: ${error.message}`
    }
    return throwError(errorMessage)
  }
}
