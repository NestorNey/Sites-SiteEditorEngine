'use client'

import EditorData from '@/components/editor/EditorData';
import ElementsColumn from '@/components/editor/ElementsColumn';
import PageColumn from '@/components/editor/PageColumn';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function Editor() {
    const state = EditorData; 

    const handleDragEnd = (result) => {
        if (!result.destination) return

        const { source, destination } = result
        const sourceColumnId = source.droppableId
        const destinationColumnId = destination.droppableId

        // Asegúrate de que state esté definido y contenga ambas columnas
        const sourceItems = { ...state[sourceColumnId]?.items } || []
        const destinationItems = { ...state[destinationColumnId]?.items } || []

        const reorderedItem = { ...sourceItems[source.index] } // Clona el elemento
        destinationItems.splice(destination.index, 0, reorderedItem)

        state[sourceColumnId] = sourceItems
        state[destinationColumnId] = destinationItems
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <ElementsColumn/>
            <PageColumn/>
        </DragDropContext>
    );
};