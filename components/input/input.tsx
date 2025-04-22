import { TextInputProps } from "react-native";
import { CampoTexto } from "./styled";

type InputTextoProps = TextInputProps & {
    erro: boolean;
}

export default function InputTexto({erro, ...rest} : InputTextoProps){
    return(
        <CampoTexto
            erro={erro}
            placeholderTextColor={'#000'}
            {...rest}
        />
    )
}