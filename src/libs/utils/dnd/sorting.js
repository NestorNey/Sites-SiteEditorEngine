const getPageItemAtIndex = (pageItems, index) => {
    return pageItems[index];
}

const duplicateItem = (item) => {
    const duplicatedItem = JSON.parse(JSON.stringify(item));
    duplicatedItem.InputComponent = item.InputComponent;

    return duplicatedItem;
}

const generateItemId = (item, siteComponent, pageItems) => {
    let newItemId = `template-${item.id}`;


    if (siteComponent.unique) {
        pageItems.forEach(index => {
            const indexCompType = index.compType;
            const thisCompType = item.compType;

            if (indexCompType === thisCompType) throw new Error;
        });

        return newItemId;
    }


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
        
        try {
            reorderedItem.id = generateItemId(reorderedItem, siteComponent, pageItems);
        } catch {
            return false;
        }
    }

    return reorderedItem;
}