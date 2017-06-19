import { Component, OnInit, ViewChild ,ElementRef} from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
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
    orderName:string = 'id';
    orderType: string = 'ASC';

    constructor(private cosmonautService:CosmonautService,
                private flashMessagesService:FlashMessagesService) {
    }

    ngOnInit(): void {
        this.cosmonautService.getCosmonauts()
            .then(data => {
                this.totalItems = data.length;
                this.loadCosmonauts();
            })
            .catch(e => console.log(e));
    }

    /**
     * Load apropriate cosmonauts by setted page
     */
    loadCosmonauts(): void {
        this.cosmonautService.getCosmonautsOrderLimit(this.orderName, this.orderType, (this.currentPage-1)*this.itemPerPage, this.itemPerPage)
            .then(data => {
                this.cosmonauts = data;
            })
            .catch(e => this.flashMessagesService.show('Vyskytla se chyba při načítání kosmonautů. Chyba:(' + e._body.error + ')', {
                cssClass: 'alert-danger',
                timeout: 4000
            }));
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
                    this.flashMessagesService.show('Kosmonaut byl vymazán', {cssClass: 'alert-success', timeout: 2000});
                })
                .catch(e => this.flashMessagesService.show('Vyskytla se chyba při mazání kosmonauta. Chyba:(' + e._body.error + ')', {
                    cssClass: 'alert-danger',
                    timeout: 4000
                }));

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
