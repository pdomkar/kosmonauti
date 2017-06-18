import { Component, OnInit } from '@angular/core';
import { Cosmonaut } from './../cosmonaut';
import { ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CosmonautService } from './../services/cosmonaut.service';

@Component({
    selector: 'pd-cosmonaut-edit',
    templateUrl: './cosmonaut-edit.component.html'
})

export class CosmonautEditComponent implements OnInit {
    editedCosmonaut: Cosmonaut;

    constructor(
        private route: ActivatedRoute,
        private cosmonautService:CosmonautService,
        private flashMessagesService:FlashMessagesService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.cosmonautService.getCosmonaut(+params['id'])
                .then(cn => this.editedCosmonaut = cn)
                .catch(e => this.flashMessagesService.show('Vyskytla se chyba při načítání formuláře na úpravu kosmonauta. Chyba:(' + e._body.error + ')', {
                    cssClass: 'alert-danger',
                    timeout: 4000
                }));
        });
    }
}
