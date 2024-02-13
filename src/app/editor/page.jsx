'use client'

import EditorData from '@/components/editor/EditorData';
import ComponentsColumn from '@/components/editor/columns/ComponentsColumn';
import PageColumn from '@/components/editor/columns/PageColumn';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const EditorContainer = styled.div`
    display: flex;
`;

export default function Editor() {
    const state = EditorData;

    const handleDragEnd = (result) => {
        const { source, destination } = result;

        if (!result.destination) return;

        const sourceItems = state[source.droppableId].items;
        const destinationItems = state[destination.droppableId].items;
        let reorderedItem;

        if (source.droppableId === destination.droppableId && destination.droppableId === "page_column") {
            reorderedItem = sourceItems.splice(source.index, 1)[0];
        } else {
            reorderedItem = JSON.parse(JSON.stringify(sourceItems[source.index]));
            reorderedItem.component = sourceItems[source.index].component;
            reorderedItem.id = destination.droppableId + "_" + reorderedItem.id;

            for (const i in destinationItems) {
                if (destinationItems[i].id === reorderedItem.id) {
                    if (sourceItems[source.index].unique) return;
                    
                    if (sourceItems[source.index].count !== undefined) {
                        reorderedItem.id = reorderedItem.id + "_" + sourceItems[source.index].count;
                        sourceItems[source.index].count = sourceItems[source.index].count + 1;
                    } else {
                        reorderedItem.id = reorderedItem.id + "_" + 0;
                        sourceItems[source.index].count = 1;
                    }
                }
            }
        };

        destinationItems.splice(destination.index, 0, reorderedItem);
    };

    const handleSaveTemplate = event => {
        const template = {};
        const page_items = state.page_column.items;

        console.log("xD");
        
        for (const item in page_items) {
            const component_id = "component_" + item;
            template[component_id] = {
                comp_id: page_items[item].comp_id,
                style: page_items[item].style,
                values: {}
            }
            for (let i = 1; i <= page_items[item].n_inputs; i++) {
                const inputName = page_items[item].id + "_input_" + i;
                template[component_id].values[component_id + "_value_" + i] = document.getElementById(inputName).value;
            }
        }

            console.log(JSON.stringify(template))
    }

    return (
        <div>
            <EditorContainer>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <ComponentsColumn key="components_column"/>
                    <PageColumn key="page_column"/>
                </DragDropContext>
            </EditorContainer>
            <button onClick={handleSaveTemplate}>Guardar plantilla</button>
        </div>
    );
};