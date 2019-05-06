import {getImagesNewSize, getOptimizedGallery, shuffleArray} from './helpers';

const galleryRender = (galleryRowsArray, root) => {
    root.innerHTML = '';

    for (let row of Object.values(galleryRowsArray)) {
        const rowNode = document.createElement('div');

        rowNode.className = 'row';
        shuffleArray(row);
        row.forEach(item => {
            const galleryItem = document.createElement('div');
            const img = new Image();

            galleryItem.className = 'galleryItem';
            img.src = `./img/${item.src}`;
            img.height = item.newHeight;
            img.width = item.newWidth;
            galleryItem.appendChild(img);
            galleryItem.innerHTML += `<span class="galleryItem-tooltip">${item.title}</span>`;
            rowNode.appendChild(galleryItem);
        });

        root.appendChild(rowNode);
    }
};



const createGallery = (screen, data, rows, root) => {
    const rowHeight = screen.height / rows;

    const interval = setInterval(() => {
        if (Object.values(data[data.length - 1]).length >= 4) {
            const images = getImagesNewSize(data, rowHeight);

            images.sort((a, b) => b.newWidth - a.newWidth);
            galleryRender(getOptimizedGallery(images, screen), root);
            clearInterval(interval);
        }
    }, 100);
};
export default createGallery;