import {ChangeDetectorRef, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {getFormatFromType, RowModel, SheetModel} from "@syncfusion/ej2-spreadsheet";
import {SpreadsheetComponent} from "@syncfusion/ej2-angular-spreadsheet";
import {HttpClient} from "@angular/common/http";
import * as XLSX from 'xlsx';
import {NavbarComponent} from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'excel';
  @Output() file: EventEmitter<SpreadsheetComponent> = new EventEmitter<SpreadsheetComponent>();
  @ViewChild('spreadsheet', { static: false }) spreadsheet!: SpreadsheetComponent;


  public ssObj: SpreadsheetComponent | undefined;


  public openUrl = 'https://services.syncfusion.com/angular/production/api/spreadsheet/open';
  public saveUrl = 'https://services.syncfusion.com/angular/production/api/spreadsheet/save';

  constructor(private http: HttpClient,private cdr:ChangeDetectorRef) {
  }

  someFunction() {
    return this.spreadsheet;
  }

  public onCreated() {
    this.ssObj?.cellFormat(
      {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
      },
      'A1:E1');
    this.ssObj?.numberFormat(getFormatFromType('Currency'), 'B2:E8');
    // this.ssObj?.insertChart(this.chart);
  }

  sheetsData!: any[];

  handleFileSelected(file: any) {
    const sheets = file.sheets;

    const sheetData = [];

    for (const sheetName in sheets) {
      if (sheets.hasOwnProperty(sheetName)) {
        const sheet = sheets[sheetName];
        const data = sheet.data;
        console.log(data)
        const cellPositions = sheet.cellPositions;

        const formattedData = [];

        for (let i = 0; i < data.length; i++) {
          const rowData = [];
          for (let j = 0; j < data[i].length; j++) {
            const cellValue = data[i][j];
            const cellKey = `${String.fromCharCode(65 + j)}${i + 1}`;
            const cellPosition = cellPositions ? cellPositions[cellKey] : null;

            rowData.push({
              value: cellValue,
              position: cellPosition
            });
          }
          formattedData.push(rowData);
        }

        sheetData.push({
          name: sheetName,
          data: sheet.data
        });
      }
    }

    this.sheetsData = sheetData;

    this.cdr.detectChanges(); // Manually trigger change detection
  }




}
