import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Diary } from 'src/app/interfaces/diary';
import { DiariosService } from 'src/app/services/diarios.service';
import { UploadImageService } from 'src/app/services/upload-image.service';

@Component({
  selector: 'app-add-diario',
  templateUrl: './add-diario.component.html',
  styleUrls: ['./add-diario.component.css']
})
export class AddDiarioComponent implements OnInit {
  diary: Diary = {} as Diary;
  image: File | null = null;

  changeImage(images: FileList | null){
    if(images){
      this.image = images[0];
    }
  }

  onSubmit() {
    this.uploadService.uploadImage( this.image!, (url)=>{
      this.diary.image = url;
      this.addDiary();
    })
  }

  addDiary(){
    this.diariosService.addDiary(this.diary).then(this.activeModal.dismiss);
  }



  constructor(
    private diariosService: DiariosService,
    private uploadService: UploadImageService,
    public activeModal: NgbActiveModal
    ) { }

  ngOnInit(): void {
  }

}
