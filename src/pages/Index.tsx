
import React, { useState } from 'react';
import Header from '@/components/Header';
import AnimatedBackground from '@/components/AnimatedBackground';
import ResumeUploader from '@/components/ResumeUploader';
import ResumeAnalysis, { AnalysisResult } from '@/components/ResumeAnalysis';
import InterviewQuestions, { Question } from '@/components/InterviewQuestions';
import InterviewSimulator, { InterviewResult } from '@/components/InterviewSimulator';
import { parseResume, generateInterviewQuestions } from '@/utils/resumeUtils';
import { toast } from '@/components/ui/use-toast';
import { LightbulbIcon, Briefcase, CircleCheckBig, BrainCircuit, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type AppState = 'upload' | 'analysis' | 'questions' | 'interview' | 'results';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [results, setResults] = useState<InterviewResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (uploadedFile: File) => {
    setFile(uploadedFile);
    setIsLoading(true);
    
    try {
      const resumeAnalysis = await parseResume(uploadedFile);
      setAnalysis(resumeAnalysis);
      setAppState('analysis');
      toast({
        title: "Resume Analyzed Successfully",
        description: "We've extracted key information from your resume.",
      });
    } catch (error) {
      console.error("Error analyzing resume:", error);
      toast({
        title: "Analysis Failed",
        description: "We couldn't analyze your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateQuestions = async () => {
    if (!analysis) return;
    
    setIsLoading(true);
    setAppState('questions');
    
    try {
      const generatedQuestions = await generateInterviewQuestions(analysis);
      setQuestions(generatedQuestions);
      toast({
        title: "Questions Generated",
        description: `${generatedQuestions.length} interview questions have been created based on your resume.`,
      });
    } catch (error) {
      console.error("Error generating questions:", error);
      toast({
        title: "Generation Failed",
        description: "We couldn't generate interview questions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartInterview = () => {
    setAppState('interview');
  };

  const handleInterviewComplete = (interviewResults: InterviewResult[]) => {
    setResults(interviewResults);
    setAppState('results');
    toast({
      title: "Interview Completed",
      description: "Your interview performance has been analyzed.",
    });
  };

  const renderContent = () => {
    switch (appState) {
      case 'upload':
        return (
          <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
            <div className="max-w-3xl text-center mb-12 animate-slide-down">
              <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
                <BrainCircuit className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
                AI-Powered Interview Preparation
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Upload your resume and get personalized interview questions, practice with our AI interviewer, and receive detailed feedback.
              </p>
            </div>
            
            <ResumeUploader onFileUpload={handleFileUpload} isLoading={isLoading} />
            
            <div className="mt-20 w-full max-w-4xl animate-fade-in">
              <h2 className="text-2xl font-semibold text-center mb-8">How It Works</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glassmorphism card-hover">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">Resume Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI analyzes your resume to identify key skills, experience, and areas for improvement.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="glassmorphism card-hover">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <LightbulbIcon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">Question Generation</h3>
                    <p className="text-sm text-muted-foreground">
                      We generate tailored interview questions based on your resume and the role you're targeting.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="glassmorphism card-hover">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <CircleCheckBig className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">Practice & Feedback</h3>
                    <p className="text-sm text-muted-foreground">
                      Practice answering the questions and receive detailed feedback to improve your responses.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
        
      case 'analysis':
        return (
          <ResumeAnalysis 
            analysis={analysis} 
            isLoading={isLoading} 
            onViewQuestions={handleGenerateQuestions} 
          />
        );
        
      case 'questions':
        return (
          <InterviewQuestions 
            questions={questions} 
            isLoading={isLoading} 
            onStartInterview={handleStartInterview} 
          />
        );
        
      case 'interview':
        return (
          <InterviewSimulator 
            questions={questions} 
            onComplete={handleInterviewComplete} 
            onBack={() => setAppState('questions')} 
          />
        );
        
      case 'results':
        return (
          <div className="w-full max-w-4xl mx-auto p-6 animate-fade-in space-y-6">
            <Card className="overflow-hidden shadow-md card-hover">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Interview Results</h2>
                
                <div className="space-y-8">
                  {results.map((result, index) => (
                    <div key={index} className="border-b pb-6 last:border-0">
                      <h3 className="font-medium mb-2">Question {index + 1}:</h3>
                      <p className="text-sm mb-4">{result.question}</p>
                      
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Your Answer:</h4>
                      <p className="text-sm mb-4 bg-secondary/30 p-3 rounded-md">
                        {result.answer}
                      </p>
                      
                      {result.feedback && (
                        <>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Feedback:</h4>
                          <p className="text-sm mb-4">{result.feedback}</p>
                        </>
                      )}
                      
                      {result.score !== undefined && (
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-2">Score:</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            result.score >= 8 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                              : result.score >= 6
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {result.score}/10
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                  <button 
                    onClick={() => setAppState('questions')}
                    className="px-4 py-2 border border-input rounded-md hover:bg-secondary transition-colors text-sm"
                  >
                    Back to Questions
                  </button>
                  <button 
                    onClick={() => {
                      setAppState('upload');
                      setFile(null);
                      setAnalysis(null);
                      setQuestions([]);
                      setResults([]);
                    }}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm"
                  >
                    Start New Session
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <AnimatedBackground />
      <Header />
      <main className="pt-8 pb-16">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
