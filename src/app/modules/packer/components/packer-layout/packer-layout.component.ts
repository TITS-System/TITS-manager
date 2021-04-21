import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutOptionsService } from '../../services/layout-options.service';

@Component({
  selector: 'app-packer-layout',
  templateUrl: './packer-layout.component.html',
  styleUrls: ['./packer-layout.component.sass']
})
export class PackerLayoutComponent implements OnInit, OnDestroy {

  constructor(
    public options: LayoutOptionsService,
    ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
