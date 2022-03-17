import {Component, Input, OnInit} from '@angular/core';

export interface BreadcrumbData {
  nom: string,
  route: string
}

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styleUrls: ['./breadcrums.component.scss']
})
export class BreadcrumsComponent implements OnInit {
  @Input() path!: BreadcrumbData;

  constructor() { }

  ngOnInit(): void {
  }

}
