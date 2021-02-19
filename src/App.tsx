import React from "react";
import "./App.css";

import { Button, Card, CardContent, CircularProgress, Container, Grid } from '@material-ui/core';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

import DiffText from "./components/DiffText";
import HighlightedText from "./components/HighlightedText";

const mockData = `The sport of American football in the National Football League (NFL) is played by men. But more women are now teaching and training players how to do their jobs better as coaches.
Last Sunday, two women coaches became Super Bowl champions when their team, the Tampa Bay Buccaneers, won the NFL championship game.
Maral Javadifar is a strength coach. She helps players exercise so they can stay fit during the season. If a player gets hurt, she helps them recover. Lori Locust is a defensive line coach. She works to help players on the first line of defense against the other team. They work as assistant coaches under Bruce Arians, the head coach of the Buccaneers.
Cindy Boren is a sports reporter for The Washington Post. She recently wrote about Javadifar and Locust. She said those women and others have the ability to coach the men.
“Bruce Arians’ opinion on women and coaching is that if you can teach, you can coach. And he feels that it was more than time for women to be on the staff. And you know, he hired the first one, Jen Welter, back five years ago, when he was the head coach in Arizona.”
The Buccaneers coaches were not the first women to coach in the NFL championship game. The first female coach in the Super Bowl was actually Katie Sowers of the San Francisco 49ers, whose team lost to Kansas City in 2020.`;

// Array of tuples, each tuple marking start (inclusive) and end (exclusive) word indexes
const phrases = [
  [0, 11],
  [11, 15],
  [15, 235]
];

function App() {
  // Hooks
  const [isEnd, setIsEnd] = React.useState(false);
  const [phraseNum, setPhraseNum] = React.useState(0);
  const [isRecording, setRecording] = React.useState(false);
  const [isSpeaking, setSpeaking] = React.useState(false);
  const [startIndex, endIndex] = phrases[phraseNum];
  const { transcript, resetTranscript } = useSpeechRecognition();

  const textToSpeech = (text: string) => () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.addEventListener("end", () => {
      setSpeaking(false);
    })

    setSpeaking(true);
    speechSynthesis.speak(utterance);
  };

  const goToPhrase = (num: number) => () => {
    setPhraseNum(num);
    setIsEnd(num + 1 === phrases.length);
  };

  const startRecording = () => {
    setRecording(true);
    SpeechRecognition.startListening();
  };

  const stopRecording = () => {
    SpeechRecognition.stopListening();
    setRecording(false);
  }

  const reset = () => {
    goToPhrase(0);
    resetTranscript();
  };

  const words = mockData.split(" ");
  const targetPhrases = words.slice(startIndex, endIndex).join(" ");

  return (
    <div className="App">
      <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid item sm={12} md={6}>
          <Card>
          <CardContent>
            <h1>Document</h1>
            <HighlightedText text={mockData} startIndex={startIndex} endIndex={endIndex} />
          </CardContent>
          </Card>
        </Grid>

        <Grid item sm={12} md={6}>
          <Card>
          <CardContent>
          <h1>Recorded Sentence {isRecording && <CircularProgress />}</h1>
          <DiffText original={targetPhrases} transcript={transcript} />
          </CardContent>
          </Card>
        </Grid>
      </Grid>

      <div className="controls">
      <Button variant="contained" color="primary" onClick={textToSpeech(targetPhrases)} disabled={isEnd || isSpeaking}>
        Speak
      </Button>

      <Button variant="contained" color="default" onClick={startRecording} disabled={isEnd || isRecording}>
        Start Recording
      </Button>

      <Button variant="contained" color="default" onClick={stopRecording} disabled={isEnd || !isRecording}>
        Stop Recording
      </Button>

      <Button variant="contained" color="default" onClick={goToPhrase(phraseNum - 1)} disabled={isEnd || phraseNum === 0}>
        Previous Phrase
      </Button>

      <Button variant="contained" color="default" onClick={goToPhrase(phraseNum + 1)} disabled={isEnd}>
        Next Phrase
      </Button>

      <Button variant="contained" color="secondary" onClick={reset} disabled={isEnd}>
        Reset
      </Button>
      </div>
      </Container>
    </div>
  );
}

export default App;
