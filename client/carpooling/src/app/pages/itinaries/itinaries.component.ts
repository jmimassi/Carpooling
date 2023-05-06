import { Component } from '@angular/core';
import { ItinariesService, Itinaries } from '../../services/itinaries.service';
import { UserService, User } from '../../services/user.service';
import { ItinariesUser, ItinariesUserService } from '../../services/itinarie-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-itinaries',
  templateUrl: './itinaries.component.html',
  styleUrls: ['./itinaries.component.css']
})
export class ItinariesComponent {

  itinaries: Itinaries[] = [];
  user: User[] = [];
  itinaries_user: ItinariesUser[] = [];

  constructor(private itinariesService: ItinariesService, private router: Router) { }

  ngOnInit() {
    this.itinariesService.itinariesListFormatted().subscribe(
      data => {
        // console.log(data)
        this.itinaries = data
        console.log("c'est les itiniraire", this.itinaries);
      }
    )
  }

  onSubmit() {
    this.router.navigate(['/signin']); // navigate to dashboard page
  }
}

