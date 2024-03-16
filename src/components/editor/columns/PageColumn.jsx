import { Droppable } from "react-beautiful-dnd"
import styled from "styled-components"
import { FormEvent } from 'react'

const Column = styled.form`
    border: 1px solid black;
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
`;

export default function PageColumn({ metadata }) {
    const column = metadata.page;

    return(
        <Droppable droppableId={"page"}>
            {(provided) => (
                <Column 
                    id="page_template" ref={provided.innerRef} {...provided.droppableProps}
                >
                    {Object.values(column.items).map((item, index) => {
                        return( 
                            <item.InputComponent key={item.id} item={item} index={index}/>
                        )
                    })}
                    {provided.placeholder}
                </Column>
            )}
        </Droppable>
    )
}