export default function Header({ values }) {
    return (
        <div>
            {Object.values(values).map( (value) => {
                <p>{value}<br/></p>
            })}
        </div>
    )
}