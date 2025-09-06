import { InlineMath } from "react-katex";


function TextNode({ data }) {

    return(
       <div
            style={{
                minWidth: 60,
                minHeight: 60,
                border: '2px solid black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'white',
            }}
        >
            <InlineMath errorColor={'#cc0000'}>{data.label}</InlineMath>
        </div>
    )
}

export default TextNode;
