import { Component, OnInit } from '@angular/core';
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
isHomePage: any;

  constructor(private menu: MenuController) {}
  
  ngOnInit() {
  }

}
