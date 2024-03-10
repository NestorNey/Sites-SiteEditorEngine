// -------------------------------------- Metadata Info -----------------------------------------//



const raw_metadata = {
    default: {
        Headers: { length: 5 },
        Introductions: { length: 4 }
    }
}



// ----------------------------------- METADATA GENERATION ------------------------------------ //


const importTemplate = (comp_name, style, index) => ({
    input: require(`./${style}/inputs/${comp_name}/template_${index + 1}`),
    static: require(`./${style}/statics/${comp_name}/template_${index + 1}`)
});

const metadata = {
    components: {},
    page: {
        id: "page_column",
        items: []
    }
};

let component_count = 0;

Object.keys(raw_metadata).map(style => {
    Object.keys(raw_metadata[style]).map(comp => {
        const comps_number = raw_metadata[style][comp].length;
        
        raw_metadata[style][comp] = Array.from({ length: comps_number }, (_, i) => importTemplate(comp, style, i))
    })
});

// Iterar sobre los estilos y tipos de componentes
for (const style in raw_metadata) {
    metadata.components[style] = {};
    for (const comp_type in raw_metadata[style]) {
        metadata.components[style][comp_type] = [];
        raw_metadata[style][comp_type].forEach((component, index) => {
            const { props, InputTemplate } = component.input;
            const StaticTemplate = component.static;

            metadata.components[style][comp_type].push({
                id: `comp_${component_count++}`,
                unique: props.unique,
                comp_type,
                style_number: index + 1,
                input: {
                    inputs_number: props.inputs_number,
                    InputComponent: InputTemplate
                },
                StaticComponent: StaticTemplate
            });
        });
    }
}

export default metadata;