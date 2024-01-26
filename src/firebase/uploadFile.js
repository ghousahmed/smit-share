import {
    storage,
    storageRef,
    uploadBytesResumable,
    getDownloadURL,
} from "../db/index";

const uploadFile = (file, i) => {
    return new Promise((resolve, reject) => {
        const fileRef = storageRef(storage, `files/file-${i}`);
        const uploadTask = uploadBytesResumable(fileRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            (error) => {
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve({ url: downloadURL, type: file.type, name: file.name });
                });
            }
        );
    });
};

export default uploadFile;