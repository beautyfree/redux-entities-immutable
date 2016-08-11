# Redux Entities Immutable

[![build status](https://img.shields.io/travis/beautyfree/redux-entities-immutable/master.svg?style=flat-square)](https://travis-ci.org/beautyfree/redux-entities-immutable)
[![npm version](https://img.shields.io/npm/v/redux-entities-immutable.svg?style=flat-square)](https://www.npmjs.com/package/redux-entities-immutable)

Higher-order reducer for store entities received from gaearon's [normalizr](https://github.com/gaearon/normalizr) and makes it easy to handle them.

### Installation

```
npm install --save redux-entities-immutable
```

## Usage

WIP

### Use with `entitiesReducer`
```js
import { combineReducers } from 'redux';
import { entitiesReducer } from 'redux-entities-immutable';
import omit from 'lodash/object/omit';

function contacts(state = {}, action) {

    const { type, /* , payload */ meta } = action;

    switch (type) {

    case UPDATE_CONTACT:
    case REMOVE_CONTACT:
        return Object.assign({}, state, { [payload.id]: {
            ...state[payload.id],
            isPending: true
        } });

    case UPDATE_CONTACT_SUCCESS:
        return Object.assign({}, state, { [payload.id]: {
            ...state[payload.id],
            isPending: false
        } });

        // return merge({}, state, { [meta.id]: { isPending: false } });

    case REMOVE_CONTACT_SUCCESS:
        return omit(state, meta.id);

    default:
        return state;
    }
}

export default combineReducers({
    contacts: entitiesReducer(contacts, 'contacts')
});

```

### Use with `combineEntitiesReducers`
```js
import { combineEntitiesReducers } from 'redux-entities-immutable';
import { contacts, groups, images, notes } from './entities'

export default combineEntitiesReducers({
    contacts,
    groups,
    images,
    notes
});

```
