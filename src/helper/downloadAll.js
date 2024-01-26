import JSZip from "jszip";
import { saveAs } from "file-saver";


const downloadAll = (files) => {
    let filename = "All-Files";
    const zip = new JSZip();
    const folder = zip.folder("project");
    files.forEach((file) => {
        const blobPromise = fetch(file.url).then(function (response) {
            if (response.status === 200 || response.status === 0) {
                return Promise.resolve(response.blob());
            } else {
                return Promise.reject(new Error(response.statusText));
            }
        });
        const name = file.name;
        folder.file(name, blobPromise);
    });

    zip
        .generateAsync({ type: "blob" })
        .then((blob) => saveAs(blob, filename))
        .catch((e) => console.log(e));
};

export default downloadAll;