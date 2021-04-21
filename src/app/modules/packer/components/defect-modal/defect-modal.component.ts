import { Component, OnInit } from '@angular/core';
import { DefectModalService } from '../../services/defect-modal.service';

@Component({
  selector: 'app-defect-modal',
  templateUrl: './defect-modal.component.html',
  styleUrls: ['./defect-modal.component.sass']
})
export class DefectModalComponent implements OnInit {

  constructor(
    public defectModalService: DefectModalService
  ) { }

  ngOnInit(): void {
  }

  confirmDefect(): void {
    this.defectModalService.hide()
  }

}
