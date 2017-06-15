import { Component, OnInit } from '@angular/core';
import { Cosmonaut } from './../cosmonaut';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { CosmonautService } from './../services/cosmonaut.service';

@Component({
    selector: 'pd-cosmonaut-edit',
    templateUrl: './cosmonaut-edit.component.html'
})

export class CosmonautEditComponent implements OnInit {
    editedCosmonaut: Cosmonaut;
    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private cosmonautService: CosmonautService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.cosmonautService.getCosmonaut(+params['id'])
                .then(cn => this.editedCosmonaut = cn);
        });
    }

    goBack(): void {
        this.location.back();
    }
}
