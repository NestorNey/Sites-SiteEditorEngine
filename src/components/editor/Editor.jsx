'use client'

import ComponentsColumn from '@/components/editor/columns/ComponentsColumn';
import PageColumn from '@/components/editor/columns/PageColumn';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import metadata from './Components/metadata';
import { saveSite, saveSiteImages } from '@/utils/api';
import { getDestinationIndex } from '@/utils/dnd/destination';
import { getReorderedItem } from '@/utils/dnd/sorting';
import { Sites } from '@/components/editor/metadatav2';

const EditorContainer = styled.div`
    display: flex;
`;

export const Editor = ({ style }) => {

    Sites.registryComponents();
    console.log(Sites.components);

    const Comp = Sites.components[0];

    console.log(new Comp())

    // TO-DO
    const siteName = 'example_template';
    if(!Object.keys(metadata.components).includes(style)) return "Error";

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination } = result;
        const pageItems = metadata.page.items;
        const destinationItem = pageItems[destination.index];

        const reorderedItem = getReorderedItem(
            source, 
            destination, 
            metadata, 
            pageItems,
            style
        );

        destination.index = getDestinationIndex(
            destination.index,
            reorderedItem, 
            destinationItem, 
            source, 
            pageItems
        );

        pageItems.splice(destination.index, 0, reorderedItem);
    };

    const refactorSite = (site) => {
        // Clone page to get non pointer data
        const refactoredSite = JSON.parse(JSON.stringify(site));

        refactoredSite.style = style;
        refactoredSite.name = siteName;

        delete refactoredSite.id;

        return refactoredSite;
    }

    const refactorItem = (item) => {
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

    const handleSaveSite = event => {
        // Refactor the site to get a clean copy
        const site = refactorSite(metadata.page);
        let siteImages = [];

        // Traverse the list of items Site Components) to modify and save their values.(
        site.items.forEach((item, index) => {
            // Get the component values
            let componentId = item.id;
            let component = document.getElementById(componentId);
            let componentInputs = component.getElementsByTagName('input');

            // Refactor the item to get a clean copy
            item = refactorItem(item);

            Object.values(componentInputs).map(async (input) => {
                // Add images data to an array that will be sent later
                if (input.type === 'file') {
                    const file = input.files[0];
                    
                    siteImages.push({
                        compIndex: index,
                        inputName: input.name,
                        file: file
                    });

                    return;
                };

                item.values.texts[input.name] = input.value;
            });
        });

        try {
            console.log(site);
            // saveSiteImages(siteImages, 16);
            // uploadSite(site).then(siteId => {
            //     uploadSiteImages(siteImages, siteId);
            // });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <EditorContainer>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <ComponentsColumn key="components_column" metadata={metadata} style={style}/>
                    <PageColumn key="page_column" metadata={metadata}/>
                    <Comp ex='asd'/>
                </DragDropContext>
            </EditorContainer>
            <button onClick={handleSaveSite}>Guardar plantilla</button>
        </div>
    );
}
