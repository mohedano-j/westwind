import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService implements OnInit {

    active: boolean;

    ngOnInit(): void {
      this.active = false;
    }

    show() {
      this.active = true;
    }

    hide() {
      this.active = false;
    }
}
