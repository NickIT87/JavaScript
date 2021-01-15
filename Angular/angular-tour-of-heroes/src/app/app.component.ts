import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of heroes!'
  title2: number = sum(2, 3)
}

function sum(a: number, b: number): number {
  console.log(ats(2,3))
  return a + b
}

let ats = (a: number, b: number):number => a * b