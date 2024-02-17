import { Droppable } from "react-beautiful-dnd"
import styled from "styled-components"
import { metadata } from "../Components/metadata";

const Column = styled.div`
    border: 1px solid black;
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
`;

export default function PageColumn() {
    const column = metadata.page;

    return(
        <Droppable droppableId={"page"}>
            {(provided) => (
                <Column ref={provided.innerRef} {...provided.droppableProps}>
                    {Object.values(column.items).map((item, index) => {
                        return( 
                            <item.input.InputComponent key={item.id} item={item} index={index}/>
                        )
                    })}
                    {provided.placeholder}
                </Column>
            )}
        </Droppable>
    )
}