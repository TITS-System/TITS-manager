import {AfterViewInit, ViewChild, Component, OnInit} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {CourierInterface} from '../../../../shared/interfaces/courier.interface';
import {Router} from '@angular/router';

export interface Courier extends CourierInterface {
  Position: number;
}


@Component({
  selector: 'app-courier',
  templateUrl: './courier.component.html',
  styleUrls: ['./courier.component.sass']
})
export class CourierComponent implements OnInit {


  search = '';

  // tslint:disable-next-line:variable-name
  private _selectedCourierId = -1;

  get selectedCourier(): Courier {
    return this.couriers.filter(c => c.Id == this._selectedCourierId)[0];
  }

  get dataSource(): any {
    if (!this.search) {
      return new MatTableDataSource(this.ELEMENT_DATA);
    }

    return new MatTableDataSource(this.ELEMENT_DATA.filter((c: CourierInterface) =>
      c.Id.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
      c.Username.toLowerCase().indexOf(this.search.toLowerCase()) > -1));
  }


  couriers: Courier[] = [];

  ELEMENT_DATA: Courier[] = [
    {Position: 1, Username: 'Sasha', IsOnWork: true, Id: 372824},
    {Position: 2, Username: 'Danya', IsOnWork: false, Id: 20223},
    {Position: 3, Username: 'Pasha', IsOnWork: true, Id: 889432121},
    {Position: 4, Username: 'Vlad', IsOnWork: true, Id: 2523},
    {Position: 5, Username: 'Egor', IsOnWork: false, Id: 6345},
    {Position: 8, Username: 'Gena', IsOnWork: false, Id: 7},
    {Position: 6, Username: 'Alexei', IsOnWork: true, Id: 567},
    {Position: 7, Username: 'Petr', IsOnWork: true, Id: 5674453},
  ];

  displayedColumns: string[] = ['Position', 'Username', 'IsOnWork', 'Id'];
  // dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  private _dataSource: any;

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }


  openCourierPage(courierId: number): void {
    // this._selectedCourierId = courierId;
    //
    // this.showCourierById();

    this.router.navigate(['/manager', 'couriers', `${courierId}`]);
  }

  showCourierById(): void {
    (document.querySelector('.absolute-window') as HTMLElement).style.left = '0';
  }

  hideCourierById(): void {
    (document.querySelector('.absolute-window') as HTMLElement).style.left = '100%';
  }

  getProperLink(courierId: number): string {
    let propStr = String(courierId);

    while (propStr.length < 9) {
      propStr = '0' + propStr;
    }

    return propStr;
  }


}
