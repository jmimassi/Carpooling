import { Component, OnInit } from '@angular/core';
import { ItinariesService } from '../../services/itinaries.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-my-itinaries',
  templateUrl: './my-itinaries.page.html',
  styleUrls: ['./my-itinaries.page.scss'],
})
export class MyItinariesPage implements OnInit {
  myItinaries: any[] = [];

  constructor(private itinariesService: ItinariesService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage');
      return;
    }

    const decodedToken: any = jwt_decode(token);
    const userId = decodedToken.id;

    this.itinariesService.itinariesListMyCard().subscribe(
      (data) => {
        this.myItinaries = data;
      },
      (error) => {
        console.log('Error fetching itinaries:', error);
      }
    );
  }
}
