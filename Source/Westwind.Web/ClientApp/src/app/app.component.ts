import { Component, AfterViewInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { LoadingService } from './loading-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  constructor(private router: Router, private loadingService: LoadingService) { }

  ngAfterViewInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loadingService.addCall();
      }
      else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.loadingService.removeCall();
      }
    });
  }
}
