import { Component, EventEmitter, Input, OnInit, Output, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { Film } from '../../film';
import { Actor } from '../../actor';

@Component({
    selector: 'app-sort',
    templateUrl: './sort.component.html',
    styleUrls: ['./sort.component.css']
})
export class Sort implements OnInit {
    // @Input() film: Film;
    // @Input() actor: Actor;
    // @Input() counter: number;
    // @Output('star') starEmitter = new EventEmitter<Film>();
    inputFilm: string;

    constructor() {
    }
    ngOnInit() {
        console.log(5);
    }

}