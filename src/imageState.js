import {images} from './getData';

const initialState = {
    images: [...images],
    titleQuery: "",
    minWidth: 0,
    maxWidth: 1000000,
    minHeight: 0,
    maxHeight: 1000000,
    isFirstRender: true
};

const State = {
    filteredList: () => {
        if (initialState.isFirstRender) {
            initialState.isFirstRender = false;
            return [...initialState.images]
        } else {
            let result = [...initialState.images];
            result = result.filter(item => {
                return item.width >= initialState.minWidth && item.width <= initialState.maxWidth && item.height >= initialState.minHeight && item.height <= initialState.maxHeight;

            });
            result = (initialState.titleQuery.length === 0) ? result : result.filter(item => item.title.toLowerCase().includes(initialState.titleQuery));
            return result;
        }

    },
    setState: (query, queryValue) => initialState[query] = queryValue,
    resetState: () => {
        initialState.images = [...images];
        initialState.titleQuery = "";
        initialState.minWidth = 0;
        initialState.maxWidth = 1000000;
        initialState.minHeight = 0;
        initialState.maxHeight = 1000000;
        initialState.isFirstRender = true;
    }
}

Object.freeze(State);

export default State;