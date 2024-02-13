import { Default } from "@/components/editor/Components/statics/Default";
import example_data from "@/components/editor/exampleData"

export default function Visualize() {
    const data = example_data;

    return (
        <div>
            {Object.keys(data).map((key) => {
                return <Default.Inputs.Header key={key} values={data[key].values}/>
            })}
        </div>
    )
}