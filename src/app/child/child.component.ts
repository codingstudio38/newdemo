import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  // for perent to child
  @Input() pdata = null;

  // for child to perent
  @Output() getChildDataEvent = new EventEmitter<any>()
}
