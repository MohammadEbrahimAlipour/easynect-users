import React from 'react'

export default function useCatalogActions(items,setItems, setImageFile, setPageDAtaDontExist, ) {
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.readAsDataURL(file); // Reads the file as data URL (base64)

            reader.onload = () => {
                const base64 = reader.result.split(',')[1]; // Remove "data:image/png;base64," part
                resolve(base64);
            };

            reader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const handleFileChange = (file) => setImageFile(file)


    const handleClose = () => { setPageDAtaDontExist(false) }
    const moveCard = (fromIndex, toIndex) => {
        const updated = [...items];
        const [moved] = updated.splice(fromIndex, 1);
        updated.splice(toIndex, 0, moved);
        setItems(updated);
    };
    return ({
        convertFileToBase64,
        handleFileChange,
        handleClose,
        moveCard
})
}
