import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
const DEFAULT_NOTIFICATION_DELAY = 5900;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  success(message: string) {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      animation: false,
      timer: DEFAULT_NOTIFICATION_DELAY,
      width: 'auto',
      color: '#fff',
      html: message,
      customClass: {
        popup: 'bg-success',
      },
      didRender(toast: HTMLElement) {
        toast.addEventListener('click', () => {
          Swal.close();
        });
      }
    })
      .then()
  }

  error(message: string) {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      animation: false,
      timer: DEFAULT_NOTIFICATION_DELAY,
      color: '#fff',
      html: message,
      width: 'auto',
      customClass: {
        popup: 'bg-danger',
      },
      didRender(toast: HTMLElement) {
        toast.addEventListener('click', () => {
          Swal.close();
        });
      }
    })
      .then()
  }
}
