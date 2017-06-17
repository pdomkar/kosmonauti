import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Paginator } from './paginator';
@Component({
    selector: 'pd-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.css'],
})

export class PaginatorComponent implements OnInit {
    paginator: Paginator;

    @Input() totalItems: number;
    @Input() itemPerPage: number;
    @Output() onSetPage = new EventEmitter<number>();

    ngOnInit() {
        this.paginator = new Paginator(1, 1, this.itemPerPage);
        this.paginator.totalPages = Math.ceil(this.totalItems / this.paginator.itemPerPage);
    }

    setPage(page:number):void {
        this.paginator.currentPage = page;
        this.onSetPage.emit(this.paginator.currentPage);
    }
}
