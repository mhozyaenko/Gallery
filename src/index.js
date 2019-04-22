import './index.scss';
import {images}  from './getData';
import {createGallery} from './createGallery'

const root = document.getElementById('root');
const getScreenSize = () => ({
    // width: (window.innerWidth >=0) ? window.innerWidth : screen.width,
    height: (window.innerHeight >=0) ? window.innerHeight : screen.height,
    width: root.clientWidth
});

createGallery(getScreenSize(), images, 7, root);

window.addEventListener('resize', function () {
    createGallery(getScreenSize(), images, 7, root);
});

