import { Droppable } from "react-beautiful-dnd"
import styled from "styled-components"
import metadata from "@/components/editor/EditorData";

const Column = styled.div`
    border: 1px solid black;
    width: 300px;
    height: 350px;
`;

export default function ElementsColumn() {
    const column_data = metadata.components_column;

    return(
        <Droppable droppableId={column_data.id} isDropDisabled={true}>
            {(provided) => (
                <Column ref={provided.innerRef} {...provided.droppableProps}>
                    {Object.values(column_data.items).map((item, index) => {
                        return( 
                            <item.component key={item.id} item={item} index={index}/>
                        )
                    })}
                    {provided.placeholder}
                </Column>
            )}
        </Droppable>
    )
}