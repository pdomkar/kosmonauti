import { Component, OnInit, ViewChild ,ElementRef} from '@angular/core';
import { Cosmonaut } from './../cosmonaut';
import { CosmonautService } from './../services/cosmonaut.service'

@Component({
    selector: 'pd-cosmonauts',
    templateUrl: './cosmonauts.component.html',
    styleUrls: ['./cosmonauts.component.css'],
})

export class CosmonautsComponent implements OnInit {
    cosmonauts: Cosmonaut[];
    totalItems: number = 0;
    itemPerPage: number = 10;
    currentPage: number = 1;
    orderName: string = 'name';
    orderType: string = 'ASC';

    constructor(private cosmonautService: CosmonautService) {  }

    ngOnInit(): void {
        this.cosmonautService.getCosmonauts()
            .then(data => this.totalItems = data.length);
            this.loadCosmonauts();
    }

    /**
     * Load apropriate cosmonauts by setted page
     */
    loadCosmonauts(): void {
        this.cosmonautService.getCosmonautsOrderLimit(this.orderName, this.orderType, (this.currentPage-1)*this.itemPerPage, this.itemPerPage)
            .then(data => {
                this.cosmonauts = data;
            });
    }

    /**
     * Delete pass cosmonaut using cosmonautService after confirm
     * @param cosmonaut
     */
    deleteCosmonaut(cosmonaut:Cosmonaut): void {
        if(confirm("Opravdu chcete smazat kosmonauta "+cosmonaut.name + ' '+ cosmonaut.surname + '?')) {
            this.cosmonautService.deleteCosmonaut(cosmonaut.id)
                .then(() => {
                    this.loadCosmonauts();
                    this.totalItems--;
                });

        }
    }

    /**
     * Change view page and load Appropriate cosmonauts
     * Is called as Output of paginator class
     * @param page
     */
    setPage(page: number): void {
        this.currentPage = page;
        this.loadCosmonauts();
    }

    /**
     * Set sort attribute. If was set same attribute change type of order.
     * @param attribute by which we wil sort
     */
    setOrder(attribute: string) {
        if(this.orderName === attribute) {
            if(this.orderType === 'ASC') {
                this.orderType = 'DESC';
            } else {
                this.orderType = 'ASC';
            }
        } else {
            this.orderName = attribute;
            this.orderType = 'ASC';
        }
        this.loadCosmonauts();
    }
}
