import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-section-card-header',
  templateUrl: './section-card-header.component.html',
  styleUrls: ['./section-card-header.component.css']
})
export class SectionCardHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() id: number;

  constructor() { }

  ngOnInit() {
  }

}
