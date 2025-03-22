
import React from 'react';
import { CheckCircle, XCircle, User, Briefcase, GraduationCap, Award, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export interface AnalysisResult {
  name: string;
  email: string;
  phone?: string;
  summary?: string;
  skills: string[];
  experience: {
    company: string;
    title: string;
    duration: string;
    description: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    year: string;
  }[];
  strengths: string[];
  weaknesses: string[];
  missingSkills?: string[];
}

interface ResumeAnalysisProps {
  analysis: AnalysisResult | null;
  isLoading: boolean;
  onViewQuestions: () => void;
}

const ResumeAnalysis: React.FC<ResumeAnalysisProps> = ({ analysis, isLoading, onViewQuestions }) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <Card className="glassmorphism overflow-hidden">
          <CardHeader className="bg-secondary/40 pb-4">
            <CardTitle className="text-xl">Analyzing Resume...</CardTitle>
            <CardDescription>
              Our AI is examining your resume. This may take a minute.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-32 bg-muted rounded animate-shimmer"></div>
                  <div className="h-10 w-full bg-muted rounded animate-shimmer"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 animate-fade-in space-y-6">
      <Card className="overflow-hidden shadow-md card-hover">
        <CardHeader className="bg-secondary/40 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{analysis.name}</CardTitle>
              <CardDescription>{analysis.email}</CardDescription>
            </div>
            <button 
              onClick={onViewQuestions}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm font-medium shadow-sm"
            >
              Generate Interview Questions
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {analysis.summary && (
            <div className="mb-6">
              <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                <User className="w-4 h-4" /> Summary
              </h3>
              <p className="text-sm">{analysis.summary}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                <Star className="w-4 h-4" /> Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysis.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs py-1 px-2">
                    {skill}
                  </Badge>
                ))}
              </div>

              <Separator className="my-6" />

              <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                <GraduationCap className="w-4 h-4" /> Education
              </h3>
              <div className="space-y-3">
                {analysis.education.map((edu, index) => (
                  <div key={index} className="text-sm">
                    <p className="font-medium">{edu.institution}</p>
                    <p>{edu.degree}</p>
                    <p className="text-muted-foreground">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                <Briefcase className="w-4 h-4" /> Experience
              </h3>
              <div className="space-y-4">
                {analysis.experience.map((exp, index) => (
                  <div key={index} className="text-sm">
                    <p className="font-medium">{exp.title}</p>
                    <p>{exp.company}</p>
                    <p className="text-muted-foreground">{exp.duration}</p>
                    <ul className="list-disc list-inside mt-1 text-xs space-y-1">
                      {exp.description.slice(0, 2).map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                <CheckCircle className="w-4 h-4 text-green-500" /> Strengths
              </h3>
              <ul className="space-y-2">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="text-sm flex gap-2">
                    <span className="text-green-500">•</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                <XCircle className="w-4 h-4 text-orange-500" /> Areas for Improvement
              </h3>
              <ul className="space-y-2">
                {analysis.weaknesses.map((weakness, index) => (
                  <li key={index} className="text-sm flex gap-2">
                    <span className="text-orange-500">•</span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {analysis.missingSkills && analysis.missingSkills.length > 0 && (
            <>
              <Separator className="my-6" />
              <div>
                <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                  <Award className="w-4 h-4 text-blue-500" /> Recommended Skills to Develop
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingSkills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs py-1 px-2">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeAnalysis;
