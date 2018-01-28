import { Ingredient } from './../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface AppState {
  shoppingList: State;
}

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions): State {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.concat((<ShoppingListActions.AddIngredient>action).payload)
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: state.ingredients.concat((<ShoppingListActions.AddIngredients>action).payload)
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients
          .map((ingredient, index) => {
            if (state.editedIngredientIndex === index) {
              return (<ShoppingListActions.UpdateIngredient>action).payload;
            }
            return ingredient;
          }),
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients
          .filter((ingredient, index) => index !== state.editedIngredientIndex),
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredient: { ...state.ingredients[(<ShoppingListActions.StartEdit>action).payload] },
        editedIngredientIndex: (<ShoppingListActions.StartEdit>action).payload
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }
}
