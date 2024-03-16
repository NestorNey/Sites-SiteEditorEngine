import { Draggable } from "react-beautiful-dnd";
import "@/static/css/editor/ComponentsGlobal.css"
import styled from "styled-components";

export const props = {
    unique: true,
    inputs_number: 3,
}

export const InputTemplate = ({ item, index}) => {
    return (
        <Draggable draggableId={item.id} index={index}>
            {provided => (
                <div
                    className="editor_component"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    id={item.id}
                >
                    <h4>Header_1</h4>
                    <input name="logo" type="file"/>
                    <input name="otherImg" type="file"/>
                    <input name="nameof" type="text" placeholder="Input 1 de header"/>
                    <input name="option_1" type="text" placeholder="Input 2 de header"/>
                    <input name="option_2" type="text" placeholder="Input 3 de header"/>

                </div>
            )}
        </Draggable>
    )
}
