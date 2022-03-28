import React, {useEffect} from 'react';

const Test = () => {

    let inter;
    useEffect(()=>{

        inter = setTimeout(()=>{
            window.location.reload()
            }
          , 2000
        )
    }, [])

    const stop = () => {
        clearTimeout(inter)
    }

    return (
        <div>
            <button onClick={stop}>wwwwwwwwwwwwwwwwwwwwww</button>

            <button>123123123</button>
            <button>123123123</button>
            <button>123123123</button>
            <button>123123123</button>
            <button>123123123</button>
            <button>123123123</button>
            <button>123123123</button>
            <button>123123123</button>
            <button>123123123</button>
            <button>123123123</button>
            <button>123123123</button>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias atque dolore eius eligendi labore quod sequi? Ad consectetur, deleniti dolorum ea facere ipsum laboriosam libero, magni maxime molestiae perferendis similique?
        </div>
    );
};

export default Test;