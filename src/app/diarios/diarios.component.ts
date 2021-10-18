import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Diary } from '../interfaces/diary';
import { AuthService } from '../services/auth.service';
import { DiariosService } from '../services/diarios.service';
import { AddDiarioComponent } from './add-diario/add-diario.component';
import { EditDiarioComponent } from './edit-diario/edit-diario.component';

@Component({
  selector: 'app-diarios',
  templateUrl: './diarios.component.html',
  styleUrls: ['./diarios.component.css']
})
export class DiariosComponent implements OnInit {

  diarios$?: Observable<Diary[]>;
  diarios: Diary[] = [];

  constructor(
    private diariosService: DiariosService,
    private authService: AuthService,
    private modalService: NgbModal

  ) { }

  openAddDiarioModal() {
    this.modalService.open(AddDiarioComponent);
  }

  openUpdateDiarioModal(diary: Diary){
    const ref = this.modalService.open(EditDiarioComponent);
    ref.componentInstance.diary = diary;
  }

  deleteDiary(diary: Diary) {
    window.confirm('Tem certeza?') && this.diariosService.deleteDiary(diary);
  }

  ngOnInit(): void {
    this.authService.user.subscribe((user)=>{
      if(user){
        this.diarios$ = this.diariosService.getDiaries(user.uid)
      }
    });
  }

}
