import { useState } from 'react';
import { ArrowLeft, Calendar as CalendarIcon } from 'lucide-react';
import { DayData } from '../types';

type HistoryProps = {
  onBack: () => void;
};

export function History({ onBack }: HistoryProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const mockHistoryData: DayData[] = [
    {
      date: '2025-11-24',
      hasActivity: true,
      conversations: [
        {
          question: 'Describe your morning routine',
          answer: 'I wake up at 7am, have breakfast, and go to work.',
          feedback: 'Good! Consider adding more details about your breakfast or commute.',
        },
        {
          question: 'What did you do last weekend?',
          answer: 'I went to the park with my family and had a picnic.',
          feedback: 'Excellent use of past tense! Try to describe what you ate at the picnic.',
        },
        {
          question: 'Talk about your favorite hobby',
          answer: 'I like reading books, especially science fiction novels.',
          feedback: 'Great! You could expand by mentioning specific authors or books.',
        },
      ],
    },
    {
      date: '2025-11-23',
      hasActivity: true,
      conversations: [
        {
          question: 'What are your plans for this week?',
          answer: 'I will study English and meet with friends on Friday.',
          feedback: 'Good future planning! Try using "going to" for planned activities.',
        },
      ],
    },
    {
      date: '2025-11-22',
      hasActivity: true,
    },
    {
      date: '2025-11-21',
      hasActivity: true,
    },
    {
      date: '2025-11-20',
      hasActivity: false,
    },
    {
      date: '2025-11-19',
      hasActivity: true,
    },
  ];

  const getDaysInMonth = () => {
    const year = 2025;
    const month = 10;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `2025-11-${i.toString().padStart(2, '0')}`;
      const dayData = mockHistoryData.find(d => d.date === dateStr);
      days.push({
        day: i,
        date: dateStr,
        hasActivity: dayData?.hasActivity || false,
        conversations: dayData?.conversations,
      });
    }
    return days;
  };

  const days = getDaysInMonth();
  const selectedDayData = mockHistoryData.find(d => d.date === selectedDate);

  return (
    <div className="min-h-screen pb-20 px-4 pt-6 relative overflow-hidden">
      <div className="gradient-orb-purple w-[450px] h-[450px] -top-32 right-0" />
      <div className="gradient-orb-pink w-[360px] h-[360px] top-1/2 -left-40" />
      <div className="gradient-orb-orange w-[300px] h-[300px] bottom-20 right-20" />

      <div className="max-w-lg mx-auto relative z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Dashboard</span>
        </button>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">History Calendar</h1>
          <p className="text-muted-foreground">Your learning journey</p>
        </div>

        <div className="glass-gradient rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">November 2025</h2>
            <CalendarIcon className="w-5 h-5 text-muted-foreground" />
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              if (!day) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              return (
                <button
                  key={day.date}
                  onClick={() => day.conversations && setSelectedDate(day.date)}
                  disabled={!day.hasActivity}
                  className={`
                    aspect-square rounded-lg flex items-center justify-center text-sm font-medium
                    transition-all duration-200
                    ${day.hasActivity
                      ? 'bg-gradient-to-br from-primary/20 to-accent/20 text-foreground hover:from-primary/30 hover:to-accent/30 cursor-pointer border border-primary/30'
                      : 'text-muted-foreground/40 cursor-not-allowed'
                    }
                    ${day.conversations ? 'ring-2 ring-primary/50' : ''}
                    ${selectedDate === day.date ? 'ring-4 ring-primary' : ''}
                  `}
                >
                  {day.day}
                </button>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30" />
              <span className="text-muted-foreground">Activity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 ring-2 ring-primary/50" />
              <span className="text-muted-foreground">Has notes</span>
            </div>
          </div>
        </div>

        {selectedDate && selectedDayData?.conversations && (
          <div className="mt-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-foreground mb-1">
                {new Date(selectedDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </h2>
              <p className="text-muted-foreground text-sm">
                {selectedDayData.conversations.length} conversation{selectedDayData.conversations.length > 1 ? 's' : ''}
              </p>
            </div>

            <div className="space-y-4">
              {selectedDayData.conversations.map((conv, index) => (
                <div key={index} className="glass-gradient rounded-2xl p-6 shadow-2xl">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Question</p>
                      <p className="text-foreground font-medium">{conv.question}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Your Answer</p>
                      <p className="text-foreground">{conv.answer}</p>
                    </div>
                    <div className="pt-3 border-t border-white/10">
                      <p className="text-xs text-muted-foreground mb-2">Feedback</p>
                      <p className="text-sm text-muted-foreground">{conv.feedback}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
