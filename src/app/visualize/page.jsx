'use client'

import { metadata } from "@/components/editor/Components/metadata";
import { Default } from "@/components/editor/Components/default/Default";
import example_data from "@/components/editor/exampleData"

export default function Visualize() {
    const data = example_data;

    return (
        <div>
            {Object.keys(data.components).map((key) => {
                const style_components = metadata.components[data.style][data.components[key].comp_type]
                for(const i in style_components) {
                    if (style_components[i].style_number === data.components[key].style_number) {
                        const component = style_components[i];
                        return <component.StaticComponent key={key} values={data.components[key].values}/>
                    }
                }
                return "asd"
            })}
        </div>
    )
}