import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutOptionsService } from '../../services/layout-options.service';

@Component({
  selector: 'app-assembly',
  templateUrl: './assembly.component.html',
  styleUrls: ['./assembly.component.sass']
})
export class AssemblyComponent implements OnInit, OnDestroy {

  constructor(
    private _layoutOptionsService: LayoutOptionsService,
  ) { }

  ngOnInit(): void {

    Promise.resolve().then(() => {
      this._layoutOptionsService.displayFooterAssemblyButtons = true
      this._layoutOptionsService.displayFooterArrows = true
    })

  }

  ngOnDestroy(): void {
    this._layoutOptionsService.resetOptions()
  }

}
