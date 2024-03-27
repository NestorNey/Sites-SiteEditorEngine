import "@/static/css/editor/ComponentsGlobal.css"

export const StaticTemplate = ({ values }) => {
    const texts = values.texts;
    const images = values.images;

    return (
        <div>
            <h1>{texts['nameof']}</h1>
            <img
                width={800}
                alt="an image xd"
                src={images['logo']}
            />
        </div>
        
    )
}