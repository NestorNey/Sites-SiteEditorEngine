import "@/static/css/editor/ComponentsGlobal.css"

export const StaticTemplate = ({ values }) => {

    return (
        <div>
            <h1>{values.texts['nameof']}</h1>
        </div>
    )
}