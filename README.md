
# Sites | Site-Editor-Engine
Version: 0.1-dev

Site-Editor-Engine it's a component based site creator used in [Sites](https://github.com/LittleSites) project.

## Deploy
To use Site-Editor-Engine you can clone the repo and run:
```bash
npm install
```
and then
```bash
npm run dev
```

The engine have this two libs `react-beatiful-dnd` & `styled-components` (optional)

Official libs docs: \
[React Beautiful Dnd](https://github.com/atlassian/react-beautiful-dnd)\
[Styled Components](https://styled-components.com/docs)


#### Why Styled Components?
Idk, the `components` prototype have styles with styled-components to easy integration, you can delete it and use your own styles or styles-lib.




## Creating Components

To create components you should to understand somethings.

The Site-Editor-Engine work with two view types, an `input` view and an `static` view, the difference between it's what the component should to have.



### Input Components

The input component should to have this structure:

```javascript
import { Draggable } from "react-beautiful-dnd";

export const InputTemplate = ({ item, index }) => {

    return (
        <Draggable draggableId={item.id} index={index}>
            ...
        </Draggable>
    )
}

```

I will explain it because this first Site-Editor-Engine version code it's ugly. 

First we have a arrow function called `InputTemplate`, thats have to are the name and should to receive two properties, `item` and `index`.

Then we have a `<Draggable></Draggable>` component, thats a react-beautiful-dnd component, it works to make a draggable container inside a `DraggableContext`.

The draggable container should to have two properties, `draggableId` and `index` this properties are provided by `item` and `index` vars.

The second thing you have to do it's return a children function inside the `<Draggable>` component like that:

```javascript
import { Draggable } from "react-beautiful-dnd";

export const InputTemplate = ({ item, index }) => {

    return (
        <Draggable draggableId={item.id} index={index}>
            {provided => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    id={item.id}
                >

                    Hello World!
                    
                </div>
            )}
        </Draggable>
    )
}

```

The children container should have this properties: `{...provided.draggableProps}`, `{...provided.dragHandleProps}`, `ref={provided.innerRef}` and `id={item.id}`. Then inside the container you can put all the things you want to put but the most important things you have to put are the inputs.

The inputs inside must not be inside a form tag `<form></form>` it can be outside it like:

```javascript
export const InputTemplate = ({ item, index }) => {

    return (
        <Draggable ... >
            {provided => (
                <div ... >
                    <input name="name" type="text" placeholder="Your name"/>
                    <input name="lastname" type="text" placeholder="Your lastname"/>
                    <input name="profilePhoto" type="image"/>
                </div>
            )}
        </Draggable>
    )
}
```

but the input name must be unique inside the InputTemplate.

When the user save a site, the engine take the component and create a json value like it:

```json
{
    "items": [
        {
            "compType": "header",
            "values": {
                "texts": {
                    ...
                },
                "images": {
                    ...
                }
            }
        },
        {
            ...
        }
    ]
}
```

thats the reason because not its important put the inputs inside a form tag, because it will be saved in a unique component by the component id.

#### What's happening with the images?

This Site-Editor-Engine are made for a scholar project and in if you inspect the code you will notice that the images are sent image by image and not in a unique json cause we first save the tempalte to get the siteId, and then we sent image by image to an endopoint that receives the serialized image and the siteId, the api save the image in a url with the site id and return the url, we take the url to complete the json tempalte and then we update the site tempalte.

### Static Components

The static components do not have a complicated structure, the arrow function should look like:

```javascript
export const StaticTemplate = ({ values }) => {
    return (
        <div>
            Hello World!
        </div>
    )
}
```

the arrow function just needs to be called `StaticTemplate` and will receive a `values` property.

#### What does the property 'values' have?

Inside you can found all the values that the user put inside the inputs in the InputTemplate. The values property it's a dictionary with this structure:

```javascript
const values = {
    texts: {
        text_input_name: "value"
    },
    images: {
        image_input_name: "url value"
    }
}
```

for example:

```javascript
const values = {
    texts: {
        name: "Kike",
        lastname: "Cokita"
    },
    images: {
        profilePhoto: "http://url.to/profile/photo.png"
    }
}
```

that means you can acces to the values like:

```javascript
export const StaticTemplate = ({ values }) => {
    const texts = values.texts;
    const images = values.images;

    return (
        <div>
            <h1>Hi, my name is {texts['name']} {texts['lastname']}!</h1>
            <img
                width={500}
                alt="profile photo"
                src={images['profilePhoto']}
            />
        </div>
        
    )
}
```
## Registry a Component

When you create a Component with the input and static template the last step you have to do it's registry it.

How?

inside the file `metadata.jsx` in `/src/components/editor/components/` you can found it code:

```javascript
// -------------------------------------- Metadata Info -----------------------------------------//

const raw_metadata = {
    default: {
        Headers: { length: 6 },
        Introductions: { length: 4 }
    }
}
```

The structure its simple:

```javascript
const raw_metadata = {
    style_name: {
        component_type: { length: 6 }
    }
}
```

#### What it means?

If you see, you can found that the components are saved in a directory like this: `/src/components/editor/components/<style_name>/<static or input>/<component type>/<templates>`, for example: `/src/components/editor/components/input/Headers/template_1`. \
Why? \
Because [Sites](https://github.com/LittleSites) work with Style suits, for example we have a minimalist style, this style have a component types like Headers, Carousels, etc. And thats types have a diferent minimalist templates.

#### Registry a template file

If you want to add a template in a component_type you only should to save the file like `teamplate_<n>` inside the component type dir and increase the component type length like:

I create the input file `template_7` inside the dir `.../editor/components/default/input/Headers/template_7` \
Then i create the static file `template_7` inside the dir `.../editor/components/default/static/Headers/template_7`

I will modify the raw metadata like:

```javascript
const raw_metadata = {
    default: {
        Headers: { length: 7 }
    }
}
```

You must create a input and static file, if you registry a new file but you dont create the static and static file the editor will have errors.

#### Registry a component type

If you want to create a new component type, you only should to add the dir inside the style dir for example:

`.../editor/components/default/input/NewCompType` \
`.../editor/components/default/static/NewCompType`

You must to create the dir in the input and static dir and then you can add the type in the raw metadata:

```javascript
const raw_metadata = {
    default: {
        Headers: { length: 7 },
        NewCompType: { length: 0 }
    }
}
```

#### Registry a style

If you want to create a new style, you only should to add the dir inside the editor componentes dir for example:

`.../editor/components/newStyle` 

You can add the input/static dirs like: `.../editor/components/newStyle/input` and `.../editor/components/newStyle/static` then you can modify the raw metadata like: 

```javascript
const raw_metadata = {
    default: {
        Headers: { length: 7 },
        NewCompType: { length: 0 }
    },
    newStyle: { ... }
}
```

and inside the style you can add all the component types you want to create.


## Alert

If you want to use this version it's ok, but i recommend dont use it because it are too complicated, I'm working in a newer version but it will released later.

This is more of a reminder of how I should not program but if you like you can take the code and modify it to your liking, good luck :)