const getImagesNewSize = (data, rowHeight) => {
    const tmpData = data.map(i => i);
    return tmpData.map(item => {
        item.ratio = item.width / item.height;
        item.newHeight = item.height * (rowHeight / item.height) | 0;
        item.newWidth = item.newHeight * item.ratio | 0;

        return item;
    });
};

const optimizationAlgorithm = (data, sortProperty, limitCondition) => {
    const result = {};
    let countRaw;

    for (let i = 0; i < data.length; i++) {
        if (data[i][sortProperty] > limitCondition) {
            console.error(`OOPS!!! image ${data[i].title} is too long for gallery`);
        } else {
            for (let j = 1; j > 0; j++) {
                countRaw = j;
                result[countRaw] = result[countRaw] || [];
                if (result[countRaw].reduce((acc, cur) => acc + cur[sortProperty], 0) + data[i][sortProperty] <= limitCondition) {
                    result[countRaw].push(data[i]);
                    break;
                }
            }
        }
    }

    return result;
};

const getOptimizedGallery = (data, screen) => {
    const optimized = optimizationAlgorithm(data, 'newWidth', screen.width);
    const galleryRows = Object.values(optimized);
    const last = galleryRows[galleryRows.length - 1];

    galleryRows.pop();
    shuffleArray(galleryRows);
    galleryRows.push(last);

    return galleryRows;
};

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

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
};

export const createGallery = (screen, data, rows, root) => {
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
