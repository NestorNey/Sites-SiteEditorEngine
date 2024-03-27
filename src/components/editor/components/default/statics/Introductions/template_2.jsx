import "@/static/css/editor/ComponentsGlobal.css"

export const static_introduction_template_2 = ({ values }) => {
    return (
        <div>
            {Object.values(values).map((value)=>{
                return <p>{value}</p>
            })}
        </div>
    )
}