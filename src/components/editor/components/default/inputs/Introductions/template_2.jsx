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
                    id={item.id}
                >
                    <h4>Introduction_2</h4>
                    <input name="title" type="text" placeholder="Input 1 de header"/>
                    <input name="desc" ype="text" placeholder="Input 2 de header"/>
                    <input name="subtext" type="text" placeholder="Input 3 de header"/>

                </div>
            )}
        </Draggable>
    )
}