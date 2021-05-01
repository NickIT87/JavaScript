import { Component } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hello world how are you doing ?';
  customprop = 'custom property binding'
  counter: number = 0
  jsonValue = {
    a: 'hello',
    b: 'world'
  }

  newDate = new Date()

  constructor(private httpService: HttpService) { }

  handleEvent() {
    this.counter++
    console.log('Event called!', this.title)
  }
}
