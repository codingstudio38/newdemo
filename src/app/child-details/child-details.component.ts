import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-child-details',
  templateUrl: './child-details.component.html',
  styleUrls: ['./child-details.component.css']
})
export class ChildDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() items: {
    name: string, phono: number, social: string
  } = { name: "", phono: 1, social: "" }
}
