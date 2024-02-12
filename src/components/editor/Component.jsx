import { Draggable, Droppable } from "react-beautiful-dnd"
import styled from "styled-components"

const Container = styled.div`

`;

export default function Component({ item, index }) {
    return (
        <Draggable draggableId={item.id} index={index}>
            {provided => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {item.content}
                </Container>
            )}
        </Draggable>
    )
}


