

function Node({ data }) {

    return(
       <div
            style={{
                width: data.size || 60,
                height: data.size || 60,
                borderRadius: '50%',
                border: '2px solid black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                background: 'white',
            }}
        >
            {data.label}
        </div>
    )
}

export default Node;
