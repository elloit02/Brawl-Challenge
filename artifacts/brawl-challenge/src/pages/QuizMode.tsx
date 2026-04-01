import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import ComeBackTomorrow from "@/components/ComeBackTomorrow";
import { QUIZ_QUESTIONS, QUIZ_LEVEL_NAMES, QUIZ_LEVEL_THRESHOLDS, getQuestionsForLevel } from "@/lib/quiz";
import { Brain, CheckCircle, XCircle } from "lucide-react";
import { getTodayDate } from "@/lib/storage";

interface Props {
  onNavigate: (page: string) => void;
}

export default function QuizMode({ onNavigate }: Props) {
  const { user, submitQuizAnswer, isQuizDailyDone } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState<ReturnType<typeof getNextQuestion> | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedQuestionIndices, setUsedQuestionIndices] = useState<number[]>([]);
  const [questionsThisSession, setQuestionsThisSession] = useState(0);

  const todayCount = getTodayDate() === user.quizDailyDate ? (user.quizDailyCount || 0) : 0;
  const questionsLeft = Math.max(0, 10 - todayCount);
  const isDone = isQuizDailyDone();

  const levelName = QUIZ_LEVEL_NAMES[(user.quizLevel || 1) - 1] || "Starter";
  const nextThreshold = QUIZ_LEVEL_THRESHOLDS[user.quizLevel] ?? null;
  const correctToNext = nextThreshold !== null ? Math.max(0, nextThreshold - (user.quizCorrect || 0)) : null;

  function getNextQuestion(quizLevel: number, used: number[]) {
    const available = getQuestionsForLevel(quizLevel);
    const notUsed = available
      .map((q, i) => ({ q, i }))
      .filter(({ i }) => !used.includes(i));

    if (notUsed.length === 0) {
      const idx = Math.floor(Math.random() * available.length);
      return { question: available[idx], globalIndex: idx };
    }
    const pick = notUsed[Math.floor(Math.random() * notUsed.length)];
    return { question: pick.q, globalIndex: pick.i };
  }

  useEffect(() => {
    if (!isDone) {
      const next = getNextQuestion(user.quizLevel, usedQuestionIndices);
      setCurrentQuestion(next);
    }
  }, []);

  function handleAnswer(idx: number) {
    if (showResult || !currentQuestion) return;
    setSelectedAnswer(idx);
    const correct = idx === currentQuestion.question.correctIndex;
    setIsCorrect(correct);
    setShowResult(true);

    const { quizLeveledUp } = submitQuizAnswer(correct);
  }

  function handleNext() {
    setSelectedAnswer(null);
    setShowResult(false);
    setQuestionsThisSession(prev => prev + 1);

    const newUsed = [...usedQuestionIndices, currentQuestion?.globalIndex ?? -1];
    setUsedQuestionIndices(newUsed);

    const next = getNextQuestion(user.quizLevel, newUsed);
    setCurrentQuestion(next);
  }

  if (isDone) {
    return <ComeBackTomorrow completedMode="quiz" onNavigate={onNavigate} />;
  }

  if (!currentQuestion) {
    return (
      <div className="text-center py-16">
        <Brain size={48} className="text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Loading questions...</p>
      </div>
    );
  }

  const q = currentQuestion.question;
  const letters = ["A", "B", "C", "D"];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Current Tier</span>
          </div>
          <p className="font-black text-xl quiz-tier">Tier {user.quizLevel} — {levelName.toUpperCase()}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 justify-end text-primary mb-1">
            <span className="font-bold text-sm">+10 XP</span>
            <span className="text-xs text-muted-foreground">per win</span>
          </div>
          <p className="text-muted-foreground text-sm">{todayCount}/10 today</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-bar mb-6">
        <div className="progress-fill" style={{ width: `${(todayCount / 10) * 100}%` }} />
      </div>

      {/* Question */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-4">
        <p className="text-lg font-bold leading-relaxed">{q.question}</p>
      </div>

      {/* Answers */}
      <div className="space-y-3 mb-6">
        {q.options.map((opt, i) => {
          let cls = "answer-option";
          if (showResult) {
            if (i === q.correctIndex) cls += " answer-correct";
            else if (i === selectedAnswer && i !== q.correctIndex) cls += " answer-wrong";
            else cls += " opacity-40";
          }
          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={showResult}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border border-border bg-card text-left transition-all ${cls}`}
            >
              <span className="font-black text-primary w-6 shrink-0">{letters[i]}</span>
              <span className="font-medium">{opt}</span>
              {showResult && i === q.correctIndex && <CheckCircle size={18} className="text-green-400 ml-auto shrink-0" />}
              {showResult && i === selectedAnswer && i !== q.correctIndex && <XCircle size={18} className="text-red-400 ml-auto shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Result feedback */}
      {showResult && (
        <div className={`rounded-2xl p-4 mb-4 text-center ${isCorrect ? "bg-green-500/10 border border-green-500/30" : "bg-red-500/10 border border-red-500/30"}`}>
          <p className={`font-bold text-lg mb-1 ${isCorrect ? "text-green-400" : "text-red-400"}`}>
            {isCorrect ? "Correct! +10 XP" : "Wrong answer!"}
          </p>
          <p className="text-sm text-muted-foreground">
            {isCorrect ? "Great knowledge, Brawler!" : `The correct answer was: ${q.options[q.correctIndex]}`}
          </p>
        </div>
      )}

      {showResult && questionsLeft > 1 && (
        <button
          onClick={handleNext}
          className="w-full neon-btn py-3 rounded-xl font-bold"
        >
          Next Question ({questionsLeft - 1} left today)
        </button>
      )}

      {showResult && questionsLeft <= 1 && (
        <div className="text-center text-muted-foreground text-sm mt-4">
          That was your last question for today!
        </div>
      )}

      {/* Quiz progress toward next level */}
      {correctToNext !== null && correctToNext > 0 && (
        <div className="mt-6 bg-card border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground text-center">
            Answer <span className="text-primary font-bold">{correctToNext}</span> more correct{correctToNext !== 1 ? "s" : ""} to reach the next quiz level
          </p>
        </div>
      )}
    </div>
  );
}
