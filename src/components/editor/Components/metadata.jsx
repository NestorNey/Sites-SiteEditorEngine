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

for (const style in raw_metadata) {
    metadata.components[style] = {};
    for (const compType in raw_metadata[style]) {
        metadata.components[style][compType] = [];
        Object.values(raw_metadata[style][compType]).map((component, index) => {
            const { props, InputTemplate } = component.input;
            const StaticTemplate = component.static;

            metadata.components[style][compType].push({
                id: `comp_${component_count++}`,
                unique: props.unique,
                count: 0,
                compType: compType,
                style_number: index,
                InputComponent: InputTemplate,
                StaticComponent: StaticTemplate
            });
        })
    }
}

console.log(JSON.stringify(metadata));

export default metadata;