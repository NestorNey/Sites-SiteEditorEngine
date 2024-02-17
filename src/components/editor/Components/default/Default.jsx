import { input_header_template_1 } from "./inputs/Headers/input_header_template_1";
import { input_header_template_2 } from "./inputs/Headers/input_header_template_2";
import { input_header_template_3 } from "./inputs/Headers/input_header_template_3";
import { input_header_template_4 } from "./inputs/Headers/input_header_template_4";
import { input_introduction_template_1 } from "./inputs/Introductions/input_introduction_template_1";
import { input_introduction_template_2 } from "./inputs/Introductions/input_introduction_template_2";
import { input_introduction_template_3 } from "./inputs/Introductions/input_introduction_template_3";
import { input_introduction_template_4 } from "./inputs/Introductions/input_introduction_template_4";
import { static_header_template_1 } from "./statics/Headers/static_header_template_1";
import { static_header_template_2 } from "./statics/Headers/static_header_template_2";
import { static_header_template_3 } from "./statics/Headers/static_header_template_3";
import { static_header_template_4 } from "./statics/Headers/static_header_template_4";
import { static_introduction_template_1 } from "./statics/Introductions/static_introduction_template_1";
import { static_introduction_template_2 } from "./statics/Introductions/static_introduction_template_2";
import { static_introduction_template_3 } from "./statics/Introductions/static_introduction_template_3";
import { static_introduction_template_4 } from "./statics/Introductions/static_introduction_template_4";


export const Default = {
    inputs: {
        Headers: {
            template_1: input_header_template_1,
            template_2: input_header_template_2,
            template_3: input_header_template_3,
            template_4: input_header_template_4
        },
        Introductions: {
            template_1: input_introduction_template_1,
            template_2: input_introduction_template_2,
            template_3: input_introduction_template_3,
            template_4: input_introduction_template_4
        }
    },
    statics: {
        Headers: {
            template_1: static_header_template_1,
            template_2: static_header_template_2,
            template_3: static_header_template_3,
            template_4: static_header_template_4
        },
        Introductions: {
            template_1: static_introduction_template_1,
            template_2: static_introduction_template_2,
            template_3: static_introduction_template_3,
            template_4: static_introduction_template_4,
        }
    }
}