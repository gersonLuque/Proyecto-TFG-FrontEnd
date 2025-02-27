import { Injectable } from '@angular/core';
import {ConfirmationService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private confirmation:ConfirmationService) { }

  showDeleteDialog(message: string, deleteItem: () => void) {
    this.confirmation.confirm({
      message: message,
      header: 'Confirmación de borrado',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Borrar',
        severity: 'danger',
      },
      accept: () => {
        deleteItem()
      }
    });
  }
}
