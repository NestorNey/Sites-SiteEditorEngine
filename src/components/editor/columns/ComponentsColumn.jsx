import { Droppable } from "react-beautiful-dnd"
import styled from "styled-components"
import { metadata } from "../Components/metadata";
// import metadata from "@/components/editor/EditorData";

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

export default function ElementsColumn( {style} ) {
    const components = metadata.components[style];

    return(
        <ComponentsSide>
            {Object.keys(components).map((comp_type) => {
                return (
                    <Droppable droppableId={comp_type} isDropDisabled={true}>
                        {(provided) => (
                            <StyleColumn ref={provided.innerRef} {...provided.droppableProps}>
                                <h2>{comp_type}</h2>
                                {Object.values(components[comp_type]).map((item, index) => {
                                    let comp = "nulo";
                                    try {
                                        comp = <item.input.InputComponent key={item.id} item={item} index={index}/>
                                    } catch (error) {
                                        console.log("ITEM: : : : : :: :\n" + item.input.InputComponent)
                                    }
                                    return comp
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