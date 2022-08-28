import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Speech from 'react-speech';



// const textstyle = {
//     play: {
//         hover: {
//             backgroundColor: 'black',
//             color: 'white'
//         },
//         button: {
//             padding: '4',
//             fontFamily: 'Helvetica',
//             fontSize: '1.0em',
//             cursor: 'pointer',
//             pointerEvents: 'none',
//             outline: 'none',
//             backgroundColor: 'inherit',
//             border: 'none'
//         },
//     }
// }


const Dictaphone = () => {
    const [message, setMessage] = useState('');
    const commands = [
      {
        command: 'reset',
        callback: () => resetTranscript()
      },
      {
        command: 'shut up',
        callback: () => setMessage('I wasn\'t talking.')
      },
      {
        command: 'Hello',
        callback: () => setMessage('Hi there!')
      },
    ]
    const {
      transcript,
      interimTranscript,
      finalTranscript,
      resetTranscript,
      listening,
    } = useSpeechRecognition({ commands });
   
    useEffect(() => {
      if (finalTranscript !== '') {
        console.log('Got final result:', finalTranscript);
      }
    }, [interimTranscript, finalTranscript]);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
      }

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return null;
    }
   

    const listenContinuously = () => {
        console.log("listening...")
      SpeechRecognition.startListening({
        continuous: true,
        language: 'en-GB',
      });
    };
    return (
      <div>
        <div>
          <span>
            listening:
            {' '}
            {listening ? 'on' : 'off'}
          </span>
          <div>
            <button type="button" onClick={resetTranscript}>Reset</button>
            <button type="button" onClick={listenContinuously}>Listen</button>
            <button type="button" onClick={SpeechRecognition.stopListening}>Stop</button>
          </div>
        </div>
        <div>
          {message}
        </div>
        <div>
          <span>{transcript}</span>
        </div>

                    {/* <Speech
                // styles={textstyle}



                // pitch={1}
                // voice="Google UK English Female"
                // rate={0.9}
                // textAsButton={true}
                // displayText="Hello"
                text="I have text displayed as a button" /> */}
      </div>
    );
};
export default Dictaphone;
