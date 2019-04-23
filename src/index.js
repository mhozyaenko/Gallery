import './index.scss';
import {images}  from './getData';
import {createGallery} from './createGallery'

const root = document.getElementById('root');
const rowSlider = document.getElementById('rowsCount');

const rows = rowSlider.value;

const getScreenSize = () => ({
    // width: (window.innerWidth >=0) ? window.innerWidth : screen.width,
    height: (window.innerHeight >=0) ? window.innerHeight : screen.height,
    width: root.clientWidth
});

rowSlider.addEventListener('change', function(e) {
    const rowsCount = e.target.value;
    document.querySelector('.rowsSlider-slider-label').innerHTML = rowsCount;
    createGallery(getScreenSize(), images, rowsCount, root);
});

createGallery(getScreenSize(), images, rowSlider.value, root);

window.addEventListener('resize', function () {
    createGallery(getScreenSize(), images, rowSlider.value, root);
});

