import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myapp';

  counter: number = 0

  handleEvent() {
    this.counter++
    console.log('Event called!')
  }
}
