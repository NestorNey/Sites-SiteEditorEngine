export const refactorSite = (site, siteName, style) => {
    // Clone page to get non pointer data
    const refactoredSite = JSON.parse(JSON.stringify(site));

    refactoredSite.style = style;
    refactoredSite.name = siteName;

    delete refactoredSite.id;

    return refactoredSite;
}

export const refactorItem = (item) => {
    // Delete unnecessary data for backend
    delete item.StaticComponent
    delete item.id;
    delete item.input;
    delete item.unique;
    
    // Add necessary data
    item.values = {
        texts: {},
        images: {}
    }

    return item;
}