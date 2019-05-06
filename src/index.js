import './index.scss';
// import {images} from './getData';
import createGallery from './createGallery';
import {sliderMaxAndMin} from './getMinAndMaxSizes';
import State from './imageState';
import { RowSlider, SizeSlider } from './sliders';
import SearchBar from './searchBar';

const root = document.getElementById('root');
const images = State.filteredList();
const controls = document.getElementById('controlsPanel');
const rowSliderValue = (document.getElementById('rowsCount')) ? document.getElementById('rowsCount').value : 10;

const filtersResult = document.querySelector('.filtersImagesResult');
const resetFilters = document.querySelector('.resetFilters');

const getScreenSize = () => ({
  height: (window.innerHeight >= 0) ? window.innerHeight : screen.height,
  width: root.clientWidth,
});

const rowSliderActions = (sliderValue) => createGallery(getScreenSize(), State.filteredList(), sliderValue, root);

const sizeSliderActions = () => {  
  const minWidthQuery = Number(document.getElementById('widthFilterFrom').value);
  const maxWidthQuery = Number(document.getElementById('widthFilterTo').value);
  const minHeightQuery = Number(document.getElementById('heightFilterFrom').value);
  const maxHeightQuery = Number(document.getElementById('heightFilterTo').value);
  const imagesCount = document.querySelectorAll('#root img').length;

  if (minWidthQuery > maxWidthQuery || minHeightQuery > maxHeightQuery) console.error('impossible conditions');

  State.setState('minWidth', minWidthQuery);
  State.setState('maxWidth', maxWidthQuery);
  State.setState('minHeight', minHeightQuery);
  State.setState('maxHeight', maxHeightQuery);

  const filteredImages = State.filteredList();

  if (imagesCount === filteredImages.length) return;

  (filteredImages.length === 0)
      ? root.innerHTML = `Sorry.... No matches....`
      : createGallery(getScreenSize(), filteredImages, rowSliderValue, root);

  filtersResult.innerHTML = filteredImages.length;  
};

const sizesFilterInitialState = (filterByWidthFrom, filterByWidthTo, filterByHeightFrom, filterByHeightTo ) => {

  const intervalSizes = setInterval(() => {
      if (Object.values(sliderMaxAndMin).length > 0) {
          filterByWidthFrom.setValue(sliderMaxAndMin.minWidth, sliderMaxAndMin.maxWidth, sliderMaxAndMin.minWidth );
          filterByWidthTo.setValue(sliderMaxAndMin.minWidth, sliderMaxAndMin.maxWidth, sliderMaxAndMin.maxWidth );
          filterByHeightFrom.setValue(sliderMaxAndMin.minHeight, sliderMaxAndMin.maxHeight, sliderMaxAndMin.minHeight );
          filterByHeightTo.setValue(sliderMaxAndMin.minHeight, sliderMaxAndMin.maxHeight, sliderMaxAndMin.maxHeight )
          clearInterval(intervalSizes);
      }
  }, 100);
};
const getFilteredByTitle = (titleQuery) => {
  const imagesCount = document.querySelectorAll('#root img').length;
  State.setState('titleQuery', titleQuery);
  const filteredImages = State.filteredList();
  if (imagesCount === filteredImages.length) return;
  (filteredImages.length === 0) ? root.innerHTML = `Sorry.... No matches....`
      : createGallery(getScreenSize(), filteredImages, rowSliderValue, root);
  filtersResult.innerText = filteredImages.length;
};
// render
const rowSlider = new RowSlider('rowsSlider', 'rowsCount', 'rowsSlider-slider-label', rowSliderValue, 1, rowSliderActions, controls, 1, 25);
rowSlider.render();
const filterByQuery = new SearchBar('filter-title', 'filterByTitle', 'Search Image By Title', controls, getFilteredByTitle);
filterByQuery.render();

const widthFromSlider = new SizeSlider('sizeFilter-slider', 
                                        'widthFilterFrom', 
                                        'widthFrom-label', 
                                        State.getProperty('minWidth'), 
                                        10,
                                        sizeSliderActions, 
                                        controls, 
                                        'Width from', 
                                        State.getProperty('minWidth'), 
                                        State.getProperty('maxWidth'));
widthFromSlider.render();

const widthToSlider = new SizeSlider('sizeFilter-slider', 
                                      'widthFilterTo', 
                                      'widthTo-label', 
                                      State.getProperty('maxWidth'), 
                                      10, 
                                      sizeSliderActions, 
                                      controls,
                                      'to', 
                                      State.getProperty('minWidth'), 
                                      State.getProperty('maxWidth')
 );
widthToSlider.render();

const heightFromSlider = new SizeSlider('sizeFilter-slider', 
                                      'heightFilterFrom', 
                                      'heightFrom-label', 
                                      State.getProperty('minHeight'), 
                                      10, 
                                      sizeSliderActions, 
                                      controls,
                                      'Height from', 
                                      State.getProperty('minHeight'), 
                                      State.getProperty('maxHeight')
 );
 heightFromSlider.render();

 const heightToSlider = new SizeSlider('sizeFilter-slider', 
                                      'heightFilterTo', 
                                      'heightTo-label', 
                                      State.getProperty('maxHeight'), 
                                      10, 
                                      sizeSliderActions, 
                                      controls,
                                      'to', 
                                      State.getProperty('minHeight'), 
                                      State.getProperty('maxHeight')
 );
 heightToSlider.render();

sizesFilterInitialState(widthFromSlider, widthToSlider, heightFromSlider, heightToSlider );

createGallery(getScreenSize(), images, rowSliderValue, root);

window.addEventListener('resize', function () {
    createGallery(getScreenSize(), images, rowSliderValue, root);
});
// render


resetFilters.addEventListener('click', function (e) {
    document.getElementById('filterByTitle').value = '';
    sizesFilterInitialState(widthFromSlider, widthToSlider, heightFromSlider, heightToSlider);
    State.resetState();
    const images = State.filteredList();
    createGallery(getScreenSize(), images, rowSliderValue, root);
    filtersResult.innerHTML = images.length;
});


