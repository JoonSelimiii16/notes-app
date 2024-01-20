import { Injectable } from '@angular/core';
import { Note } from '../interfaces/note';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotesService {
notes = new BehaviorSubject< Note[]>([]);

constructor() {
  const savedNotes = localStorage.getItem('notes');
  if(savedNotes){
    this.notes.next(JSON.parse(savedNotes));
  }
  this.notes.subscribe((notesArray: Note[])=>{
    localStorage.setItem('notes',JSON.stringify(notesArray));
  });
 }
createNote(newNote:Note) {
  this.notes
  .pipe(take(1))
  .subscribe((notesArray:Note[])=>{
    notesArray.unshift(newNote);
    this.notes.next(notesArray);
  })
}
getNotes(): Observable<Note[]>{
return this.notes;
}
deleteNotes(noteId: number){
this.notes
  .pipe(take(1))
  .subscribe((notesArray:Note[])=>{
    notesArray.splice(noteId,1);
    this.notes.next(notesArray);
  });
}
}





