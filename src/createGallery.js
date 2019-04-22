const getImagesNewSize = (data, rowHeight) => {
    const tmpData = data.map(i => i);
    return tmpData.map(item => {
        item.ratio = item.width/item.height;
        item.newHeight = item.height * (rowHeight/item.height) | 0;
        item.newWidth = item.newHeight * item.ratio | 0;

        return item;
    });
};

const getOptimizedGallery = (images, gallery) => {
    let countRaw = 1;
    const result = {};

    for (let i=0; i<images.length; i++) {
        if (images[i].newWidth > gallery.width) {
            console.error(`OOPS!!! image ${images[i].title} is too long for gallery`)
        } else {
            for (let j = 1; j>0; j++) {
                countRaw = j;
                result[countRaw] = result[countRaw] || [];
                if (result[countRaw].reduce( (acc, cur) => acc + cur.newWidth, 0) + images[i].newWidth <= gallery.width) {
                    result[countRaw].push(images[i]);
                    break;
                }
            }
        }
    }
    return result;
};

const galleryRender = (gallery, root) =>{
    const galleryRows = Object.values(gallery);
    const last = galleryRows[galleryRows.length-1];
    galleryRows.pop();
    shuffleArray(galleryRows);
    galleryRows.push(last);
    root.innerHTML = '';
    for (let row of Object.values(galleryRows)) {
        const rowNode = document.createElement('div');
        rowNode.className = "row";
        shuffleArray(row);
        row.forEach(item => {
            const img = new Image();
            img.src = `./img/${item.src}`;
            img.height = item.newHeight;
            img.width = item.newWidth;
            rowNode.appendChild(img);
        });

        root.appendChild(rowNode);
    }
}

const shuffleArray = a => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export const createGallery = (screen, data, rows, root) => {
    const rowHeight = screen.height/rows;

    const interval = setInterval(()=> {
        if (Object.values(data[data.length-1]).length>=4) {
            const images = getImagesNewSize(data, rowHeight);
            images.sort( (a,b) => b.newWidth - a.newWidth );
            galleryRender(getOptimizedGallery(images, screen), root);
            clearInterval(interval);
        }
    },100);
}
