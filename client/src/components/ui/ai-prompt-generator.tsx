import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FaMagic, FaCopy, FaStar, FaMoon, FaDownload } from 'react-icons/fa';
import { useToast } from '@/hooks/use-toast';

// Prompt templates for different content types
const promptTemplates = {
  tarot: {
    name: 'Tarot Card Description',
    template: `Create a comprehensive description for the {CARD_NAME} tarot card with the following sections:
1. Symbolism - Describe the visual symbols and their meanings
2. Upright Meaning - {UPRIGHT_KEYWORDS}
3. Reversed Meaning - {REVERSED_KEYWORDS}
4. Element Association - {ELEMENT}
5. Astrological Connection - {ZODIAC}
6. Numerical Significance - {NUMBER}

Include how this card relates to {THEME} as a theme.`,
    variables: ['CARD_NAME', 'UPRIGHT_KEYWORDS', 'REVERSED_KEYWORDS', 'ELEMENT', 'ZODIAC', 'NUMBER', 'THEME'],
    icon: <FaMoon />
  },
  affirmation: {
    name: 'Affirmation Grid',
    template: `Create a set of 9 powerful affirmations around the theme of {THEME} with the following characteristics:
- Moon Phase: {MOON_PHASE}
- Element: {ELEMENT}
- Energy Type: {ENERGY_TYPE}

Each affirmation should:
1. Be present tense and positive
2. Evoke emotion and use sensory language
3. Align with the {CHAKRA} chakra energy
4. Support {GOAL} as an intention

Format as a numbered list of 9 affirmations that flow together as a cohesive set.`,
    variables: ['THEME', 'MOON_PHASE', 'ELEMENT', 'ENERGY_TYPE', 'CHAKRA', 'GOAL'],
    icon: <FaStar />
  },
  printable: {
    name: 'Printable Worksheet',
    template: `Design a printable worksheet for {PURPOSE} with the following sections:

1. Title: "{TITLE}"
2. Introduction: Brief explanation of {CONCEPT} and how it relates to {THEME}
3. Section 1: {SECTION_1_NAME} - Include {SECTION_1_PROMPTS}
4. Section 2: {SECTION_2_NAME} - Include {SECTION_2_PROMPTS}
5. Section 3: {SECTION_3_NAME} - Include {SECTION_3_PROMPTS}
6. Reflection Questions: 3-5 thought-provoking questions about {REFLECTION_FOCUS}
7. Closing Affirmation: A powerful statement about {AFFIRMATION_THEME}

Include minimal decorative elements with a {AESTHETIC} aesthetic.`,
    variables: ['PURPOSE', 'TITLE', 'CONCEPT', 'THEME', 'SECTION_1_NAME', 'SECTION_1_PROMPTS', 'SECTION_2_NAME', 'SECTION_2_PROMPTS', 'SECTION_3_NAME', 'SECTION_3_PROMPTS', 'REFLECTION_FOCUS', 'AFFIRMATION_THEME', 'AESTHETIC'],
    icon: <FaDownload />
  }
};

type PromptType = 'tarot' | 'affirmation' | 'printable';

interface AIPromptGeneratorProps {
  initialPromptType?: PromptType;
}

export const AIPromptGenerator: React.FC<AIPromptGeneratorProps> = ({ 
  initialPromptType = 'tarot' 
}) => {
  const { toast } = useToast();
  const [promptType, setPromptType] = useState<PromptType>(initialPromptType);
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  // Handle variable input change
  const handleVariableChange = (variable: string, value: string) => {
    setVariables(prev => ({
      ...prev,
      [variable]: value
    }));
  };

  // Generate prompt from template by replacing variables
  const generatePrompt = () => {
    let result = promptTemplates[promptType].template;
    
    // Replace all variables in the template
    promptTemplates[promptType].variables.forEach(variable => {
      const regex = new RegExp(`\\{${variable}\\}`, 'g');
      result = result.replace(regex, variables[variable] || `[${variable}]`);
    });
    
    setGeneratedPrompt(result);
    
    toast({
      title: "Prompt Generated",
      description: "Your AI prompt has been created successfully!",
    });
  };

  // Copy generated prompt to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast({
      title: "Copied to Clipboard",
      description: "Your prompt has been copied to clipboard.",
    });
  };

  return (
    <Card className="bg-[#0A192F] border-[#A3B18A]/30 shadow-lg">
      <CardHeader className="border-b border-[#A3B18A]/20">
        <CardTitle className="text-[#D4AF37] flex items-center">
          <FaMagic className="mr-2" /> AI Prompt Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[#FAF3E0]">Content Type</Label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(promptTemplates) as PromptType[]).map((type) => (
                <Button
                  key={type}
                  onClick={() => {
                    setPromptType(type);
                    setVariables({});
                    setGeneratedPrompt('');
                  }}
                  variant={promptType === type ? "default" : "outline"}
                  className={`flex-1 ${
                    promptType === type
                      ? "bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/80"
                      : "border-[#A3B18A]/30 text-[#A3B18A]"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-2">{promptTemplates[type].icon}</span>
                    <span>{promptTemplates[type].name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-[#FAF3E0]">Variable Input</Label>
              <Badge variant="outline" className="bg-[#0A192F]">
                {promptTemplates[promptType].variables.length} Variables
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {promptTemplates[promptType].variables.map((variable) => (
                <div key={variable} className="space-y-1">
                  <Label htmlFor={variable} className="text-xs text-[#FAF3E0]">
                    {variable.replace(/_/g, ' ')}
                  </Label>
                  <Input
                    id={variable}
                    value={variables[variable] || ''}
                    onChange={(e) => handleVariableChange(variable, e.target.value)}
                    placeholder={`Enter ${variable.toLowerCase().replace(/_/g, ' ')}`}
                    className="bg-[#0A192F]/60 border-[#A3B18A]/30"
                  />
                </div>
              ))}
            </div>
          </div>

          {generatedPrompt && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-[#FAF3E0]">Generated Prompt</Label>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyToClipboard}
                  className="text-xs border-[#A3B18A] text-[#A3B18A]"
                >
                  <FaCopy className="mr-1" /> Copy
                </Button>
              </div>
              <div className="relative">
                <Textarea
                  value={generatedPrompt}
                  readOnly
                  rows={8}
                  className="font-mono text-sm bg-[#0A192F]/80 border-[#A3B18A]/30"
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t border-[#A3B18A]/20 pt-4">
        <Button
          onClick={generatePrompt}
          className="w-full bg-[#D4AF37] text-[#0A192F] hover:bg-[#D4AF37]/80"
        >
          <FaMagic className="mr-2" /> Generate AI Prompt
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIPromptGenerator;