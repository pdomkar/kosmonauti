import { Component, Input, OnChanges, AfterViewChecked, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IMyDpOptions } from 'mydatepicker';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CosmonautService } from './../services/cosmonaut.service'
import { Cosmonaut } from './../cosmonaut';
import { VALIDATION_MESSAGE } from './validation-messages';

@Component({
    selector: 'pd-cosmonaut-add-edit-form',
    templateUrl: './cosmonaut-add-edit-form.component.html'
})

export class CosmonautAddEditFormComponent implements OnChanges, AfterViewChecked {
    @ViewChild('cosmonautForm') currentForm: NgForm;
    @Input() editedCosmonaut: Cosmonaut;
    cosmonautForm: NgForm;
    model: Cosmonaut = new Cosmonaut(null, '', '', null, '');
    private action: string = 'Vytvořit';
    private myDatePickerOptions: IMyDpOptions = { dateFormat: 'dd.mm.yyyy' };

    constructor(
        private location: Location,
        private router: Router,
        private cosmonautService:CosmonautService,
        private flashMessagesService:FlashMessagesService
    ) {}

    ngOnChanges(): void {
        if(this.isEdited()) {
            this.model = Object.assign({}, this.editedCosmonaut);
            this.action = 'Upravit';
        }
    }

    ngAfterViewChecked() {
        this.formChanged();
    }

    formChanged() {
        if (this.currentForm === this.cosmonautForm) { return; }
        this.cosmonautForm = this.currentForm;
        if (this.cosmonautForm) {
            this.cosmonautForm.valueChanges
                .subscribe(data => this.onValueChanged(data));
        }
    }

    /**
     * Is called after each form change. Validat forms and assign validation message
     * @param data
     */
    onValueChanged(data?: any) {
        if (!this.cosmonautForm) { return; }
        const form = this.cosmonautForm.form;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = VALIDATION_MESSAGE[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'name': '',
        'surname': '',
        'born': '',
        'power': ''
    };


    /**
     * Reset data in add form
     */
    reset():void {
        this.model = new Cosmonaut(null, '', '',null, '');
    }

    /**
     * Set default data in edit form
     */
    setDefault():void {
        if(this.isEdited()) {
            this.model = Object.assign({}, this.editedCosmonaut);
        }
    }

    /**
     * Return true if page is  for editing of cosmonaut
     * @returns {boolean}
     */
    isEdited(): boolean {
        return this.editedCosmonaut !== undefined && this.editedCosmonaut !== null;
    }

    /**
     * Called when form is submitted. Create or update cosmonaut and navigate to cosmonauts
     */
    onSubmit():void {
        if(this.isEdited()) {
            this.cosmonautService.updateCosmonaut(this.model)
                .then(() => {
                    this.router.navigate(['/cosmonauts']);
                    this.flashMessagesService.show('Kosmonaut byl upraven.', {
                        cssClass: 'alert-success',
                        timeout: 2000
                    });
                })
                .catch(e => this.flashMessagesService.show('Vyskytla se chyba při uložení kosmonauta. Chyba:(' + e._body.error + ')', {
                    cssClass: 'alert-danger',
                    timeout: 4000
                }));
        } else {
            this.cosmonautService.createCosmonaut(this.model)
                .then(() => {
                    this.router.navigate(['/cosmonauts']);
                    this.flashMessagesService.show('Kosmonaut byl vytvořen.', {
                        cssClass: 'alert-success',
                        timeout: 2000
                    });
                })
                .catch(e => this.flashMessagesService.show('Vyskytla se chyba při vytvoření kosmonauta. Chyba:(' + e._body.error + ')', {
                    cssClass: 'alert-danger',
                    timeout: 4000
                }));
        }
    }

    /**
     * Navigate to previous page
     */
    goBack(): void {
        this.location.back();
    }
}
