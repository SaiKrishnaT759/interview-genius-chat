
import React, { useState } from 'react';
import { Mic, MicOff, SkipForward, CheckCircle, ChevronLeft, ChevronRight, StopCircle, PlayCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Question } from './InterviewQuestions';

interface InterviewSimulatorProps {
  questions: Question[];
  onComplete: (results: InterviewResult[]) => void;
  onBack: () => void;
}

export interface InterviewResult {
  questionId: string;
  question: string;
  answer: string;
  feedback?: string;
  score?: number;
}

const InterviewSimulator: React.FC<InterviewSimulatorProps> = ({ questions, onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recording, setRecording] = useState(false);
  const [answers, setAnswers] = useState<{[key: string]: string}>({});
  const [results, setResults] = useState<InterviewResult[]>([]);
  const [completed, setCompleted] = useState(false);
  const [processingAnswer, setProcessingAnswer] = useState(false);
  
  const currentQuestion = questions[currentIndex];
  const progress = Math.round(((currentIndex + 1) / questions.length) * 100);
  
  const startRecording = () => {
    setRecording(true);
    // In a real implementation, this would start the audio recording
    console.log('Started recording answer to question:', currentQuestion.text);
  };
  
  const stopRecording = () => {
    setRecording(false);
    setProcessingAnswer(true);
    
    // Simulate processing time
    setTimeout(() => {
      // In a real implementation, this would process the recorded audio
      // For now, we'll just simulate an answer
      const simulatedAnswer = `This is a simulated answer to the question: "${currentQuestion.text}". In a real implementation, this would be the transcribed audio from the user's microphone.`;
      
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: simulatedAnswer
      }));
      
      setProcessingAnswer(false);
    }, 1500);
  };
  
  const skipQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishInterview();
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  const goToNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishInterview();
    }
  };
  
  const finishInterview = () => {
    setCompleted(true);
    
    // Create results for all questions
    const interviewResults = questions.map(q => ({
      questionId: q.id,
      question: q.text,
      answer: answers[q.id] || "No answer provided",
      feedback: generateFeedback(q),
      score: generateScore()
    }));
    
    setResults(interviewResults);
    onComplete(interviewResults);
  };
  
  // Mock feedback generation - in a real app, this would use AI
  const generateFeedback = (question: Question) => {
    const templates = [
      "Good answer! You clearly articulated your experience and knowledge.",
      "Solid response. Consider adding more specific examples next time.",
      "Your answer demonstrated your skills well. Try to be more concise.",
      "Clear and well-structured response. You hit all the key points.",
      "Good effort, but try to focus more on relevant experiences next time."
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
  };
  
  // Mock score generation - in a real app, this would use AI
  const generateScore = () => {
    return Math.floor(Math.random() * (10 - 6 + 1)) + 6; // Random score between 6-10
  };
  
  if (completed) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 animate-fade-in space-y-6">
        <Card className="overflow-hidden shadow-md card-hover">
          <CardContent className="p-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Interview Completed!</h2>
              <p className="text-muted-foreground">
                You've completed all {questions.length} questions. Your answers are being processed.
              </p>
            </div>
            
            <div className="text-center">
              <Button 
                onClick={() => onComplete(results)} 
                size="lg"
                className="px-8 animate-pulse-soft"
              >
                View Results
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-4xl mx-auto p-6 animate-fade-in space-y-6">
      <Card className="overflow-hidden shadow-md card-hover">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Badge variant="outline" className="py-1 px-3">
              Question {currentIndex + 1} of {questions.length}
            </Badge>
            <div className="text-sm text-muted-foreground">Progress: {progress}%</div>
          </div>
          
          <Progress value={progress} className="mb-8" />
          
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">
              {currentQuestion.text}
            </h3>
            
            {answers[currentQuestion.id] ? (
              <div className="bg-secondary/30 rounded-md p-4 mb-4">
                <h4 className="text-sm font-medium mb-2">Your Answer:</h4>
                <p className="text-sm">{answers[currentQuestion.id]}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center bg-secondary/30 rounded-md p-8 mb-4">
                {processingAnswer ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-sm font-medium">Processing your answer...</p>
                  </div>
                ) : recording ? (
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4 animate-pulse">
                      <Mic className="w-8 h-8 text-red-500" />
                    </div>
                    <p className="text-sm font-medium mb-2">Recording your answer...</p>
                    <div className="flex gap-3 mt-2">
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={stopRecording}
                        className="flex items-center gap-2"
                      >
                        <StopCircle className="w-4 h-4" />
                        Stop
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Button 
                      onClick={startRecording} 
                      className="flex items-center gap-2 mb-3"
                      size="lg"
                    >
                      <Mic className="w-5 h-5" />
                      Start Recording
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Click to start recording your answer
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap justify-between gap-4">
            <Button 
              variant="outline" 
              onClick={goToPreviousQuestion} 
              disabled={currentIndex === 0}
              className="flex items-center gap-2"
              size="sm"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <div className="flex gap-3">
              {!answers[currentQuestion.id] && (
                <Button 
                  variant="ghost" 
                  onClick={skipQuestion}
                  className="flex items-center gap-2"
                  size="sm"
                >
                  <SkipForward className="w-4 h-4" />
                  Skip
                </Button>
              )}
              
              <Button 
                onClick={answers[currentQuestion.id] ? goToNextQuestion : startRecording}
                className="flex items-center gap-2"
                size="sm"
              >
                {answers[currentQuestion.id] ? (
                  <>
                    {currentIndex === questions.length - 1 ? 'Finish' : 'Next'}
                    <ChevronRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    Answer
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewSimulator;
