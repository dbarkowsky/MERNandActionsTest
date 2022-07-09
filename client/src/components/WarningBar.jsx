import { useEffect } from 'react';
import { useRef } from 'react';
import { React, useState, useMemo } from 'react';


export function WarningBar(props){
    const quantity = useRef(0);
    quantity.current = props.quantity.current;

    useMemo(() => {
        quantity.current = props.quantity.current;
    }, [props]);

    console.log(quantity);
    console.log(props);



    return(
        <div>
            <h5>Warning</h5>
            <p>There are { props.quantity.current } items in this list.</p>
        </div>
    );
}