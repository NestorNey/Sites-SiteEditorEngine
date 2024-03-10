import "@/static/css/editor/ComponentsGlobal.css"

export const static_header_template_3 = ({ values }) => {
    return (
        <div>
            {Object.values(values).map((value)=>{
                return <p>{value}</p>
            })}
        </div>
    )
}