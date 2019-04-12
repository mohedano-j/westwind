import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  success(message) {
    window.toastr.success(message);
  }
}
