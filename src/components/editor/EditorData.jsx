import { HeaderInput } from "@/components/editor/Components/inputs/HeaderInput"
import { CarouselInput } from "@/components/editor/Components/inputs/CarouselInput"
import { ProductInput } from "@/components/editor/Components/inputs/ProductInput"
import { Default } from "@/components/editor/Components/statics/Default";

const metadata = {
    components: [
        {
            id: "comp_header",
            unique: true,
            comp_type: "Header",
            style: "Default",
            inputs: {
                inputs_number: 3,
                InputComponent: Default.Input.Header
            },
            StaticComponent: Default.Static.Header
        },
        {
            id: "comp_carousel",
            unique: false,
            comp_type: "Carousel",
            style: "Default",
            inputs: {
                inputs_number: 3,
                InputComponent: Default.Input.Carousel
            },
            StaticComponent: Default.Static.Carousel
        },
        {
            id: "comp_product",
            unique: false,
            comp_type: "Product",
            style: "Default",
            inputs: {
                inputs_number: 3,
                InputComponent: Default.Input.Product
            },
            StaticComponent: Default.Static.Product
        }
    ],
    components_column: {
        id: "components_column",
        items: [
            {
                id: "comp_header",
                unique: true,
                comp_id: "Header",
                style: "dafult",
                n_inputs: 3,
                component: HeaderInput
            },
            {
                id: "comp_carousel",
                unique: false,
                comp_id: "Carousel",
                style: "default",
                n_inputs: 3,
                component: CarouselInput
            },
            {
                id: "comp_product",
                unique: false,
                comp_id: "Product",
                style: "default",
                n_inputs: 3,
                component: ProductInput
            }
        ]
    },
    page_column: {
        id: "page_column",
        items: []
    }
};

export default metadata;