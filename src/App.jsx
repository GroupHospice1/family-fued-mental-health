import { useState } from "react";

const QUESTIONS = [
  {
    question: "Name something that helps teens feel calmer when stressed",
    answers: [
      { text: "Listening to music", points: 40 },
      { text: "Talking to a friend", points: 30 },
      { text: "Deep breathing", points: 20 },
      { text: "Going for a walk", points: 10 }
    ]
  },
  {
    question: "Name something teens can do when they feel overwhelmed",
    answers: [
      { text: "Grounding (5-4-3-2-1)", points: 35 },
      { text: "Ask for help", points: 30 },
      { text: "Slow breathing", points: 20 },
      { text: "Take space safely", points: 15 }
    ]
  },
  {
    question: "Name a healthy way to cope with big emotions instead of reacting",
    answers: [
      { text: "Pause before responding", points: 40 },
      { text: "Write or journal", points: 30 },
      { text: "Listen to calming sounds", points: 20 },
      { text: "Move your body", points: 10 }
    ]
  },
  {
    question: "Name a sign your body gives when emotions are getting intense",
    answers: [
      { text: "Heart racing", points: 40 },
      { text: "Tight chest or stomach", points: 30 },
      { text: "Clenched fists or jaw", points: 20 },
      { text: "Feeling hot or restless", points: 10 }
    ]
  },
  {
    question: "Name a skill teens can use to calm their body",
    answers: [
      { text: "Deep breathing", points: 40 },
      { text: "Stretching or movement", points: 30 },
      { text: "Cold water on face", points: 20 },
      { text: "Progressive muscle relaxation", points: 10 }
    ]
  },

  // ✅ NEW QUESTIONS (ADDED)

  {
    question: "Name something teens can do when thoughts feel out of control",
    answers: [
      { text: "Challenge the thought", points: 40 },
      { text: "Name the feeling", points: 30 },
      { text: "Focus on the present moment", points: 20 },
      { text: "Talk it out", points: 10 }
    ]
  },
  {
    question: "Name a healthy way to release anger or frustration",
    answers: [
      { text: "Physical activity", points: 40 },
      { text: "Squeeze a stress ball", points: 30 },
      { text: "Art or drawing", points: 20 },
      { text: "Tear paper", points: 10 }
    ]
  },
  {
    question: "Name something teens can tell themselves during strong emotions",
    answers: [
      { text: "This feeling will pass", points: 40 },
      { text: "I can slow this down", points: 30 },
      { text: "I don’t have to react right now", points: 20 },
      { text: "I have tools to help", points: 10 }
    ]
  },
  {
    question: "Name a healthy distraction when emotions are intense",
    answers: [
      { text: "Watch or listen to something calming", points: 40 },
      { text: "Do a puzzle or game", points: 30 },
      { text: "Go for a walk", points: 20 },
      { text: "Clean or organize", points: 10 }
    ]
  },
  {
    question: "Name someone teens can reach out to when emotions feel unmanageable",
    answers: [
      { text: "Trusted adult", points: 40 },
      { text: "Therapist or counselor", points: 30 },
      { text: "Friend", points: 20 },
      { text: "Coach or teacher", points: 10 }
    ]
  }
];

export default function App() {
  const [qIndex, setQIndex] = useState(0);
  const [revealed, setRevealed] = useState([false, false, false, false]);
  const [strikes, setStrikes] = useState(0);
  const [activeTeam, setActiveTeam] = useState("A");
  const [scores, setScores] = useState({ A: 0, B: 0 });
  const [hostView, setHostView] = useState(true);

  const current = QUESTIONS[qIndex];

  const revealAnswer = (i) => {
    if (!hostView || revealed[i]) return;

    const next = [...revealed];
    next[i] = true;
    setRevealed(next);

    setScores((prev) => ({
      ...prev,
      [activeTeam]: prev[activeTeam] + current.answers[i].points
    }));
  };

  const addStrike = () => {
    if (!hostView || strikes >= 3) return;
    setStrikes((s) => s + 1);
  };

  const nextQuestion = () => {
    setQIndex((i) => (i + 1) % QUESTIONS.length);
    setRevealed([false, false, false, false]);
    setStrikes(0);
  };

  return (
    <div style={{ minHeight: "100vh", "linear-gradient(135deg, #c7d2fe, #e9d5ff)"}}>
      <div
        style={{
          maxWidth: 900,
          margin: "auto",
          background: "#fff",
          backgroundColor: "#1e293b", // dark slate
          color: "#f8fafc",           // off‑white text
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)"
          ``

        }}
      >
        <h1 style={{ textAlign: "center" }}>Mental Health Family Feud</h1>

        <button onClick={() => setHostView((v) => !v)}>
          Switch to {hostView ? "Participant" : "Host"} View
        </button>

        <h2 style={{ marginTop: 20 }}>{current.question}</h2>

        {current.answers.map((a, i) => (
          <button
            key={i}
            onClick={() => revealAnswer(i)}
            disabled={!hostView}
            style={{
              display: "block",
              width: "100%",
              margin: "8px 0",
              padding: 12,
              backgroundColor: revealed[i] ? "#334155" : "#0f172a",
              color: "#f8fafc",
              border: "1px solid #475569",
              borderRadius: 8,
              cursor: hostView ? "pointer" : "default"

            }}
          >
            {revealed[i] || !hostView ? `${a.text} – ${a.points}` : "Hidden"}
          </button>
        ))}

        <div style={{ fontSize: 24, marginTop: 12 }}>
          Strikes: {"❌".repeat(strikes)}
        </div>

        {hostView && (
          <div style={{ marginTop: 16 }}>
            <button onClick={addStrike}>Buzzer / Strike</button>{" "}
            <button onClick={() => setActiveTeam(activeTeam === "A" ? "B" : "A")}>
              Switch Team
            </button>{" "}
            <button onClick={nextQuestion}>Next Question</button>
          </div>
        )}

        <p style={{ marginTop: 16 }}>
          Team A: {scores.A} | Team B: {scores.B}
        </p>
      </div>
    </div>
  );
}
