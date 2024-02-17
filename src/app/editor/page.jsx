'use client'

import { metadata } from '@/components/editor/Components/metadata';
import ComponentsColumn from '@/components/editor/columns/ComponentsColumn';
import PageColumn from '@/components/editor/columns/PageColumn';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const EditorContainer = styled.div`
    display: flex;
`;

export default function Editor() {
    const style = "style_1";
    const state = metadata;

    const handleDragEnd = (result) => {
        const { source, destination } = result;

        if (!result.destination) return;

        const sourceItems = source.droppableId === "page" ? state.page.items : state.components[style][source.droppableId];
        const destinationItems = destination.droppableId === "page" ? state.page.items : state.components[style][destination.droppableId];
        let reorderedItem;

        if (source.droppableId === destination.droppableId && destination.droppableId === "page") {
            reorderedItem = sourceItems.splice(source.index, 1)[0];
        } else {
            reorderedItem = JSON.parse(JSON.stringify(sourceItems[source.index]));
            reorderedItem.input.InputComponent = sourceItems[source.index].input.InputComponent;

            reorderedItem.id = destination.droppableId + "_" + reorderedItem.id;

            for (const i in destinationItems) {
                if (destinationItems[i].comp_type === reorderedItem.comp_type) {
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
        const template = {
            style: style,
            components: {}
        };
        const page_items = state.page.items;

        for (const item in page_items) {
            const component_id = "component_" + item;
            template.components[component_id] = {
                id: page_items[item].id,
                comp_type: page_items[item].comp_type,
                style_number: page_items[item].style_number,
                values: {}
            }
            for (let i = 1; i <= page_items[item].input.inputs_number; i++) {
                const inputName = page_items[item].id + "_input_" + i;
                template.components[component_id].values[component_id + "_value_" + i] = document.getElementById(inputName).value;
            }
        }

            console.log(JSON.stringify(template))
    }

    return (
        <div>
            <EditorContainer>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <ComponentsColumn key="components_column" style={"style_1"}/>
                    <PageColumn key="page_column"/>
                </DragDropContext>
            </EditorContainer>
            <button onClick={handleSaveTemplate}>Guardar plantilla</button>
        </div>
    );
};