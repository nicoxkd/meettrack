import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ModalState {
    isOpen: boolean;
    title?: string;
    message?: string;
    type?: 'alert' | 'confirm';
    confirmText?: string;
    cancelText?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private modalStateSubject = new Subject<ModalState>();
    modalState$ = this.modalStateSubject.asObservable();

    private resolveRef: ((result: boolean) => void) | null = null;

    constructor() { }

    open(title: string, message: string, type: 'alert' | 'confirm' = 'confirm', confirmText: string = 'Aceptar', cancelText: string = 'Cancelar'): Promise<boolean> {
        this.modalStateSubject.next({
            isOpen: true,
            title,
            message,
            type,
            confirmText,
            cancelText
        });

        return new Promise<boolean>((resolve) => {
            this.resolveRef = resolve;
        });
    }

    alert(title: string, message: string, confirmText: string = 'Aceptar'): Promise<boolean> {
        return this.open(title, message, 'alert', confirmText);
    }

    confirm(title: string, message: string, confirmText: string = 'Aceptar', cancelText: string = 'Cancelar'): Promise<boolean> {
        return this.open(title, message, 'confirm', confirmText, cancelText);
    }

    close(result: boolean) {
        this.modalStateSubject.next({ isOpen: false });
        if (this.resolveRef) {
            this.resolveRef(result);
            this.resolveRef = null;
        }
    }
}
