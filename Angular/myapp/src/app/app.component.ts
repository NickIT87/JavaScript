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
  userObject = {
    name: 'John',
    age: '32',
    id: 0,
    isColored: true
  }

  newDate = new Date()

  constructor(private httpService: HttpService) {}

  handleEvent() {
    this.counter++
    console.log('Event called!', this.title)
  }
  handleService() {
    this.httpService.getRequest('https://jsonplaceholder.typicode.com/todos/1')
    .subscribe((response) => {
      console.log(response)
      this.jsonValue = response
    })
  }
  handleComponentEvent(event: any) {
    console.log(event)
  }
}
