import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FilmService } from '../film.service';
import { Film } from '../../film';
import { SortOption } from '../../sort-option';
import { FilmItemComponent } from '../film-item/film-item.component';

@Component({
  selector: '.films',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {
  filmsData: Film[];

  sortOption: any;
  counter: number = 0;
  favoriteFilmsCount: number = 0;

  // sortOptions: SortOption[] = [
  //   { value: 1, description: 'По алфавиту: A-Z' },
  //   { value: -1, description: 'По алфавиту: Z-A' }
  // ];



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
    let result: any;
    console.log("Hook Parent, Инициализация родительского компонента")
    // this.filmsData = this.filmsService.getFilms();
    this.filmsService.getPopularFilms().subscribe(
      (filmList: any) => {
        console.log(filmList.results);

        filmList.results.map((result) => {
          this.filmsService.films.push({

            id: result.id,
            isFavorite: false,
            //  vote_average: result.vote_average,
            title: result.title,
            popularity: result.popularity,
            release_date: result.release_date,
            overview: result.overview.slice(0, 130),
            poster_path: `${this.filmsService.midImgPath}${result.poster_path}`

          })
        })
        console.log(this.filmsService.films);
        console.log(filmList.results);
        this.filmsData = this.filmsService.getFilms();


      })
  }
  sortOptions: SortOption[] = [
    { value: 1, description: 'Фильмы' },
    { value: -1, description: 'Актеры' }
  ];

  sortFilms(arr: Film[], numDirect: number): Film[] {
    return arr.sort((a, b) => {
      let x = a.title.toLowerCase();
      let y = b.title.toLowerCase();
      if (x < y) { return -1 * numDirect; }
      if (x > y) { return numDirect; }
      return 0;
    })
  }

  sortFilmCards() {
    this.filmsData = (this.sortOption === "default")
      ? this.filmsService.getFilms()
      : this.sortFilms(this.filmsData, this.sortOption);
  }

  makeStar(film: Film) {
    film.isFavorite = !film.isFavorite;
    let favoriteFilms = this.filmsData.filter(item => item.isFavorite);
    this.favoriteFilmsCount = favoriteFilms.length;
  }
}
