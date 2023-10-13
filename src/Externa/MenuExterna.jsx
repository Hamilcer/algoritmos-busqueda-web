import ExpansionParcial from "./Estructura/ExpansionParcial"
import ExpansionTotal from "./Estructura/ExpansionTotal"

export default function MenuExterna(props) {
    if (props.tipoExpansion == 0) {
        console.log(props.tipoExpansion)
        return <ExpansionTotal />
    } else {
        return <ExpansionParcial />
    }
}