'use client'

import EditorData from '@/components/editor/EditorData';
import ElementsColumn from '@/components/editor/ElementsColumn';
import PageColumn from '@/components/editor/PageColumn';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function Editor() {
    const state = EditorData;

    const handleDragEnd = (result) => {
        const { source, destination } = result;

        if (!result.destination) return;
        if (source.droppableId === destination.droppableId) return;

        const sourceColumnId = source.droppableId;
        const destinationColumnId = destination.droppableId;

        const sourceItems = { ...state[sourceColumnId].items };
        const destinationItems = { ...state[destinationColumnId].items };

        const reorderedItem = JSON.parse(JSON.stringify(sourceItems[source.index]));
        destinationItems[destination.index] = reorderedItem;

        for(const i in destinationItems) {
            let item = destinationItems[i];
            item.id = destinationColumnId + "_" + item.id;

            destinationItems[i] = item;
        }

        state[sourceColumnId].items = sourceItems;
        state[destinationColumnId].items = destinationItems;
    };

    const handleDragStart = result => {
        const { source } = result;
        const itemIndex = source.index;
        const sourceColumnId = source.droppableId;

        state[sourceColumnId].items[itemIndex] = {
            id: "removable",
            content: ""
        }
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <ElementsColumn/>
            <PageColumn/>
        </DragDropContext>
    );
};