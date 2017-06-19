import { Component } from '@angular/core';

@Component({
    selector: 'pd-page-not-found',
    template: '<div class="alert alert-warning">Požadováná stránka nebyla nalezena. Přejděte na <a routerLink="\">seznam kosmonautů</a></div>',
})
export class PageNotFoundComponent {
}
