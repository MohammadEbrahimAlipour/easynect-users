import { useState } from 'react';

export default function useCatalogStates() {
    const [cardData, setCardData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [idFromServer, setIdFromServer] = useState(null);
    const [pageDataDontExist, setPageDAtaDontExist] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [title, setTitle] = useState('');
    const [catalog, setCatalog] = useState(false);
    const [catalogId, setCatalogId] = useState('')
    const [tabValue, setabValue] = useState(1);
    const [catalogCreated, setCatalogCreated] = useState(false);

    const [items, setItems] = useState([]);

    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState('');

    

    return {
        setCardData: setCardData,
        setIsLoading: setIsLoading,
        setIdFromServer: setIdFromServer,
        pageDataDontExist: pageDataDontExist,
        setPageDAtaDontExist: setPageDAtaDontExist,
        title: title,
        setTitle: setTitle, 
        catalog: catalog,
        setCatalog: setCatalog,
        catalogId: catalogId,
        setCatalogId: setCatalogId,
        tabValue: tabValue,
        setabValue: setabValue,
        catalogCreated: catalogCreated,
        setCatalogCreated: setCatalogCreated,
        items: items,
        setItems: setItems,
        content: content,
        setContent: setContent,
        imageFile: imageFile,
        setImageFile: setImageFile,
        error: error,
        
    };
}
