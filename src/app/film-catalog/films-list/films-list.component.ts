import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FilmService } from '../film.service';
import { Film } from '../../film';
import { SortOption } from '../../sort-option';
import { FilmItemComponent } from '../film-item/film-item.component';
//import { A } from '../actor-item/actor-item.component';
import { SearchComponent } from '../search-component/search-component';
import { Sort } from '../sort/sort.component';
import { Actor } from '../../actor';

@Component({
  selector: '.films',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {
  filmsData: Film[];
  actorsData: Actor[];

  sortOption: any;
  counter: number = 0;
  favoriteFilmsCount: number = 0;
  variantDisplay: boolean = false;

  pageFilms: number = 1;
  pageActors: number = 1;

  douloud: string = 'Загрузить еще'





  // Получаем доступ к дочернему компоненту напрямую используя ViewChild
  @ViewChild(Sort) sortItem: Sort;

  sortOneFilm(inp?: string) {
    this.filmsData = (inp) ? this.filmsService.films.filter(film => film.title.toLowerCase().
      includes(inp.toLowerCase()) && film.title.toLowerCase().substring(0, 1) === inp.toLowerCase().
        substring(0, 1)) : this.filmsService.films;
  }



  // directUpdateAllChildren() {
  //   console.log("вызываем логику в каждом дочернем компоненте")
  //   this.films.forEach(item => {
  //     item.showFilmInfo();
  //   });
  // }

  count() {
    this.counter++;
  }
  initGetPopularFilms() {

    this.filmsService.getPopularFilms(this.pageFilms).subscribe(
      (filmList: any) => {
        console.log(filmList.results);

        filmList.results.map((result) => {
          this.filmsService.films.push({

            id: result.id,
            isFavorite: false,

            title: result.title,
            popularity: result.popularity,
            release_date: result.release_date,
            overview: result.overview.slice(0, 130),
            poster_path: `${this.filmsService.midImgPath}${result.poster_path}`

          })
        })
        this.filmsData = this.filmsService.getFilms();
      })

  }
  initGetPopularActors() {
    this.filmsService.getPopularActor(this.pageActors).subscribe(
      (filmList: any) => {
        console.log(filmList.results);

        filmList.results.map((result) => {
          this.filmsService.actors.push({

            id: result.id,
            adult: false,
            name: result.name,
            popularity: result.popularity,

            profile_path: `${this.filmsService.midImgPath}${result.profile_path}`

          })
        })
        this.actorsData = this.filmsService.getActors();

      })
  }

  ngOnInit() {

    console.log("Hook Parent, Инициализация родительского компонента")
    this.initGetPopularFilms();
    this.initGetPopularActors();


  }
  sortOptions: SortOption[] = [
    { value: 1, description: 'Фильмы' },
    { value: -1, description: 'Актеры' }
  ];


  sortElement(arr: Film[], numDirect: number): any {
    numDirect === 1 ? this.filmsService.getFilms : console.log(111);
  }



  sortFilmCards() {
    (this.sortOption === -1) ? this.variantDisplay = true : this.variantDisplay = false;


  }
  setPagingFilms() {
    this.pageFilms++;
    this.initGetPopularFilms();
  }

  setPagingActors() {
    this.pageActors++;
    this.initGetPopularActors();
  }

  constructor(public filmsService: FilmService) {
  }

  ngAfterViewInit() {
    console.log("Hook Parent, Все дочерние компоненты отрендерены");
  }

}
