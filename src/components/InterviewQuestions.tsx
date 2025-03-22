
import React, { useState } from 'react';
import { Check, MessageSquare, Play, Mic, Save, HelpCircle, ChevronRight, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export interface Question {
  id: string;
  text: string;
  type: 'technical' | 'behavioral' | 'experience' | 'strength' | 'weakness';
  difficulty: 'easy' | 'medium' | 'hard';
  notes?: string;
  idealAnswer?: string;
}

interface InterviewQuestionsProps {
  questions: Question[];
  isLoading: boolean;
  onStartInterview: () => void;
}

const InterviewQuestions: React.FC<InterviewQuestionsProps> = ({ questions, isLoading, onStartInterview }) => {
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);

  const toggleQuestion = (id: string) => {
    setSelectedQuestions(prev => 
      prev.includes(id)
        ? prev.filter(qId => qId !== id)
        : [...prev, id]
    );
  };

  const getTypeColor = (type: Question['type']) => {
    switch (type) {
      case 'technical': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'behavioral': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'experience': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'strength': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'weakness': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: Question['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <Card className="glassmorphism overflow-hidden">
          <CardHeader className="bg-secondary/40 pb-4">
            <CardTitle className="text-xl">Generating Interview Questions...</CardTitle>
            <CardDescription>
              Our AI is creating tailored interview questions based on your resume.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-32 bg-muted rounded animate-shimmer"></div>
                  <div className="h-16 w-full bg-muted rounded animate-shimmer"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 animate-fade-in space-y-6">
      <Card className="overflow-hidden shadow-md card-hover">
        <CardHeader className="bg-secondary/40 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-xl">Generated Interview Questions</CardTitle>
              <CardDescription>
                {questions.length} questions tailored to your resume
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs flex items-center gap-1"
                onClick={() => setSelectedQuestions(questions.map(q => q.id))}
              >
                <Check className="w-3 h-3" /> Select All
              </Button>
              <Button 
                variant="default" 
                size="sm"
                className="text-xs flex items-center gap-1"
                onClick={onStartInterview}
                disabled={selectedQuestions.length === 0}
              >
                <Play className="w-3 h-3" /> Start Interview
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="flex gap-2 flex-wrap mb-4">
            <Badge variant="outline" className="text-xs py-1 px-2 bg-blue-50 dark:bg-blue-900/20">Technical</Badge>
            <Badge variant="outline" className="text-xs py-1 px-2 bg-green-50 dark:bg-green-900/20">Behavioral</Badge>
            <Badge variant="outline" className="text-xs py-1 px-2 bg-purple-50 dark:bg-purple-900/20">Experience</Badge>
            <Badge variant="outline" className="text-xs py-1 px-2 bg-yellow-50 dark:bg-yellow-900/20">Strength</Badge>
            <Badge variant="outline" className="text-xs py-1 px-2 bg-orange-50 dark:bg-orange-900/20">Weakness</Badge>
          </div>

          <div className="space-y-4">
            {questions.map((question) => (
              <div 
                key={question.id}
                className={`border rounded-lg transition-all duration-300 ${
                  selectedQuestions.includes(question.id) 
                    ? 'border-primary/50 bg-primary/5' 
                    : 'border-border'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="pt-0.5">
                      <button
                        onClick={() => toggleQuestion(question.id)}
                        className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                          selectedQuestions.includes(question.id) 
                            ? 'bg-primary text-white' 
                            : 'border border-input'
                        }`}
                      >
                        {selectedQuestions.includes(question.id) && <Check className="w-3 h-3" />}
                      </button>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getTypeColor(question.type)}`}>
                          {question.type.charAt(0).toUpperCase() + question.type.slice(1)}
                        </span>
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm font-medium">{question.text}</p>
                    </div>
                  </div>
                </div>

                {(question.notes || question.idealAnswer) && (
                  <Accordion type="single" collapsible className="border-t">
                    {question.notes && (
                      <AccordionItem value="notes" className="border-b-0">
                        <AccordionTrigger className="py-2 px-4 text-xs font-medium flex items-center">
                          <HelpCircle className="w-3 h-3 mr-2 text-muted-foreground" />
                          Notes
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-3 pt-0 text-xs">
                          {question.notes}
                        </AccordionContent>
                      </AccordionItem>
                    )}
                    {question.idealAnswer && (
                      <AccordionItem value="ideal-answer" className="border-b-0">
                        <AccordionTrigger className="py-2 px-4 text-xs font-medium flex items-center">
                          <MessageSquare className="w-3 h-3 mr-2 text-muted-foreground" />
                          Ideal Answer Elements
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-3 pt-0 text-xs">
                          {question.idealAnswer}
                        </AccordionContent>
                      </AccordionItem>
                    )}
                  </Accordion>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewQuestions;
