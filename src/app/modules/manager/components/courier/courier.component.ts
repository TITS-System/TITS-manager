import { AfterViewInit, ViewChild, Component, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CourierInterface } from '../../../../shared/interfaces/courier.interface';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RestaurantService } from '../../services/restaurant.service';

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

  get selectedCourier(): { position: number, username: string, isOnWork: boolean, id: number } {
    return this.couriers.filter(c => c.id == this._selectedCourierId)[0];
  }

  get dataSource(): any {
    if (!this.search) {
      return new MatTableDataSource(this.ELEMENT_DATA);
    }

    return new MatTableDataSource(this.ELEMENT_DATA.filter((c) =>
      c.id.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
      c.username.toLowerCase().indexOf(this.search.toLowerCase()) > -1));
  }


  couriers: { position: number, username: string, isOnWork: boolean, id: number }[] = [];


  ELEMENT_DATA: { position: number, username: string, isOnWork: boolean, id: number }[] = [];

  displayedColumns: string[] = ['position', 'username', 'isOnWork', 'id'];
  // dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  private _dataSource: any;

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,
    private httpClient: HttpClient,
    private _restaurantService: RestaurantService) {
  }

  ngOnInit(): void {

    // console.log(`${environment.apiUrl}/courier/MGetAllByRestaurant?restaurantId=${this._restaurantService.getSelectedRestaurantId()}`);
    this.reloadCouriers();

    setInterval(this.reloadCouriers, 3000);
  }

  reloadCouriers(): void{        
    const token = localStorage.getItem(`token`) || '';
    const headers = new HttpHeaders().set('auth-token', token);
    this.httpClient.get(`${environment.apiUrl}/courier/MGetAllByRestaurant?restaurantId=${this._restaurantService.getSelectedRestaurantId()}`, { headers })
      .subscribe((response: any) => {
        // console.table(response.couriers);
        this.ELEMENT_DATA = response.couriers
        this.ELEMENT_DATA.forEach((val, index) => { val.position = index; });
      });
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

  handleToggle(row: { position: number, username: string, isOnWork: boolean, id: number }) {
    console.log(row.id);

    const token = localStorage.getItem(`token`) || '';
    const headers = new HttpHeaders().set('auth-token', token);

    if (row.isOnWork) {
      console.log(`${environment.apiUrl}/workersession/begin?courierId=${row.id}`);

      this.httpClient.get(`${environment.apiUrl}/workersession/begin?courierId=${row.id}`, { headers })
        .subscribe((response: any) => {
        });
    }
    else {
      console.log(`${environment.apiUrl}/workersession/close?courierId=${row.id}`);

      this.httpClient.get(`${environment.apiUrl}/workersession/close?courierId=${row.id}`, { headers })
        .subscribe((response: any) => {
        });
    }
  }

}
