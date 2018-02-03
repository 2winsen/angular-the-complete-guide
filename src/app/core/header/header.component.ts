import 'rxjs/add/operator/do';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { RecipeService } from '../../recipes/recipe.service';
import { DataStorageService } from '../../shared/data-storage.service';
import * as AuthActions from './../../auth/store/auth.actions';
import * as fromAuth from './../../auth/store/auth.reducers';
import * as RecipeActions from './../../recipes/store/recipe.action';
import * as fromApp from './../../store/app.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  status = '';
  authState$: Observable<fromAuth.State>;

  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private router: Router,
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit() {
    this.authState$ = this.store.select('auth');
  }

  private success() {
    this.status = 'SUCCESS';
    this.hideStatus();
  }

  private error() {
    this.status = 'ERROR';
    this.hideStatus();
  }

  private hideStatus() {
    setTimeout(() => this.status = '', 2000);
  }

  onSaveData() {
    this.dataStorageService.storeRecipes(this.recipeService.getRecipes())
      .subscribe(
      (response) => {
        console.log(response);
        this.success();
      },
      (error) => {
        console.log(error);
        this.error();
      });
  }

  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());

    // this.dataStorageService.getRecipes()
    //   .do((recipes: Recipe[]) => this.recipeService.setRecipes(recipes))
    //   .subscribe(() => this.success(), (error) => {
    //     console.log(error);
    //     this.error();
    //   });
  }

  onLogout() {
    this.store.dispatch(new AuthActions.TryLogout());
  }

}
