import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  calls: number;

  constructor() {
    this.calls = 0;
  }

  addCall(): void {
    this.calls = this.calls + 1;
  }

  removeCall(): void {
    this.calls = this.calls - 1;
  }
}
