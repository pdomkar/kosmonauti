import { Component, Input, OnChanges, AfterViewChecked, ViewChild} from '@angular/core';
import { Cosmonaut } from './../cosmonaut';
import { NgForm } from '@angular/forms';
import { CosmonautService } from './../services/cosmonaut.service'
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { Location }               from '@angular/common';
import {  VALIDATION_MESSAGE } from './validation-messages';
}

@Component({
    selector: 'pd-cosmonaut-add-edit-form',
    templateUrl: './cosmonaut-add-edit-form.component.html'
})

export class CosmonautAddEditFormComponent implements OnChanges, AfterViewChecked{
    @ViewChild('cosmonautForm') currentForm: NgForm;
    @Input() editedCosmonaut: Cosmonaut;
    cosmonautForm: NgForm;
    model: Cosmonaut = new Cosmonaut(null, '', '', null, '');
    private action: string = 'Vytvořit';
    private myDatePickerOptions: IMyDpOptions = { dateFormat: 'dd.mm.yyyy' };

    constructor(
        private location: Location,
        private router: Router,
        private cosmonautService: CosmonautService
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



    reset():void {
        this.model = new Cosmonaut(null, '', '',null, '');
    }
    setDefault():void {
        if(this.isEdited()) {
            this.model = Object.assign({}, this.editedCosmonaut);
        }
    }

    isEdited(): boolean {
        return this.editedCosmonaut !== undefined && this.editedCosmonaut !== null;
    }

    onSubmit():void {
        if(this.isEdited()) {
            this.cosmonautService.updateCosmonaut(this.model)
                .then(() => this.router.navigate(['/cosmonauts']));
        } else {
            this.cosmonautService.createCosmonaut(this.model)
                .then(() => this.router.navigate(['/cosmonauts']));
        }
    }

    goBack(): void {
        this.location.back();
    }
}
