import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
interface ExcelFile {
  name: string;
  data: any[];
}

@Component({
  selector: 'app-files-modal',
  templateUrl: './files-modal.component.html',
  styleUrls: ['./files-modal.component.css']
})
export class FilesModalComponent implements OnInit{

  @Output() fileSelected: EventEmitter<ExcelFile> = new EventEmitter<ExcelFile>();

  constructor(private http:HttpClient,private router:Router) {
  }

  files!:any;
    ngOnInit(): void {
      this.http.get('http://localhost:3001/files').subscribe(res=>{
        this.files = res;})
    }

  redirectToExcelFile(fileName: string): void {
    window.location.href = `http://localhost:3001/storage/excel/${fileName}`;
  }
   onSelectFile(file:ExcelFile){
      console.log(file.name)
      this.fileSelected.emit(file);
   }

}
