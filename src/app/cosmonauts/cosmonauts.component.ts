import { Component, OnInit } from '@angular/core';
import { Cosmonaut } from './../cosmonaut';
import { CosmonautService } from './../services/cosmonaut.service'

@Component({
    selector: 'pd-cosmonauts',
    templateUrl: './cosmonauts.component.html'
})

export class CosmonautsComponent implements OnInit {
    cosmonauts: Cosmonaut[];

    constructor(private cosmonautService: CosmonautService) {}

    ngOnInit(): void {
        this.cosmonautService.getCosmonauts()
            .then(data => this.cosmonauts = data);
    }

    deleteCosmonaut(cosmonaut:Cosmonaut): void {
        this.cosmonautService.deleteCosmonaut(cosmonaut.id)
            .then(() => this.cosmonauts = this.cosmonauts.filter(cn => cn !== cosmonaut));
    }
}
