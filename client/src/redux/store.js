import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import reducers from './reducers';

export function configureStore(initialState) {

    const store = createStore(
        reducers,
        initialState,
        devToolsEnhancer()
    );

    return store;
}
