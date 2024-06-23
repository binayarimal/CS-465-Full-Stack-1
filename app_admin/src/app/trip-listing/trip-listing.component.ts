import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css',
  providers:[TripDataService]

})
export class TripListingComponent implements OnInit {
  trips!: Trip[];
  message: string = '';
 
  constructor(
    private authenticationService: AuthenticationService,
    private tripDataService: TripDataService,
    private router: Router){
    console.log('trip-listing constructor')
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }
  
  private getStuff(): void {
    console.log("Trip Listing ");

     this.tripDataService.getTrips()
    .subscribe({
      next: (value: any) => {
      this.trips = value;
      if(value.length > 0){
     this.message = 'There are ' + value.length + ' trips available.';
      }
     else{
      this.message = 'There were no trips retrieved from the database';
      }
     console.log(this.message);
    },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    })
   }
    
  public isLoggedIn(){
    return this.authenticationService.isLoggedIn();
  }
  

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
    
    
  }
  
}
