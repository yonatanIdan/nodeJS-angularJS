import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ServerAPIService } from '../services/server-api.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  constructor(
    private api: ServerAPIService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
  }

  uploadPic(){
    console.log('preview Url:', this.previewUrl);
    const file2Server = {
      name: this.fileData.name,
      dirname: '',
      blob: this.previewUrl,
    };
    this.api.writeFileBase64(JSON.stringify(file2Server))
    .subscribe((res:any)=>{
      console.log('result', res);
    }, (error) => {
      console.log('error', error);
    });
  }
  
  // base64Image:string = "";
  // transform(){
  //   this.base64Image = this.previewUrl;
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image);
  // }

  fileName: any = null;
  fileData: File = null;
  previewUrl: any = null;
  
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    console.log('fileData:',this.fileData);
    if (this.fileData) {
      var reader = new FileReader();
      reader.readAsDataURL(this.fileData);
      reader.onload = () => {
        this.previewUrl = reader.result;
      }
    }
  }
  
  isPic(){
    if(this.fileData.type === 'image/jpeg' || this.fileData.type === 'image/png') return true;
    else return false;
  }

  isPDF(){
    if(this.fileData.type === 'application/pdf') return true;
    else return false;
  }
}
