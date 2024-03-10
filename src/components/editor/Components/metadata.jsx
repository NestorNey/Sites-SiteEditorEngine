const importTemplate = (category, style, index) => ({
    input: require(`./${style}/inputs/${category}/template_${index + 1}`),
    static: require(`./${style}/statics/${category}/template_${index + 1}`)
});

const raw_metadata = {
    default: {
        Headers: Array.from({ length: 4 }, (_, i) => importTemplate('Headers', 'default', i)),
        Introductions: Array.from({ length: 4 }, (_, i) => importTemplate('Introductions', 'default', i))
    },
};

const metadata = {
    components: {},
    page: {
        id: "page_column",
        items: []
    }
};

let component_count = 0;

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