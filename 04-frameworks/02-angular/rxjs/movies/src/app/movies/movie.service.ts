import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Movie } from './movie';
import { catchError, EMPTY, map, Observable, of, shareReplay, switchMap, tap, throwError } from 'rxjs';
import { HttpErrorService } from '../utilities/http-error.service';
import { ReviewService } from '../reviews/review.service';
import { Review } from '../reviews/review';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private moviesUrl = 'api/movies';

  http = inject(HttpClient);
  errorService = inject(HttpErrorService);
  reviewService = inject(ReviewService);

  readonly movies$ = this.http.get<Movie[]>(this.moviesUrl)
    .pipe(
      tap((x) => console.log('dentro de tap movies$ (movieService)', x)),
      shareReplay(),
      tap((x) => console.log('despues de shareReplay')),
      catchError((err) => this.handleError(err))
    );

  // getMovies(): Observable<Movie[]> {
  //   return this.http.get<Movie[]>(this.moviesUrl)
  //     .pipe(
  //       tap(() => console.log('dentro de tap getMovies')),
  //       catchError((err) => this.handleError(err))
  //     );
  // }

  getMovie(id: string): Observable<Movie> {
    const movieUrl = `${this.moviesUrl}/${id}`;
    return this.http.get<Movie>(movieUrl)
      .pipe(
        switchMap((m) => this.getMovieWithReviews(m)),
        catchError((err) => this.handleError(err))
      );
  }

  private getMovieWithReviews(movie: Movie): Observable<Movie> {
    if (movie.hasReviews) {
      this.http.get<Review[]>(this.reviewService.getReviewUrl(movie.id))
        .pipe(
          map((reviews) => ({
            ...movie,
            reviews
          }) as Movie));
    }
    return of(movie);
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    const formatted = this.errorService.formatError(err);
    return throwError(() => formatted);
  }

}
