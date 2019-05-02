import {images} from './getData';

const getMaxAndMinValues = (data) => {
    const result = {};
    const interval = setInterval(() => {
        if (data[data.length - 1].width > 0 && data[data.length - 1].height > 0) {
            result.maxWidth = data[0].width;
            result.minWidth = data[0].width;
            result.maxHeight = data[0].height;
            result.minHeight = data[0].height;

            data.forEach(item => {
                if (item.width > result.maxWidth) result.maxWidth = item.width;
                if (item.width < result.minWidth) result.minWidth = item.width;
                if (item.height > result.maxHeight) result.maxHeight = item.height;
                if (item.height < result.minHeight) result.minHeight = item.height;
            });
            return result;
            clearInterval(interval); // TODO: check this
        }
    }, 200);

    return result;
};

export const sliderMaxAndMin = getMaxAndMinValues(images);
