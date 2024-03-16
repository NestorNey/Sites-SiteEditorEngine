// import { Sites } from "@/components/editor/metadatav2";

import React from "react";
import { Droppable } from "react-beautiful-dnd";

abstract class SiteComponent extends React.Component{
    private style:string;
    private compName:string;
    private compType:string;
    public props = {
        values:null
    }

    constructor( style:string, compName:string, compType:string ) {
        super({values: null});

        this.style = style;
        this.compName = compName;
        this.compType = compType;
    }
}

class DefaultComponent extends SiteComponent{

    constructor( compName:string, compType:string ) {
        super('default', compName, compType);
    }
}

class DefaultHeader extends DefaultComponent {

    constructor( compType:string ) {
        super('header', compType);
    }

    headerFunc () {

    }
}


export class MyHeader extends DefaultHeader{


    constructor() {
        super('input');
    }

    override render() {
        return(
            <Droppable droppableId={"nose"}>
                {(provided) => (
                    <>{this.props.values['']}</>
                )}
            </Droppable>
        )
    }
}