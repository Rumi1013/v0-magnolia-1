import React from 'react';
import { Label } from './label';
import { Input } from './input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Textarea } from './textarea';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { FaBook, FaPalette, FaTable, FaPen, FaGlobe, FaDownload } from 'react-icons/fa';

interface ContentTypeFormProps {
  contentType: string;
  setContentType: (value: string) => void;
  contentTitle: string;
  setContentTitle: (value: string) => void;
  contentDescription: string;
  setContentDescription: (value: string) => void;
  contentCategory: string;
  setContentCategory: (value: string) => void;
  contentMedium: string;
  setContentMedium: (value: string) => void;
  contentTheme: string;
  setContentTheme: (value: string) => void;
  contentFormat: string;
  setContentFormat: (value: string) => void;
  onPropertiesUpdate: () => void;
}

const ContentTypeForm: React.FC<ContentTypeFormProps> = ({
  contentType,
  setContentType,
  contentTitle,
  setContentTitle,
  contentDescription,
  setContentDescription,
  contentCategory,
  setContentCategory,
  contentMedium,
  setContentMedium,
  contentTheme,
  setContentTheme,
  contentFormat,
  setContentFormat,
  onPropertiesUpdate
}) => {
  const handleInputChange = (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setter(e.target.value);
    setTimeout(onPropertiesUpdate, 100); // Update properties after state update
  };

  const handleSelectChange = (setter: (value: string) => void) => (value: string) => {
    setter(value);
    setTimeout(onPropertiesUpdate, 100); // Update properties after state update
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-full space-y-2">
          <Label htmlFor="content-type" className="text-[#FAF3E0]">Content Type</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div
              className={`cursor-pointer p-3 rounded-md border transition-all flex flex-col items-center text-center ${
                contentType === 'general'
                  ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                  : 'border-[#A3B18A]/30 hover:border-[#A3B18A]/70 text-[#FAF3E0]'
              }`}
              onClick={() => handleSelectChange(setContentType)('general')}
            >
              <div className="h-10 w-10 rounded-full flex items-center justify-center mb-2 bg-[#0A192F]/70">
                <FaTable className={contentType === 'general' ? 'text-[#D4AF37]' : 'text-[#A3B18A]'} />
              </div>
              <span className="text-sm font-medium">General Content</span>
            </div>
            
            <div
              className={`cursor-pointer p-3 rounded-md border transition-all flex flex-col items-center text-center ${
                contentType === 'ebook'
                  ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                  : 'border-[#A3B18A]/30 hover:border-[#A3B18A]/70 text-[#FAF3E0]'
              }`}
              onClick={() => handleSelectChange(setContentType)('ebook')}
            >
              <div className="h-10 w-10 rounded-full flex items-center justify-center mb-2 bg-[#0A192F]/70">
                <FaBook className={contentType === 'ebook' ? 'text-[#D4AF37]' : 'text-[#A3B18A]'} />
              </div>
              <span className="text-sm font-medium">eBook</span>
            </div>
            
            <div
              className={`cursor-pointer p-3 rounded-md border transition-all flex flex-col items-center text-center ${
                contentType === 'artwork'
                  ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                  : 'border-[#A3B18A]/30 hover:border-[#A3B18A]/70 text-[#FAF3E0]'
              }`}
              onClick={() => handleSelectChange(setContentType)('artwork')}
            >
              <div className="h-10 w-10 rounded-full flex items-center justify-center mb-2 bg-[#0A192F]/70">
                <FaPalette className={contentType === 'artwork' ? 'text-[#D4AF37]' : 'text-[#A3B18A]'} />
              </div>
              <span className="text-sm font-medium">Artwork</span>
            </div>
            
            <div
              className={`cursor-pointer p-3 rounded-md border transition-all flex flex-col items-center text-center ${
                contentType === 'blog'
                  ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                  : 'border-[#A3B18A]/30 hover:border-[#A3B18A]/70 text-[#FAF3E0]'
              }`}
              onClick={() => handleSelectChange(setContentType)('blog')}
            >
              <div className="h-10 w-10 rounded-full flex items-center justify-center mb-2 bg-[#0A192F]/70">
                <FaPen className={contentType === 'blog' ? 'text-[#D4AF37]' : 'text-[#A3B18A]'} />
              </div>
              <span className="text-sm font-medium">Blog Post</span>
            </div>
            
            <div
              className={`cursor-pointer p-3 rounded-md border transition-all flex flex-col items-center text-center ${
                contentType === 'service'
                  ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                  : 'border-[#A3B18A]/30 hover:border-[#A3B18A]/70 text-[#FAF3E0]'
              }`}
              onClick={() => handleSelectChange(setContentType)('service')}
            >
              <div className="h-10 w-10 rounded-full flex items-center justify-center mb-2 bg-[#0A192F]/70">
                <FaGlobe className={contentType === 'service' ? 'text-[#D4AF37]' : 'text-[#A3B18A]'} />
              </div>
              <span className="text-sm font-medium">Website Service</span>
            </div>
            
            <div
              className={`cursor-pointer p-3 rounded-md border transition-all flex flex-col items-center text-center ${
                contentType === 'printable'
                  ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                  : 'border-[#A3B18A]/30 hover:border-[#A3B18A]/70 text-[#FAF3E0]'
              }`}
              onClick={() => handleSelectChange(setContentType)('printable')}
            >
              <div className="h-10 w-10 rounded-full flex items-center justify-center mb-2 bg-[#0A192F]/70">
                <FaDownload className={contentType === 'printable' ? 'text-[#D4AF37]' : 'text-[#A3B18A]'} />
              </div>
              <span className="text-sm font-medium">Printable</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 col-span-full md:col-span-1">
          <Label htmlFor="content-title" className="text-[#FAF3E0]">Title</Label>
          <Input
            id="content-title"
            value={contentTitle}
            onChange={handleInputChange(setContentTitle)}
            placeholder="Enter a title for your content"
            className="bg-[#0A192F]/60 border-[#A3B18A]/30 text-[#FAF3E0]"
          />
        </div>
        
        <div className="space-y-2 col-span-full md:col-span-1">
          {contentType === 'general' && (
            <>
              <Label htmlFor="content-category" className="text-[#FAF3E0]">Category</Label>
              <Select 
                value={contentCategory} 
                onValueChange={handleSelectChange(setContentCategory)}
              >
                <SelectTrigger className="bg-[#0A192F]/60 border-[#A3B18A]/30 text-[#FAF3E0]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-[#0A192F] border-[#A3B18A]/30 text-[#FAF3E0]">
                  <SelectItem value="Tarot">Tarot</SelectItem>
                  <SelectItem value="Affirmation">Affirmation</SelectItem>
                  <SelectItem value="Printable">Printable</SelectItem>
                  <SelectItem value="Astrology">Astrology</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}
          
          {contentType === 'ebook' && (
            <>
              <Label htmlFor="content-format" className="text-[#FAF3E0]">Format</Label>
              <Select 
                value={contentFormat} 
                onValueChange={handleSelectChange(setContentFormat)}
              >
                <SelectTrigger className="bg-[#0A192F]/60 border-[#A3B18A]/30 text-[#FAF3E0]">
                  <SelectValue placeholder="Select a format" />
                </SelectTrigger>
                <SelectContent className="bg-[#0A192F] border-[#A3B18A]/30 text-[#FAF3E0]">
                  <SelectItem value="PDF">PDF</SelectItem>
                  <SelectItem value="EPUB">EPUB</SelectItem>
                  <SelectItem value="Mobi">Mobi</SelectItem>
                  <SelectItem value="Print-Ready">Print-Ready</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}
          
          {contentType === 'artwork' && (
            <>
              <Label htmlFor="content-medium" className="text-[#FAF3E0]">Medium</Label>
              <Select 
                value={contentMedium} 
                onValueChange={handleSelectChange(setContentMedium)}
              >
                <SelectTrigger className="bg-[#0A192F]/60 border-[#A3B18A]/30 text-[#FAF3E0]">
                  <SelectValue placeholder="Select a medium" />
                </SelectTrigger>
                <SelectContent className="bg-[#0A192F] border-[#A3B18A]/30 text-[#FAF3E0]">
                  <SelectItem value="digital">Digital</SelectItem>
                  <SelectItem value="physical">Physical</SelectItem>
                  <SelectItem value="both">Both Digital & Physical</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}
        </div>
        
        <div className="space-y-2 col-span-full">
          <Label htmlFor="content-description" className="text-[#FAF3E0]">Description</Label>
          <Textarea
            id="content-description"
            value={contentDescription}
            onChange={handleInputChange(setContentDescription)}
            placeholder="Enter a description for your content"
            rows={3}
            className="bg-[#0A192F]/60 border-[#A3B18A]/30 text-[#FAF3E0]"
          />
        </div>
      </div>

      {(contentType === 'ebook' || contentType === 'artwork') && (
        <Card className="bg-[#0A192F]/60 border-[#A3B18A]/30">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <h3 className="font-medium text-[#D4AF37] mr-2">Style Options</h3>
                <Badge variant="outline" className="bg-[#0A192F] text-xs text-[#FAF3E0]">Optional</Badge>
              </div>
              
              <div className="space-y-3">
                <Label className="text-[#FAF3E0]">Visual Theme</Label>
                <RadioGroup 
                  value={contentTheme} 
                  onValueChange={handleSelectChange(setContentTheme)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Modern" id="modern" className="border-[#A3B18A]" />
                    <Label htmlFor="modern" className="text-[#FAF3E0]">Modern</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Vintage" id="vintage" className="border-[#A3B18A]" />
                    <Label htmlFor="vintage" className="text-[#FAF3E0]">Vintage</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Mystical" id="mystical" className="border-[#A3B18A]" />
                    <Label htmlFor="mystical" className="text-[#FAF3E0]">Mystical</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Minimalist" id="minimalist" className="border-[#A3B18A]" />
                    <Label htmlFor="minimalist" className="text-[#FAF3E0]">Minimalist</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentTypeForm;