import { useState } from 'react';
import { Send, CheckCircle, ArrowRight, Circle, Loader2 } from 'lucide-react';
import { mockPracticeQuestions, mockProfile } from '../lib/mockData';
import { AIFeedback } from '../types';

type ViewState = 'question' | 'feedback';

export function Practice() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [viewState, setViewState] = useState<ViewState>('question');
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<AIFeedback | null>(null);

  const currentQuestion = mockPracticeQuestions[currentQuestionIndex];

  const handleSubmit = async () => {
    if (!userAnswer.trim()) return;

    setLoading(true);
    setAiFeedback(null);

    try {
      const response = await fetch('/api/getAiFeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: currentQuestion.question,
          userAnswer: userAnswer,
          userPersona: mockProfile.persona,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const feedback: AIFeedback = await response.json();
      setAiFeedback(feedback);
      setViewState('feedback');

    } catch (error) {
      console.error("Failed to fetch AI feedback:", error);
      // You can add a user-facing error state here
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setCompletedQuestions(prev => new Set(prev).add(currentQuestionIndex));
    setUserAnswer('');
    setViewState('question');
    setCurrentQuestionIndex((prev) =>
      prev < mockPracticeQuestions.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <div className="min-h-screen pb-20 px-4 pt-6 bg-background relative overflow-hidden">
      <div className="gradient-orb-orange w-[380px] h-[380px] -top-40 right-10" />
      <div className="gradient-orb-purple w-[460px] h-[460px] top-1/3 -left-48" />
      <div className="gradient-orb-pink w-[320px] h-[320px] bottom-32 right-20" />
      <div className="gradient-orb-cyan w-[280px] h-[280px] top-20 left-32" />

      <div className="max-w-lg mx-auto relative z-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1 text-foreground">Practice</h1>
          <p className="text-sm text-muted-foreground mb-4">
            Question {currentQuestionIndex + 1} of {mockPracticeQuestions.length}
          </p>

          <div className="flex items-center justify-between gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      completedQuestions.has(index)
                        ? 'bg-success text-white shadow-lg'
                        : index === currentQuestionIndex
                        ? 'bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg'
                        : 'bg-white/5 backdrop-blur-sm text-muted-foreground border border-white/10'
                    }`}
                  >
                    {completedQuestions.has(index) ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Circle className={`w-4 h-4 ${index === currentQuestionIndex ? 'fill-current' : ''}`} />
                    )}
                  </div>
                </div>
                {index < 2 && (
                  <div
                    className={`h-0.5 flex-1 -mb-3 transition-colors ${
                      completedQuestions.has(index)
                        ? 'bg-success'
                        : 'bg-white/10 backdrop-blur-sm'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {viewState === 'question' && (
          <div className="space-y-6">
            <div className="glass-gradient rounded-2xl p-6 shadow-2xl">
              <div className="inline-block bg-primary/20 backdrop-blur-sm text-primary text-xs font-medium px-3 py-1 rounded-full mb-4 border border-primary/30">
                {currentQuestion.scenario}
              </div>
              <p className="text-lg font-medium text-foreground leading-relaxed">
                {currentQuestion.question}
              </p>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-foreground">
                Your Answer
              </label>
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full min-h-[200px] p-4 glass-gradient rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none shadow-2xl"
              />
              <button
                onClick={handleSubmit}
                disabled={!userAnswer.trim() || loading}
                className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Getting feedback...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Answer
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {viewState === 'feedback' && aiFeedback && (
          <div className="space-y-6">
            <div className="bg-success/20 backdrop-blur-sm border border-success/30 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-6 h-6 text-success" />
                <h2 className="text-lg font-semibold text-foreground">AI Feedback</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                {aiFeedback.correction}
              </p>
            </div>

            <div className="space-y-4">
              <div className="glass-gradient rounded-2xl p-6 shadow-2xl">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                  Your Answer
                </h3>
                <p className="text-foreground leading-relaxed">
                  {userAnswer}
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 rounded-2xl p-6 shadow-2xl">
                <h3 className="text-sm font-semibold text-primary mb-2">
                  Formal Answer
                </h3>
                <p className="text-foreground leading-relaxed font-medium">
                  {aiFeedback.formalAnswer}
                </p>
              </div>

              <div className="glass-gradient rounded-2xl p-6 shadow-2xl">
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  Native Answer
                </h3>
                <div className="p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <p className="text-foreground leading-relaxed">{aiFeedback.nativeAnswer}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-2xl"
            >
              Next Question
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
