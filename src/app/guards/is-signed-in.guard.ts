import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {LocalStorageKeys} from "../constants/local-storage.constants";

@Injectable({
  providedIn: 'root'
})
export class IsSignedInGuard {
  constructor(
    private router: Router
  ) { }
  canActivate(): boolean {
    if (localStorage.getItem(LocalStorageKeys.Tokens)) {
      this.router.navigate(['/courses'],{ replaceUrl: true });
      return false;
    }
    return true;
  }
}
