const getPageItemAtIndex = (pageItems, index) => {
    return pageItems[index];
}

const duplicateItem = (item) => {
    const duplicatedItem = JSON.parse(JSON.stringify(item));
    duplicatedItem.InputComponent = item.InputComponent;

    return duplicatedItem;
}

const generateItemId = (item, siteComponent) => {
    let newItemId = `template-${item.id}`;
    if (siteComponent.unique) return newItemId;

    newItemId += "-index";
    if (siteComponent.count !== undefined) {
        newItemId += siteComponent.count;
        siteComponent.count += 1;
    } else {
        newItemId += "_0";
        siteComponent.count = 1;
    }
    
    return newItemId;
}

export const getReorderedItem = (
    source, 
    destination, 
    metadata, 
    pageItems, 
    style
) => {
    let reorderedItem;

    if (source.droppableId === destination.droppableId)
        reorderedItem = pageItems.splice(source.index, 1)[0];

    else {
        const componentList = metadata.components[style][source.droppableId];
        const siteComponent = componentList[source.index];
        reorderedItem = duplicateItem(siteComponent);
        reorderedItem.id = generateItemId(reorderedItem, siteComponent);
    }

    return reorderedItem;
}