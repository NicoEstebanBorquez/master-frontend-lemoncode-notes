import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { catchError, EMPTY, of, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [NgIf, NgClass, NgFor, MovieDetailComponent, AsyncPipe],
  templateUrl: './movie-list.component.html',
  styles: ``
})
export class MovieListComponent {
 

  // Just enough here for the template to compile
  pageTitle = 'Movies';
  errorMessage = '';
  sub!: Subscription;

  private movieService = inject(MovieService);
  readonly movies$ = this.movieService.movies$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  // Selected movie id to highlight the entry
  selectedMovieId: number = 0;

  onSelected(movieId: number): void {
    this.selectedMovieId = movieId;
  }
}
