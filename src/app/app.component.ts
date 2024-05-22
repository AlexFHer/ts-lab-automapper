import { Component, OnInit } from '@angular/core';

interface ToyDto {
  name: string;
  price: number;
  available: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public ngOnInit() {

  }
}
