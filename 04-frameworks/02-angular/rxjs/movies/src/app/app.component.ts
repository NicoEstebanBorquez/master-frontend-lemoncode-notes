import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { concatMap, delay, of, range } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  pageTitle = 'movies';

  ngOnInit(): void {
    // range(1, 5)
    //   .pipe(
    //     concatMap((i) => of(i).pipe(delay(this.randomDelay())))
    //   ).subscribe((i) => console.log('concatMap:', i));
  }

  private randomDelay() {
    return Math.floor(Math.random() * 1000) + 500;
  }

}
