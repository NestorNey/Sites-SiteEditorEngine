import { Draggable } from "react-beautiful-dnd";
import "@/static/css/editor/ComponentsGlobal.css"

export const props = {
    unique: true,
    inputs_number: 0,
}

export const InputTemplate = ({ item, index }) => {

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
                    <h4>Header_6</h4>
                    <input name="logo" type="file"/>
                    <input name="nameof" type="text" placeholder="My Name"/>
                    <input name="option_1" type="text" placeholder="Tag 1"/>
                    <input name="option_2" type="text" placeholder="Tag 2"/>
                    
                </div>
            )}
        </Draggable>
    )
}
