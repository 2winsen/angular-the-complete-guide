import 'rxjs/add/operator/switchMap';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { Configs } from '../../configs';
import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.action';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap(() => this.httpClient.get<Recipe[]>(`${Configs.FIREBASE_URL}/recipes.json`))
    .filter((recipes: Recipe[]) => !!recipes)
    .map((recipes) =>
      recipes
        .reduce((acc, curr) => {
          if (!curr.ingredients) {
            curr.ingredients = [];
          }
          return acc.concat(curr);
        }, [])
    )
    .map((recipes: Recipe[]) => ({
      type: RecipeActions.SET_RECIPES,
      payload: recipes
    }));

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient
  ) { }

}
