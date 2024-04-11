import {Component, EventEmitter, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FilesModalComponent} from "../files-modal/files-modal.component";
import * as XLSX from 'xlsx';
import {RowModel, SheetModel} from "@syncfusion/ej2-spreadsheet";
import {AppComponent} from "../app.component";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

export interface ExcelFile {
  name: string;
  data: any[];
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  selectedFile: File | null = null;
  @Output() fileSelected: EventEmitter<ExcelFile> = new EventEmitter<ExcelFile>();

  constructor(private http: HttpClient, private modelService: NgbModal,private appComponent:AppComponent,private dialog: MatDialog) {
  }


  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    const excelFile:ExcelFile = {
      name :  selectedFile.name,
      data: []
    };
    this.fileSelected.emit(excelFile);
  }

  onUpload() {
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<any>('http://192.168.1.120:3001/uploadFile', formData).subscribe(
      (response) => {
        console.log('Upload successful', response);

      },
      (error) => {
        console.error('Error uploading file', error);

      }
    );
  }

  onImportDonne() {
    const selectedFile = document.getElementById('selectedFile');
    if (selectedFile) {
      selectedFile.click();

    } else {
      console.error("Element not found.");
    }

  }

  getFiles() {
    const model = this.modelService.open(FilesModalComponent);
    model.componentInstance.fileSelected.subscribe((file:ExcelFile)=>{
      this.openFile(file);
    })

  }
  nom!:string;
  /*
  onDownloadExcelClick() {
    if (this.appComponent.someFunction()) {
      const sheets: SheetModel[] = this.appComponent.someFunction().sheets;

      if (sheets.length > 0) {
        const wb: XLSX.WorkBook = XLSX.utils.book_new();

        sheets.forEach(sheet => {
          const rows: RowModel[] | undefined = sheet.rows;

          if (rows && rows.length > 0) {
            const jsonData = rows.map(row => {
              if (row.cells) {
                return row.cells.map(cell => cell.value);
              } else {
                return [];
              }
            });

            const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(jsonData);
            XLSX.utils.book_append_sheet(wb, ws, sheet.name);
          }
        });

        const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

        const formData = new FormData();
        formData.append('file', blob, this.nom + '.xlsx');

        this.http.post('http://localhost:3001/uploadFile', formData).subscribe(response => {
          console.log('Excel file sent successfully to the backend');
        }, error => {
          console.error('Error sending Excel file:', error);
        });
      }
    }
  }
*/
  onDownloadExcelClick() {
    if (this.appComponent.someFunction()) {
      const sheets: SheetModel[] = this.appComponent.someFunction().sheets;

      if (sheets.length > 0) {
        const wb: XLSX.WorkBook = XLSX.utils.book_new();

        sheets.forEach(sheet => {
          const rows: RowModel[] | undefined = sheet.rows;

          if (rows && rows.length > 0) {
            const jsonData = rows.map(row => {
              if (row.cells) {
                return row.cells.map(cell => {
                  if (cell.chart) {
                    // Si la cellule contient un graphique, incluez les informations du graphique dans les données
                    return {
                      chart: cell.chart,
                      value: null // Vous pouvez ajouter plus de propriétés si nécessaire
                    };
                  } else {
                    // Sinon, incluez simplement la valeur de la cellule
                    return cell.value;
                  }
                });
              } else {
                return [];
              }
            });

            const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(jsonData);
            XLSX.utils.book_append_sheet(wb, ws, sheet.name);
          }
        });

        const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

        const formData = new FormData();
        formData.append('file', blob, this.nom + '.xlsx');

        this.http.post('http://localhost:3001/uploadFile', formData).subscribe(response => {
          console.log('Excel file sent successfully to the backend');
        }, error => {
          console.error('Error sending Excel file:', error);
        });
      }
    }
  }




  openDialog1() {
    const inputValue = prompt('Veuillez saisir un nom:');
    if (inputValue !== null) {
      this.nom = inputValue;
      this.onDownloadExcelClick()
    }
  }

  openFile(file:ExcelFile){
    this.fileSelected.emit(file);
  }

}

