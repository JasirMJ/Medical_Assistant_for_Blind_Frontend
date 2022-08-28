import React from 'react';
import Speech from 'react-speech';


const style = {
    play: {
        button: {
            width: '28',
            height: '28',
            cursor: 'pointer',
            pointerEvents: 'none',
            outline: 'none',
            backgroundColor: 'yellow',
            border: 'solid 1px rgba(255,255,255,1)',
            borderRadius: 6
        },
    }
};
React.render(
    <Speech
        styles={style}
        text="I have changed the colour of the play button and made it smaller" />,
    document.getElementById('node')
);



