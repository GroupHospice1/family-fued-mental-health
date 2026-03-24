



import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ✅ CLEAN, AGE-APPROPRIATE (12–18), NON-CLINICAL CONTENT
const QUESTIONS = [
  {
    question: "Name something that helps teens feel calmer when stressed",
    answers: [
      { text: "Listening to music", points: 40 },
      { text: "Talking to a friend", points: 30 },
      { text: "Deep breathing", points: 20 },
      { text: "Going for a walk", points: 10 },
    ],
  },
  {
    question: "Name a place teens might go when they need a break",
    answers: [
      { text: "My room", points: 35 },
      { text: "Outside / nature", points: 30 },
      { text: "School counselor's office", points: 20 },
      { text: "Library", points: 15 },
    ],
  },
  {
    question: "Name a healthy way to cope with big emotions instead of reacting",
    answers: [
      { text: "Take deep breaths", points: 40 },
      { text: "Take a break / pause", points: 30 },
      { text: "Write or journal", points: 20 },
      { text: "Listen to calming music", points: 10 },
    ],
  },
  {
    question: "Name something teens can do when they feel overwhelmed",
    answers: [
      { text: "Grounding (5-4-3-2-1)", points: 35 },
      { text: "Ask for help", points: 30 },
      { text: "Slow breathing", points: 20 },
      { text: "Take space safely", points: 15 },
    ],
  },
  {
    question: "Name a sign your body gives when emotions are getting intense",
    answers: [
      { text: "Heart racing", points: 40 },
      { text: "Clenched fists/jaw", points: 30 },
      { text: "Tight chest or stomach", points: 20 },
      { text: "Feeling hot or restless", points: 10 },
    ],
  },
  {
    question: "Name a skill teens can use to calm their body",
    answers: [
      { text: "Deep breathing", points: 40 },
      { text: "Stretching/movement", points: 30 },
      { text: "Cold water on face", points: 20 },
      { text: "Progressive muscle relaxation", points: 10 },
    ],
  },
  {
    question: "Name something teens can tell themselves to feel more in control",
    answers: [
      { text: "This feeling will pass", points: 35 },
      { text: "I can handle this", points: 30 },
      { text: "I don’t have to react right away", points: 20 },
      { text: "I’ve gotten through hard things before", points: 15 },
    ],
  },
  {
    question: "Name a healthy way to release anger or frustration",
    answers: [
      { text: "Physical activity", points: 40 },
      { text: "Tear paper / stress ball", points: 30 },
      { text: "Art or drawing", points: 20 },
      { text: "Talk it out", points: 10 },
    ],
  },
  {
    question: "Name someone teens can reach out to when emotions feel unmanageable",
    answers: [
      { text: "Trusted adult", points: 40 },
      { text: "Therapist/counselor", points: 30 },
      { text: "Friend", points: 20 },
      { text: "Coach or teacher", points: 10 },
    ],
  }
  {
    question: "Name a healthy way to cope with big emotions instead of reacting",
    answers: [
      { text: "Take deep breaths", points: 40 },
      { text: "Take a break / pause", points: 30 },
      { text: "Write or journal", points: 20 },
      { text: "Listen to calming music", points: 10 },
    ],
  },
  {
    question: "Name something teens can do when they feel overwhelmed",
    answers: [
      { text: "Grounding (5-4-3-2-1)", points: 35 },
      { text: "Ask for help", points: 30 },
      { text: "Slow breathing", points: 20 },
      { text: "Take space safely", points: 15 },
    ],
  },
  {
    question: "Name a sign your body gives when emotions are getting intense",
    answers: [
      { text: "Heart racing", points: 40 },
      { text: "Clenched fists/jaw", points: 30 },
      { text: "Tight chest or stomach", points: 20 },
      { text: "Feeling hot or restless", points: 10 },
    ],
  },
  {
    question: "Name a skill teens can use to calm their body",
    answers: [
      { text: "Deep breathing", points: 40 },
      { text: "Stretching/movement", points: 30 },
      { text: "Cold water on face", points: 20 },
      { text: "Progressive muscle relaxation", points: 10 },
    ],
  },
  {
    question: "Name something teens can tell themselves to feel more in control",
    answers: [
      { text: "This feeling will pass", points: 35 },
      { text: "I can handle this", points: 30 },
      { text: "I don’t have to react right away", points: 20 },
      { text: "I’ve gotten through hard things before", points: 15 },
    ],
  },
  {
    question: "Name a healthy way to release anger or frustration",
    answers: [
      { text: "Physical activity", points: 40 },
      { text: "Tear paper / stress ball", points: 30 },
      { text: "Art or drawing", points: 20 },
      { text: "Talk it out", points: 10 },
    ],
  },
  {
    question: "Name someone teens can reach out to when emotions feel unmanageable",
    answers: [
      { text: "Trusted adult", points: 40 },
      { text: "Therapist/counselor", points: 30 },
      { text: "Friend", points: 20 },
      { text: "Coach or teacher", points: 10 },
    ],
  }
];

export default function MentalHealthFamilyFeud() {
  // GAME STATE
  const [qIndex, setQIndex] = useState(0);
  const [revealed, setRevealed] = useState(Array(4).fill(false));
  const [strikes, setStrikes] = useState(0);
  const [activeTeam, setActiveTeam] = useState("A");
  const [scores, setScores] = useState({ A: 0, B: 0 });
  const [hostView, setHostView] = useState(true);


  // SOUND EFFECTS
  const dingSound = useRef(new Audio("/sounds/ding.mp3"));
  const buzzerSound = useRef(new Audio("/sounds/buzzer.mp3"));


  const current = QUESTIONS[qIndex];

  // REVEAL ANSWER (HOST ONLY)
  const reveal = (i) => {
    if (!hostView || revealed[i]) return;
    const next = [...revealed];
    next[i] = true;
    setRevealed(next);
    setScores((prev) => ({
      ...prev,
      [activeTeam]: prev[activeTeam] + current.answers[i].points,
    }));
    dingSound.current.currentTime = 0;
    dingSound.current.play();
  };


  // BUZZER / STRIKE
  const addStrike = () => {
    if (!hostView || strikes >= 3) return;
    setStrikes(strikes + 1);
    buzzerSound.current.currentTime = 0;
    buzzerSound.current.play();
  };

  // SWITCH TEAMS
  const switchTeam = () => {
    if (!hostView) return;
    setActiveTeam(activeTeam === "A" ? "B" : "A");
  };

  // NEXT QUESTION
  const nextQuestion = () => {
    if (!hostView) return;
    setQIndex((qIndex + 1) % QUESTIONS.length);
    setRevealed(Array(4).fill(false));
    setStrikes(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6 flex items-center justify-center">
      <Card className="max-w-4xl w-full rounded-2xl shadow-xl">
        <CardContent className="p-6 space-y-6">
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Mental Health Family Feud</h1>
            <Button variant="outline" onClick={() => setHostView(!hostView)}>
              {hostView ? "Participant View" : "Host View"}
            </Button>
          </div>

          <p className="text-center text-muted-foreground">
            Fun, respectful conversation about coping & support (ages 12–18)
          </p>

          {/* SCOREBOARD */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className={`p-4 rounded-xl ${activeTeam === "A" ? "bg-blue-200" : "bg-gray-100"}`}>
              <h2 className="text-xl font-bold">Team A</h2>
              <p className="text-2xl">{scores.A}</p>
            </div>
            <div className={`p-4 rounded-xl ${activeTeam === "B" ? "bg-purple-200" : "bg-gray-100"}`}>
              <h2 className="text-xl font-bold">Team B</h2>
              <p className="text-2xl">{scores.B}</p>
            </div>
          </div>

          {/* QUESTION */}
          <div className="bg-white rounded-2xl p-4 shadow">
            <h2 className="text-xl font-semibold text-center mb-4">{current.question}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {current.answers.map((a, i) => (
                <Button
                  key={i}
                  className="h-20 text-lg rounded-2xl"
                  variant={revealed[i] ? "default" : "outline"}
                  onClick={() => reveal(i)}
                  disabled={!hostView}
                >
                  {revealed[i] || !hostView ? `${a.text} – ${a.points}` : "Hidden"}
                </Button>
              ))}
            </div>
          </div>

          {/* STRIKES */}
          <div className="flex justify-center gap-4 text-3xl">
            {[1, 2, 3].map((n) => (
              <span key={n}>{strikes >= n ? "❌" : "⭕"}</span>
            ))}
          </div>

          {/* HOST CONTROLS */}
          {hostView && (
            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={addStrike} variant="destructive">Buzzer / Strike</Button>
              <Button onClick={switchTeam} variant="secondary">Switch Team</Button>
              <Button onClick={nextQuestion}>Next Question</Button>
            </div>
          )}

          {/* FOOTER */}
          <div className="text-xs text-center text-muted-foreground">
            Encourage kindness, support, and reaching out to trusted adults when needed.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/*
🔊 SOUND FILE SETUP
Place these files in your public folder:
/public/sounds/ding.mp3   (answer reveal)
/public/sounds/buzzer.mp3 (strike)

School-safe sound effects can be downloaded from:
- https://freesound.org
- https://mixkit.co/free-sound-effects/
*/
