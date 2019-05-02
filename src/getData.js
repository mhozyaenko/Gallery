import data from './data.json';

const getImagesInfo = data => {
    const tmpData = data.map(i => i);
    const asyncImageLoader = (url) => {
        return new Promise((resolve, reject) => {
            const image = new Image();

            image.src = url;
            image.onload = () => resolve(image);
            image.onerror = () => reject(new Error('could not load image'));
        })
    };

    tmpData.map(item => {
        const image = asyncImageLoader(`./img/${item.src}`);

        image.then(image => {
            item.width = image.width;
            item.height = image.height;
        });
    });

    return tmpData;
};

export const images = getImagesInfo(data);
