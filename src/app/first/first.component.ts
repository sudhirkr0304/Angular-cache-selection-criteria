import { AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {DataSource} from '@angular/cdk/collections';
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from '@angular/material/form-field';
import { BehaviorSubject } from 'rxjs';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NgControl,
  Validators
} from '@angular/forms';
import { FilteringService } from '../filtering.service';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements AfterViewInit {
  public subject = new BehaviorSubject('filter');
  displayedColumns = ['id', 'name', 'progress', 'color'];
  users: UserData[] = [];
  dataSource: MatTableDataSource<UserData> = new MatTableDataSource(this.users);
  filterValue: string = '';
  selectedRow: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private filteringService: FilteringService) {
  }

  ngOnchanges() {
    
  }

  

  isSelected(row: any): boolean {
    if(this.selectedRow) {
      return this.selectedRow.id == row.id;
    }
    return false;
  }

  

  

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    console.log("hello2");
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator.pageIndex = this.filteringService.getPageIndex();
    this.paginator.page.subscribe((event) => {
      this.filteringService.setPageIndex(event.pageIndex);
    });
    
    this.applyFilter();
    
    if(this.filteringService.getSelectedRow() != null) {
      this.selectedRow = this.filteringService.getSelectedRow();
    }

    
    
    
  }

  applyFilter() {
    this.filteringService.setCriteria(this.filterValue);
    let filterValue = this.filterValue.trim(); // Remove whitespace
    filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    //this.filteringService.setDataSource(this.dataSource);
    
  }

  hello(row:any){
    this.selectedRow = row;
    this.filteringService.setSelectedRow(row);
  }

  

  ngOnInit(): void {
    
    this.filterValue = this.filteringService.getCriteria();
    const data = this.filteringService.getDataSource();
    
    if(data.filteredData.length == 0) {
      const users: UserData[] = [];
      for (let i = 1; i <= 20; i++) { users.push(createNewUser(i)); }
      this.dataSource = new MatTableDataSource(users);  
    }
    else {
      
      this.dataSource = data;
    }
    console.log("hello3");
    
  }

}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}

/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}
