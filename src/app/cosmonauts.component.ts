import { Component, OnInit } from '@angular/core';
import { Cosmonaut } from './cosmonaut';

@Component({
    selector: 'pd-cosmonauts',
    templateUrl: './cosmonauts.component.html'
})

export class CosmonautsComponent implements OnInit {
    cosmonauts: Cosmonaut[] = [{id:1, name: 'Vladimír', surname: 'Remek', born: new Date(1948, 9, 26), power: 'superview'}];
    ngOnInit(): void {

    }
}
