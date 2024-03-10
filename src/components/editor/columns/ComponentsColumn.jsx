import { Droppable } from "react-beautiful-dnd"
import styled from "styled-components"

const ComponentsSide = styled.div`
    border: 1px solid black;
    width: 520px;
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
`;

const StyleColumn = styled.div`
    border: 1px solid black;
    width: 350px;
`;

export default function ElementsColumn( {style, metadata } ) {
    const components = metadata.components[style];
    const component_error_msg = "Hubo un error al mostrar el componente";

    return(
        <ComponentsSide>
            {Object.keys(components).map((comp_type) => {
                return (
                    <Droppable key={comp_type} droppableId={comp_type} isDropDisabled={true}>
                        {(provided) => (
                            <StyleColumn key={comp_type} ref={provided.innerRef} {...provided.droppableProps}>
                                <h2>{comp_type}</h2>
                                {Object.values(components[comp_type]).map((item, index) => {
                                    return item.input. InputComponent
                                        ? <item.input.InputComponent key={item.id} item={item} index={index}/>
                                        : component_error_msg;
                                })}
                                {provided.placeholder}
                            </StyleColumn>
                        )}
                    </Droppable>
                )
            })}
        </ComponentsSide>
        
    )
}