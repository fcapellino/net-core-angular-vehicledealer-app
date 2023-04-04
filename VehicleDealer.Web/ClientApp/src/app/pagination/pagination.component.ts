import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
    selector: 'pagination',
    template: `
	<style>
		.pagination>.active>a { background-color: #55acee; }
	</style>
        <ul class="pagination" style="margin:0px;">
            <li [class.disabled]="currentPage == 1" style="cursor:pointer;">
                <a (click)="previous()" aria-label="Previous">
					<span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li [class.active]="currentPage == page" *ngFor="let page of pages" (click)="changePage(page)" style="cursor:pointer;">
                <a>{{ page }}</a>
            </li>
            <li [class.disabled]="currentPage == pages.length" style="cursor:pointer;">
                <a (click)="next()" aria-label="Next">
					<span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
`
})

export class PaginationComponent implements OnChanges {
    @Input('total-items') totalItems
    @Input('page-size') pageSize = 10
    @Output('page-changed') pageChanged = new EventEmitter()
    pages: any[]
    currentPage = 1

    ngOnChanges() {
        this.currentPage = 1
        var pagesCount = Math.ceil(this.totalItems / this.pageSize)
        this.pages = []
        for (var i = 1; i <= pagesCount; i++) {
            this.pages.push(i)
        }
    }

    changePage(page) {
        if (this.currentPage !== page) {
            this.currentPage = page
            this.pageChanged.emit(page)
        }
    }

    previous() {
        if (this.currentPage == 1) {
            return
        }

        this.currentPage--
        this.pageChanged.emit(this.currentPage)
    }

    next() {
        if (this.currentPage == this.pages.length) {
            return
        }

        this.currentPage++
        this.pageChanged.emit(this.currentPage)
    }
}
