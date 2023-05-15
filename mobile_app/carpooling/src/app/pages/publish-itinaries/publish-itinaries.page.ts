import { Component } from '@angular/core';
import { ItinariesService } from '../../services/itinaries.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publish-itinaries',
  templateUrl: './publish-itinaries.page.html',
  styleUrls: ['./publish-itinaries.page.scss'],
})
export class PublishItinariesPage {
  itinarie: any = {
    startDate: new Date().toISOString().substring(0, 10), // Initialise la valeur de startDate avec la date actuelle
    hours: '', // Initialise la valeur de hours avec une chaîne vide
  };

  constructor(private itinariesService: ItinariesService, private router: Router) { }

  onSubmit(itinarie: {
    destination: string,
    startAddress: string,
    seats: number,
    startDateTime: string
  }) {
    const [startDate, hours] = itinarie.startDateTime.split('T');
    const updatedItinarie = {
      destination: itinarie.destination,
      startAddress: itinarie.startAddress,
      seats: itinarie.seats,
      startDate: startDate.trim(),
      hours: hours.trim()
    };

    this.itinariesService.itinariesCreate(updatedItinarie).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/itinaries']);
      },
      error => {
        console.log(error);
      }
    );
  }


}
