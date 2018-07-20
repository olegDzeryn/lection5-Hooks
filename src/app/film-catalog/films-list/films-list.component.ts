import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FilmService } from '../film.service';
import { Film } from '../../film';
import { SortOption } from '../../sort-option';
import { FilmItemComponent } from '../film-item/film-item.component';
//import { A } from '../actor-item/actor-item.component';
import { X } from '../x/x.component';
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





  // Получаем доступ к дочернему компоненту напрямую используя ViewChild
  @ViewChild(FilmItemComponent) filmItem: FilmItemComponent;

  // Получаем доступ к списку дочерних компонентов напрямую используя ViewChildred
  @ViewChildren(FilmItemComponent) films: QueryList<FilmItemComponent>;


  constructor(public filmsService: FilmService) {
  }

  ngAfterViewInit() {
    console.log("Hook Parent, Все дочерние компоненты отрендерены");
  }

  directUpdateChildren() {
    console.log("вызываем логику дочернего компонента напрямую");
    let result = this.filmItem.showFilmInfo();
    console.log(result);
  }

  directUpdateAllChildren() {
    console.log("вызываем логику в каждом дочернем компоненте")
    this.films.forEach(item => {
      item.showFilmInfo();
    });
  }

  count() {
    this.counter++;
  }

  ngOnInit() {

    console.log("Hook Parent, Инициализация родительского компонента")

    this.filmsService.getPopularFilms().subscribe(
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
        console.log(this.filmsData);
      })

    this.filmsService.getPopularActor().subscribe(
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
        console.log(this.actorsData);
      })

  }
  sortOptions: SortOption[] = [
    { value: 1, description: 'Фильмы' },
    { value: -1, description: 'Актеры' }
  ];

  // sortFilms(arr: Film[], numDirect: number): Film[] {
  //   return arr.sort((a, b) => {
  //     let x = a.title.toLowerCase();
  //     let y = b.title.toLowerCase();
  //     if (x < y) { return -1 * numDirect; }
  //     if (x > y) { return numDirect; }
  //     return 0;
  //   })
  // }
  sortElement(arr: Film[], numDirect: number): any {
    numDirect === 1 ? this.filmsService.getFilms : console.log(111);
  }



  sortFilmCards() {
    (this.sortOption === -1) ? this.variantDisplay = true : this.variantDisplay = false;


  }


  makeStar(film: Film) {
    film.isFavorite = !film.isFavorite;
    let favoriteFilms = this.filmsData.filter(item => item.isFavorite);
    this.favoriteFilmsCount = favoriteFilms.length;
  }
}
