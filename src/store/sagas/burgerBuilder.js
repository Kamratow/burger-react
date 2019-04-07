import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
// I'd change the name from axios to something more generic, like Api, or HTTP

import * as actions from '../actions';

export function* initIngredientsSaga(action) {
    try {
        const response = yield axios.get('/ingredients.json');
        yield put(actions.setIngredients(response.data));
    } catch(error) {
        yield put(actions.fetchIngredientsFailed())
    }
}