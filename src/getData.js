import data from './data.json';

const getImagesInfo = data => {
    const tmpData = data.map(i => i);

    tmpData.map(item => {
        const img = new Image();

        img.src = `./img/${item.src}`;

        const interval = setInterval(()=> {
            if (img.width >=0 && img.height>=0) {
                item.width = img.width;
                item.height = img.height;
                clearInterval(interval);
            }
        },200);
    });

    return tmpData;
};

export const images = getImagesInfo(data);
