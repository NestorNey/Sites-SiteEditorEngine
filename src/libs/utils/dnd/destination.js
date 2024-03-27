const isHeader = ( component ) => {
    return component.compType === "Headers";
}

const isFooter = ( component ) =>  {
    return component.compType === "Footer";
}

const isHeaderOrFooter = ( component ) => {
    return isHeader(component) || isFooter(component);
}

const getHeaderIndex = () => {
    return 0;
}

const getFooterIndex = ( pageItems ) => {
    return pageItems.length - 1;
}

export const getDestinationIndex = (
    destinationIndex,
    reorderedItem, 
    destinationItem, 
    source, 
    pageItems
) => {
    if ( isHeader( reorderedItem ) ){
        return getHeaderIndex();
    }
    else if ( isFooter( reorderedItem ) )
        return getFooterIndex( pageItems );

    else if ( destinationItem && isHeaderOrFooter( destinationItem ) )
        return source.index;
            
    return destinationIndex;
}