import { Component, OnInit } from '@angular/core';
import { Cosmonaut } from './../cosmonaut';
import { Location }               from '@angular/common';

@Component({
    selector: 'pd-cosmonaut-add',
    templateUrl: './cosmonaut-add.component.html'
})

export class CosmonautAddComponent implements OnInit {
    constructor(
        private location: Location
    ) {}

    ngOnInit(): void {

    }

    goBack(): void {
        this.location.back();
    }
}
