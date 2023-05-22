import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {LocalStorageKeys} from "../constants/local-storage.constants";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkTheme$ = new BehaviorSubject<boolean>(false);

  initTheme() {
    this.isDarkTheme$.next(!!localStorage.getItem(LocalStorageKeys.Theme));
  }

  toggleTheme() {

    if(localStorage.getItem(LocalStorageKeys.Theme)) {
      localStorage.removeItem(LocalStorageKeys.Theme);
      this.isDarkTheme$.next(false);
    } else {
      localStorage.setItem(LocalStorageKeys.Theme, 'dark');
      this.isDarkTheme$.next(true);
    }

  }
}
