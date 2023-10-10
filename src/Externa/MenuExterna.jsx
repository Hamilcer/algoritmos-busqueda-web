import ExpansionParcial from "./Estructura/ExpansionParcial"

export default function MenuExterna(props) {
    if (!props.tipoExpansion) {
        return <ExpansionParcial />
    } else {
        return (
            <>
                <h1>toral</h1>
            </>
        )
    }
}