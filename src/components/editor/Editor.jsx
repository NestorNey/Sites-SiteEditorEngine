'use client'

import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import ComponentsColumn from '@/components/editor/columns/ComponentsColumn';
import PageColumn from '@/components/editor/columns/PageColumn';
import metadata from '@/components/editor/components/metadata';

import { saveSite, saveSiteImages } from '@/libs/newApi';
import { getDestinationIndex } from '@/libs/utils/dnd/destination';
import { getReorderedItem } from '@/libs/utils/dnd/sorting';
import { refactorItem, refactorSite } from '@/libs/utils/dnd/refactors';

const EditorContainer = styled.div`
    display: flex;
`;

export const Editor = ({ style }) => {
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

        if (reorderedItem === false) return;

        destination.index = getDestinationIndex(
            destination.index,
            reorderedItem, 
            destinationItem, 
            source, 
            pageItems
        );

        pageItems.splice(destination.index, 0, reorderedItem);
    };

    const handleSaveSite = event => {
        // Refactor the site to get a clean copy
        const site = refactorSite(metadata.page, siteName, style);
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
            saveSite(site).then(siteId => {
                saveSiteImages(siteImages, siteId);
            });
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
                </DragDropContext>
            </EditorContainer>
            <button onClick={handleSaveSite}>Guardar plantilla</button>
        </div>
    );
}
