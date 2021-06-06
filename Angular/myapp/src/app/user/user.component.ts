import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

interface UserInterface {
  name: string
  age: string
  id: number
  isColored: boolean
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user: UserInterface

  @Output() userCustomEvent: EventEmitter<UserInterface>
  
  isColored: boolean = false

  constructor() { 
    this.userCustomEvent = new EventEmitter<UserInterface>()
    this.user = {} as UserInterface
  }

  ngOnInit(): void {
    this.isColored = this.user.isColored
    console.log(this.isColored)
    console.log(this.user.isColored)
  }

  sendUserEvent(): void {
    this.userCustomEvent.emit(this.user)
  }

}
