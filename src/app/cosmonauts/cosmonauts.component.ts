import { Component, OnInit, ViewChild ,ElementRef} from '@angular/core';
import { Cosmonaut } from './../cosmonaut';
import { CosmonautService } from './../services/cosmonaut.service'

@Component({
    selector: 'pd-cosmonauts',
    templateUrl: './cosmonauts.component.html'
})

export class CosmonautsComponent implements OnInit {
    cosmonauts: Cosmonaut[];
    totalItems: number = 0;
    itemPerPage: number = 10;
    currentPage: number = 1;

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
        this.cosmonautService.getCosmonautsOrderLimit((this.currentPage-1)*this.itemPerPage, this.itemPerPage)
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
}
