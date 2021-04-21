import { Component, OnInit } from '@angular/core';
import { DefectModalService } from '../../services/defect-modal.service';

@Component({
  selector: 'app-footer-defect-button',
  templateUrl: './footer-defect-button.component.html',
  styleUrls: ['./footer-defect-button.component.sass']
})
export class FooterDefectButtonComponent implements OnInit {

  constructor(
    public defectModalService: DefectModalService
  ) { }

  ngOnInit(): void {
  }

}
