import './index.scss';
import {images}  from './getData';
import {createGallery} from './createGallery'

const root = document.getElementById('root');
const rows = 15;
const getScreenSize = () => ({
    // width: (window.innerWidth >=0) ? window.innerWidth : screen.width,
    height: (window.innerHeight >=0) ? window.innerHeight : screen.height,
    width: root.clientWidth
});

createGallery(getScreenSize(), images, rows, root);

window.addEventListener('resize', function () {
    createGallery(getScreenSize(), images, rows, root);
});

