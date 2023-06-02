import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';


@Component({
  selector: 'app-tournois',
  templateUrl: './tournois.component.html',
  styleUrls: ['./tournois.component.scss']
})
export class TournoisComponent implements OnInit {

  constructor(
    private router: Router

  ) { }

  ngOnInit(): void {
  }



}
