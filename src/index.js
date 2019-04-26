import './index.scss';
// import {images} from './getData';
import {createGallery} from './createGallery';
import {sliderMaxAndMin} from './getMinAndMaxSizes';
import State from './imageState';

const root = document.getElementById('root');
const images = State.filteredList();

const rowSlider = document.getElementById('rowsCount');
const rowSliderLabel = document.querySelector('.rowsSlider-slider-label');
const nextRowSlider = document.querySelector('.rowsSlider-control-next');
const prevRowSlider = document.querySelector('.rowsSlider-control-prev');

const queryByTitle = document.getElementById('filterByTitle');

const filterByWidthFrom = document.getElementById('widthFilterFrom');
const filterByWidthTo = document.getElementById('widthFilterTo');
const filterByHeightFrom = document.getElementById('heightFilterFrom');
const filterByHeightTo = document.getElementById('heightFilterTo');
const filterByWidthFromLabel = document.querySelector('.widthFrom-label');
const filterByWidthToLabel = document.querySelector('.widthTo-label');
const filterByHeightFromLabel = document.querySelector('.heightFrom-label');
const filterByHeightToLabel = document.querySelector('.heightTo-label');
const filterByWidthFromPrev = document.querySelector('.widthFromSlider-control-prev');
const filterByWidthFromNext = document.querySelector('.widthFromSlider-control-next');
const filterByWidthToPrev = document.querySelector('.widthToSlider-control-prev');
const filterByWidthToNext = document.querySelector('.widthToSlider-control-next');
const filterByHeightFromPrev = document.querySelector('.heightFromSlider-control-prev');
const filterByHeightFromNext = document.querySelector('.heightFromSlider-control-next');
const filterByHeightToPrev = document.querySelector('.heightToSlider-control-prev');
const filterByHeightToNext = document.querySelector('.heightToSlider-control-next');
const filtersResult = document.querySelector('.filtersImagesResult');

const resetFilters = document.querySelector('.resetFilters');
const getScreenSize = () => ({
    // width: (window.innerWidth >=0) ? window.innerWidth : screen.width,
    height: (window.innerHeight >= 0) ? window.innerHeight : screen.height,
    width: root.clientWidth
});

const getFilteredByTitle = (titleQuery) => {
    const imagesCount = document.querySelectorAll('#root img').length;
    State.setState("titleQuery", titleQuery);
    const filteredImages = State.filteredList();
    if (imagesCount === filteredImages.length) return;
    (filteredImages.length === 0) ? root.innerHTML = `Sorry.... No matches....`
        : createGallery(getScreenSize(), filteredImages, rowSlider.value, root);
    filtersResult.innerText = filteredImages.length;
};

const rowSliderActions = (sliderValue) => {
    createGallery(getScreenSize(), State.filteredList(), sliderValue, root);
}

const sizeSliderActions = () => {
    const minWidthQuery = Number(filterByWidthFrom.value);
    const maxWidthQuery = Number(filterByWidthTo.value);
    const minHeightQuery = Number(filterByHeightFrom.value);
    const maxHeightQuery = Number(filterByHeightTo.value);
    if (minWidthQuery > maxWidthQuery || minHeightQuery > maxHeightQuery) console.error('impossible conditions');
    const imagesCount = document.querySelectorAll('#root img').length;
    State.setState("minWidth", minWidthQuery);
    State.setState("maxWidth", maxWidthQuery);
    State.setState("minHeight", minHeightQuery);
    State.setState("maxHeight", maxHeightQuery);
    const filteredImages = State.filteredList();
    if (imagesCount === filteredImages.length) return;
    (filteredImages.length === 0) ? root.innerHTML = `Sorry.... No matches....`
        : createGallery(getScreenSize(), filteredImages, rowSlider.value, root);
    filtersResult.innerHTML = filteredImages.length;
}

const sliderEvents = (sliderNode, sliderLabel, sliderControlPrev, sliderControlNext, controlStep, sliderActions) => {
    let nowSliderValue = sliderNode.value;
    let sliderIsMousedown = false;
    sliderNode.addEventListener('change', function (e) {
        const sliderValue = e.target.value;
        if (nowSliderValue !== sliderValue) {
            sliderLabel.innerHTML = sliderValue;
            sliderActions(sliderValue);
            nowSliderValue = sliderValue;
        }
    });
    sliderNode.addEventListener('mousedown', () => {
        sliderIsMousedown = true
    });
    sliderNode.addEventListener('mousemove', function (e) {
        if (!sliderIsMousedown) return;
        const sliderValue = e.target.value;
        if (sliderValue !== nowSliderValue) {
            sliderLabel.innerHTML = sliderValue;
            sliderActions(sliderValue);
            nowSliderValue = sliderValue;
        }
    });
    sliderNode.addEventListener('mouseup', () => {
        sliderIsMousedown = false
    });
    sliderNode.addEventListener('mouseenter', () => {
        document.querySelector('body').style.overflow = 'hidden';
    });
    sliderNode.addEventListener('mouseout', () => {
        document.querySelector('body').style.overflow = 'unset';
    })
    sliderNode.addEventListener('wheel', (e) => {
        const sliderValue = (e.wheelDelta > 0) ? String(Number(sliderNode.value) + controlStep)
            : String(Number(sliderNode.value) - controlStep);
        sliderNode.value = sliderValue;
        sliderLabel.innerHTML = sliderValue;
        sliderActions(sliderValue);
        nowSliderValue = sliderNode.value;
    });
    sliderControlPrev.addEventListener('click', function (e) {
        const sliderValue = String(Number(sliderNode.value) - controlStep);
        sliderNode.value = sliderValue;
        sliderLabel.innerHTML = sliderValue;
        sliderActions(sliderValue);
        nowSliderValue = sliderNode.value;
    });
    sliderControlNext.addEventListener('click', function (e) {
        const sliderValue = Number(sliderNode.value) + controlStep;
        sliderNode.value = sliderValue;
        sliderLabel.innerHTML = sliderValue;
        sliderActions(sliderValue);
        nowSliderValue = sliderNode.value;
    });
};

const setSizeForSlider = (min, max, ...targets) => {
    targets.forEach(item => {
        item.setAttribute('min', min);
        item.setAttribute('max', max);
    });
}

const sizesFilterInitialState = () => {
    const intervalSizes = setInterval(() => {
        if (Object.values(sliderMaxAndMin).length > 0) {
            setSizeForSlider(sliderMaxAndMin.minWidth, sliderMaxAndMin.maxWidth, filterByWidthFrom, filterByWidthTo);
            setSizeForSlider(sliderMaxAndMin.minHeight, sliderMaxAndMin.maxHeight, filterByHeightFrom, filterByHeightTo);
            filterByWidthFromLabel.innerHTML = sliderMaxAndMin.minWidth;
            filterByWidthToLabel.innerHTML = sliderMaxAndMin.maxWidth;
            filterByHeightFromLabel.innerHTML = sliderMaxAndMin.minHeight;
            filterByHeightToLabel.innerHTML = sliderMaxAndMin.maxHeight;
            filterByWidthFrom.value = sliderMaxAndMin.minWidth;
            filterByWidthTo.value = sliderMaxAndMin.maxWidth;
            filterByHeightFrom.value = sliderMaxAndMin.minHeight;
            filterByHeightTo.value = sliderMaxAndMin.maxHeight;
            clearInterval(intervalSizes);
        }
    }, 100);
}

sizesFilterInitialState();

sliderEvents(rowSlider, rowSliderLabel, prevRowSlider, nextRowSlider, 1, rowSliderActions);
sliderEvents(filterByWidthFrom, filterByWidthFromLabel, filterByWidthFromPrev, filterByWidthFromNext, 10, sizeSliderActions);
sliderEvents(filterByWidthTo, filterByWidthToLabel, filterByWidthToPrev, filterByWidthToNext, 10, sizeSliderActions);
sliderEvents(filterByHeightFrom, filterByHeightFromLabel, filterByHeightFromPrev, filterByHeightFromNext, 10, sizeSliderActions);
sliderEvents(filterByHeightTo, filterByHeightToLabel, filterByHeightToPrev, filterByHeightToNext, 10, sizeSliderActions);

queryByTitle.addEventListener('keyup', function (e) {
    const query = e.target.value.toLowerCase();
    getFilteredByTitle(query);
});

queryByTitle.addEventListener('search', function (e) {
    const query = e.target.value.toLowerCase();
    getFilteredByTitle(query);
});

resetFilters.addEventListener('click', function (e) {
    queryByTitle.value = "";
    sizesFilterInitialState();
    State.resetState();
    const images = State.filteredList()
    createGallery(getScreenSize(), images, rowSlider.value, root);
    filtersResult.innerHTML = images.length;
});

createGallery(getScreenSize(), images, rowSlider.value, root);

window.addEventListener('resize', function () {
    createGallery(getScreenSize(), images, rowSlider.value, root);
});
