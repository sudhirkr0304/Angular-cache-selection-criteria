import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { UserData } from './first/first.component';


@Injectable({
    providedIn: 'root'
  })
  export class FilteringService {
    criteria: string = '';
     users: UserData[] = [];
    datasource: MatTableDataSource<UserData> = new MatTableDataSource(this.users);
     pageIndex = 0;
     selectedRow:any = null;
  
    setCriteria(criteria: string) {
      this.criteria = criteria;
    }
  
    getCriteria(): string {
      return this.criteria;
    }

    setDataSource(data : MatTableDataSource<UserData>) {
        this.datasource = data;
    }

    getDataSource() : MatTableDataSource<UserData> {
        return this.datasource;
    }

    setPageIndex(index:number) {
      this.pageIndex = index
    }

    getPageIndex() {
      return this.pageIndex;
    }

    setSelectedRow(row:any) {
      this.selectedRow = row;
    }
    getSelectedRow() {
      return this.selectedRow;
    }
  }