import { Draggable } from "react-beautiful-dnd";
import "@/static/css/editor/ComponentsGlobal.css"

export const props = {
    unique: false,
    inputs_number: 3
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
                >
                    <h4>Introduction_2</h4>
                    <input id={item.id + "_input_1"} type="text" placeholder="Input 1 de header"/>
                    <input id={item.id + "_input_2"} type="text" placeholder="Input 2 de header"/>
                    <input id={item.id + "_input_3"} type="text" placeholder="Input 3 de header"/>

                </div>
            )}
        </Draggable>
    )
}