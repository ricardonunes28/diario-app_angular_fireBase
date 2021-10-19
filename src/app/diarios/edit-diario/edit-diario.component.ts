import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Diary } from 'src/app/interfaces/diary';
import { DiariosService } from 'src/app/services/diarios.service';
import { UploadImageService } from 'src/app/services/upload-image.service';

@Component({
  selector: 'app-edit-diario',
  templateUrl: './edit-diario.component.html',
  styleUrls: ['./edit-diario.component.css']
})
export class EditDiarioComponent implements OnInit {
@Input() diary: Diary = {} as Diary;

image: File | null = null;

changeImage(images: FileList | null){
  if(images){
    this.image = images[0];
  }
}

onSubmit(){
  if(this.image){
    this.uploadService.uploadImage(this.image, (url)=>{
      this.diary.image = url;
      this.updateDiary();
    })
  } else {
    this.updateDiary();
  }
}

updateDiary() {
  this.diarioService.updateDiary(this.diary).then(this.activeModal.dismiss)
}
  constructor(
    public activeModal: NgbActiveModal,
    private uploadService: UploadImageService,
    private diarioService: DiariosService
    ) { }

  ngOnInit(): void {
  }

}
