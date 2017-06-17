import { Component, OnInit, OnChanges Input, Output, EventEmitter} from '@angular/core';
import { Paginator } from './paginator';
@Component({
    selector: 'pd-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.css'],
})

export class PaginatorComponent implements OnInit {
    paginator:Paginator;
    constructor() {
    }
    @Input() totalItems: number;
    @Input() itemPerPage: number;
    @Output() onSetPage = new EventEmitter<number>();

    ngOnChanges(): void {
        this.paginator = new Paginator(1, 1, this.itemPerPage); //TODO NEVYTAVERE PRI KAZDE ZMENE
        this.paginator.totalPages = Math.ceil(this.totalItems / this.paginator.itemPerPage);
    }


    setPage(page:number):void {
        this.paginator.currentPage = page;
        this.onSetPage.emit(this.paginator.currentPage);
    }

}
