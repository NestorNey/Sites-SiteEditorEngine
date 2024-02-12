import { Droppable } from "react-beautiful-dnd"
import styled from "styled-components"
import EditorData from "./EditorData";
import Component from "./Component";

const Column = styled.div`
    border: 1px solid black;
    width: 300px;
    height: 400px;
`;

export default function PageColumn() {
    const column_data = EditorData.column_1 

    return(
        <Droppable droppableId={column_data.id}>
            {(provided) => (
                <Column ref={provided.innerRef} {...provided.droppableProps}>
                    {Object.values(column_data.items).map((item, index) => {
                        return( 
                            <Component key={item.id} item={item} index={index}/>
                        )
                    })}
                    {provided.placeholder}
                </Column>
            )}
        </Droppable>
    )
}