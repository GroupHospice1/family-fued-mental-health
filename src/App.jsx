
import { useState } from "react";

const QUESTIONS = [
  {
    question: "What is something at home that annoys you?",
    answers: [
      { text: "Constant Arguing", points: 40 },
      { text: "Siblings", points: 30 },
      { text: "Dogs Barking", points: 20 },
      { text: "Messiness", points: 10 }
    ]
  },
  {
    question: "Least favorite weather condition to drive in?",
    answers: [
      { text: "Rain", points: 40 },
      { text: "Hurricane", points: 30 },
      { text: "Snow", points: 20 },
      { text: "Hail", points: 10 }
    ]
  },
  {
    question: "Name something that annoys everybody.",
    answers: [
      { text: "Traffic", points: 40 },
      { text: "Nasty Food", points: 30 },
      { text: "Dirty Bathrooms", points: 20 },
      { text: "Loud/Obnoxious kids", points: 10 }
    ]
  },
  {
    question: "What is something at school that annoys you?",
    answers: [
      { text: "Teachers", points: 40 },
      { text: "Homework", points: 30 },
      { text: "School Lunch", points: 20 },
      { text: "Tardy System", points: 10 }
    ]
  },
  {
    question: "What exotic reptile pet would everyone like to have?",
    answers: [
      { text: "Jumping Spider", points: 40 },
      { text: "Snake", points: 30 },
      { text: "Lizard", points: 20 },
      { text: "Chameleon", points: 10 }
    ]
  },
  {
    question: "What do all people hate about the week?",
    answers: [
      { text: "Mondays", points: 40 },
      { text: "Work", points: 30 },
      { text: "School", points: 20 },
      { text: "Getting up early", points: 10 }
    ]
  },
  {
    question: "Name one thing teenagers can't live without.",
    answers: [
      { text: "Electronics", points: 40 },
      { text: "Food/Snacks", points: 30 },
      { text: "Clothes", points: 20 },
      { text: "Friends", points: 10 }
    ]
  },
  {
    question: "What are some things that younger kids do that annoy you?",
    answers: [
      { text: "Gossip", points: 40 },
      { text: "Scream", points: 30 },
      { text: "Touch you without permission", points: 20 },
      { text: "Eating everything", points: 10 }
    ]
  },
  {
    question: "Favorite Subject in School?",
    answers: [
      { text: "Art", points: 40 },
      { text: "English", points: 30 },
      { text: "Gym/PE", points: 20 },
      { text: "Science", points: 10 }
    ]
  },
  {
    question: "What is most well known brand of water",
    answers: [
      { text: "Deer Park", points: 35 },
      { text: "Dasani", points: 30 },
      { text: "Fuji", points: 20 },
      { text: "Pure Life", points: 15 }
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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #c7d2fe, #e9d5ff)"
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "auto",
          backgroundColor: "#1e293b",
          color: "#f8fafc",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)"
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          Mental Health Family Feud
        </h1>

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
            {revealed[i] || !hostView
              ? `${a.text} – ${a.points}`
              : "Hidden"}
          </button>
        ))}

        <div style={{ fontSize: 24, marginTop: 12 }}>
          Strikes: {"❌".repeat(strikes)}
        </div>

        {hostView && (
          <div style={{ marginTop: 16 }}>
            <button onClick={addStrike}>Buzzer / Strike</button>{" "}
            <button
              onClick={() =>
                setActiveTeam(activeTeam === "A" ? "B" : "A")
              }
            >
              Switch Team
            </button>{" "}
            <button onClick={nextQuestion}>
              Next Question
            </button>
          </div>
        )}

        <p style={{ marginTop: 16 }}>
          Team A: {scores.A} | Team B: {scores.B}
        </p>
      </div>
    </div>
  );
}
