import { Component, EventEmitter, Input, OnInit, Output, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { Film } from '../../film';
import { Actor } from '../../actor';
import { FilmService } from '../film.service';

@Component({
    selector: 'app-search-films',
    templateUrl: './search-component.html',
    styleUrls: ['./search-component.css']
})
export class SearchComponent implements OnInit {
    @Input() filmsData: Film[];
    @Input() actorsData: Actor[];

    inputFilm: string;
    inputActor: string;
    filmsDataSearch: Film[];
    actorsDataSearch: Actor[];

    constructor() {
    }


    sortOneFilm(inp?: string) {
        this.filmsDataSearch = (inp) ? this.filmsData.filter(film => film.title.toLowerCase().
            includes(inp.toLowerCase()) && film.title.toLowerCase().substring(0, 1) === inp.toLowerCase().
                substring(0, 1)) : this.filmsData;
    }
    sortOneActor(inp?: string) {
        this.actorsDataSearch = (inp) ? this.actorsData.filter(actor => actor.name.toLowerCase().
            includes(inp.toLowerCase()) && actor.name.toLowerCase().substring(0, 1) === inp.toLowerCase().
                substring(0, 1)) : this.actorsData;
    }


    ngOnInit() {


    }

    //   ngOnChanges(changes: SimpleChanges) {
    //     console.log("Hook Child, Проперти в дочернем компоненте поменялись");
    //     console.dir(changes);
    //     for (let key in changes) {
    //       console.log(`ключ = ${key}`)
    //       console.log(`            текущее значение = `);
    //       console.dir(changes[key].currentValue)
    //       console.log(`            предыдущее значение = `)
    //       console.dir(changes[key].previousValue)
    //     }
    //   }

    //   ngAfterContentInit() {
    //     console.log("Hook Child, Внешний контент установлен в дочерний компонент");
    //   }


    //   startFilm(film: Film) {
    //     this.starEmitter.emit(film);
    //   }

    //   showFilmInfo() {
    //     console.log(this.film);
    //     return true;
    //   }

}