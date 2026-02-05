import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService, ModalState } from '../../../services/modal.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
    isOpen = false;
    title = '';
    message = '';
    type: 'alert' | 'confirm' = 'confirm';
    confirmText = 'Aceptar';
    cancelText = 'Cancelar';

    private subscription: Subscription | null = null;

    constructor(private modalService: ModalService) { }

    ngOnInit(): void {
        this.subscription = this.modalService.modalState$.subscribe((state: ModalState) => {
            this.isOpen = state.isOpen;
            if (state.isOpen) {
                this.title = state.title || '';
                this.message = state.message || '';
                this.type = state.type || 'confirm';
                this.confirmText = state.confirmText || 'Aceptar';
                this.cancelText = state.cancelText || 'Cancelar';
            }
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onConfirm(): void {
        this.modalService.close(true);
    }

    onCancel(): void {
        this.modalService.close(false);
    }

    onOverlayClick(event: MouseEvent): void {
        if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
            // Optional: Close on overlay click.
            // For confirm type, maybe treated as cancel.
            // For alert type, treated as confirm? Or just close.
            // Let's treat it as Cancel/Close for now.
            this.modalService.close(false);
        }
    }
}
