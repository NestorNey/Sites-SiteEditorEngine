import { Draggable } from "react-beautiful-dnd";
import "@/static/css/editor/ComponentsGlobal.css"

export const props = {
    unique: true,
    inputs_number: 3,
}

export const InputTemplate = ({ item, index}) => {
    const prefix = item.id;

    return (
        <Draggable draggableId={item.id} index={index}>
            {provided => (
                <div
                    className="editor_component"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <h4>Header_5</h4>
                    <input id={`${prefix}_input_1`} type="text" placeholder="Input 1 de header"/>
                    <input id={`${prefix}_input_1`} type="text" placeholder="Input 2 de header"/>
                    <input id={`${prefix}_input_1`} type="text" placeholder="Input 3 de header"/>
                    <input id={`${prefix}_input_1`} type="text" placeholder="Input 4 de header"/>

                </div>
            )}
        </Draggable>
    )
}