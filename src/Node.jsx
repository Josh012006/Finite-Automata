import { Position } from "@xyflow/react";
import { InlineMath } from "react-katex";


function Node({ data }) {

    return(
       <div
            style={{
                width: data.size || 60,
                height: data.size || 60,
                borderRadius: '50%',
                border: data.final ? '6px solid black' : '2px solid black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: data.final ? 'bold' : 'normal',
                background: data.background ?? 'white',
            }}
        >
            <InlineMath errorColor={'#cc0000'}>{data.label}</InlineMath>
            {data.self && <>
                <Handle type="target" id="self-in" position={Position.Top} style={{ left: '20%' }} />
                <Handle type="source" id="self-out" position={Position.Top} style={{ left: '10%' }} />
            </>}
        </div>
    )
}

export default Node;
