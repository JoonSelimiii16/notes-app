import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../interfaces/note';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent implements OnInit { 
route = inject(ActivatedRoute);
router = inject(Router);
notesService = inject(NotesService)
noteId:any;
note: Note | undefined;

ngOnInit():void{
  this.route.paramMap.subscribe((param)=>{
    this.noteId=param.get('id');

    this.notesService.getNotes()
  .subscribe((notes:Note[]) => {
    this.note = notes[this.noteId];
  });
  });
}
deleteNote(){
  this.notesService.deleteNotes(this.noteId);
  this.router.navigate(['/']);

}

}
