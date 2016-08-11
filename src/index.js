import { isFunction, mapValues } from 'lodash';

function selectEntities(action, name) {
  if (action.payload && action.payload.entities && action.payload.entities[name]) {
    return action.payload.entities[name];
  }
  return null;
}

export function entitiesReducer(reducer, entitiesName) {
  return (state, action) => {
    let newState = state;
    const entities = isFunction(entitiesName) ? entitiesName(action) : selectEntities(action, entitiesName);

    if (entities) {
      newState = newState.merge(entities);
    }

    return reducer(newState, action);
  };
}

export function combineEntitiesReducers(reducers) {
  const entitiesReducers = mapValues(reducers, entitiesReducer);
  return (state = {}, action) => mapValues(entitiesReducers,
    (reducer, key) => reducer(state[key], action)
  );
}
