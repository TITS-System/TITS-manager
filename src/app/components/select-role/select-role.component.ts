import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/shared/interfaces/role.interface';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.sass']
})
export class SelectRoleComponent implements OnInit {


  constructor(
    public accountService: AccountService
  ) { }

  ngOnInit(): void {
  }

}
