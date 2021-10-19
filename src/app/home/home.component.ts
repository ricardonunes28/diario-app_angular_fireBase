import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Diary } from '../interfaces/diary';
import { DiariosService } from '../services/diarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
allDiaries$: Observable<Diary[]>
allDiaries: Diary[] = [];

  constructor(private diarioServices: DiariosService) { }



  ngOnInit(): void {
    this.allDiaries$ = this.diarioServices.getAllDiares();
  }

}
