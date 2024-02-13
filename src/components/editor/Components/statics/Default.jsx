import React from "react"

class Static{
    static Header({ values }) {
        return (
            <div>
                {Object.keys(values).map((key) => {
                    return <p>{values[key]}<br/></p>
                })}
            </div>
        )
    }

    static Carousel({ values }) {
        return (
            <div>
                {Object.keys(values).map((key) => {
                    return <p>{values[key]}<br/></p>
                })}
            </div>
        )
    }

    static Product({ values }) {
        return (
            <div>
                {Object.keys(values).map((key) => {
                    return <p>{values[key]}<br/></p>
                })}
            </div>
        )
    }
}

class Input {
    static Header({ values }) {
        return (
            <div>
                {Object.keys(values).map((key) => {
                    return <p>{values[key]}<br/></p>
                })}
            </div>
        )
    }

    static Carousel({ values }) {
        return (
            <div>
                {Object.keys(values).map((key) => {
                    return <p>{values[key]}<br/></p>
                })}
            </div>
        )
    }

    static Product({ values }) {
        return (
            <div>
                {Object.keys(values).map((key) => {
                    return <p>{values[key]}<br/></p>
                })}
            </div>
        )
    }
}


export const Default = {
    Static: Static,
    Input: Input,
}
