import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { FileText, Sparkles, ScrollText, PenSquare, Book, MoonStar, Star, BookMarked } from 'lucide-react';

interface ContentOffering {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  icon: React.ReactNode;
  category: string;
  isFeatured?: boolean;
  buttonText: string;
  buttonLink: string;
}

const ContentOfferings: React.FC = () => {
  const offerings: ContentOffering[] = [
    {
      id: 'tarot-deck-descriptions',
      title: 'Tarot Deck Descriptions',
      description: 'Create professional descriptions for tarot cards that resonate with your audience. Includes upright and reversed meanings, affirmations, and journal prompts.',
      benefits: [
        'Complete major and minor arcana coverage',
        'Personalized card meanings and interpretations',
        'Spiritual and psychological insights for each card',
        'Compatible with all deck styles and traditions'
      ],
      icon: <MoonStar className="h-6 w-6" />,
      category: 'Tarot',
      isFeatured: true,
      buttonText: 'Explore Tarot Content',
      buttonLink: '/content-creator?type=tarot'
    },
    {
      id: 'affirmation-collections',
      title: 'Affirmation Collections',
      description: 'Generate themed affirmation sets for daily practice, social media content, or products. Custom tailored to specific intentions, moon phases, or chakras.',
      benefits: [
        'Authentic and resonant positive statements',
        'Categories by intention, chakra, or moon phase',
        'Ready for social media or product creation',
        'Personalized to your audience\'s needs'
      ],
      icon: <Star className="h-6 w-6" />,
      category: 'Affirmations',
      buttonText: 'Create Affirmations',
      buttonLink: '/content-creator?type=affirmations'
    },
    {
      id: 'journal-prompts',
      title: 'Journal Prompts',
      description: 'Craft thought-provoking journal prompts for spiritual exploration, shadow work, manifestation, and personal growth.',
      benefits: [
        'Deep, transformative questioning',
        'Themed collections for specific practices',
        'Progression-based prompt sequences',
        'Shadow work and inner child exploration'
      ],
      icon: <PenSquare className="h-6 w-6" />,
      category: 'Journaling',
      buttonText: 'Generate Prompts',
      buttonLink: '/content-creator?type=journal'
    },
    {
      id: 'ritual-guides',
      title: 'Ritual & Ceremony Guides',
      description: 'Create detailed guides for spiritual rituals, ceremonies, and practices tied to moon phases, seasons, or specific intentions.',
      benefits: [
        'Step-by-step ritual instructions',
        'Customized for specific traditions',
        'Seasonal and astrological alignments',
        'Supply lists and preparation guidance'
      ],
      icon: <ScrollText className="h-6 w-6" />,
      category: 'Rituals',
      buttonText: 'Design Rituals',
      buttonLink: '/content-creator?type=rituals'
    },
    {
      id: 'ebook-workbooks',
      title: 'eBooks & Workbooks',
      description: 'Generate outlines and content for spiritual eBooks, workbooks, and digital products to sell or use as lead magnets.',
      benefits: [
        'Structured chapter outlines',
        'Exercise and activity suggestions',
        'Integration questions and reflection prompts',
        'Ready for design and publication'
      ],
      icon: <Book className="h-6 w-6" />,
      category: 'Digital Products',
      isFeatured: true,
      buttonText: 'Create Digital Products',
      buttonLink: '/content-creator?type=ebooks'
    },
    {
      id: 'course-content',
      title: 'Course Content & Modules',
      description: 'Develop comprehensive outlines and content for online courses, workshops, and educational materials in the spiritual niche.',
      benefits: [
        'Module and lesson structure development',
        'Learning objectives and outcomes',
        'Exercise and homework suggestions',
        'Assessment and certification components'
      ],
      icon: <BookMarked className="h-6 w-6" />,
      category: 'Courses',
      buttonText: 'Design Course Content',
      buttonLink: '/content-creator?type=courses'
    },
    {
      id: 'social-media-content',
      title: 'Social Media Content Calendar',
      description: 'Plan and create engaging social media content with captions, hashtags, and post ideas for spiritual entrepreneurs and practitioners.',
      benefits: [
        'Month-long content calendar planning',
        'Platform-specific optimized content',
        'Engagement-focused captions and calls to action',
        'Trending hashtag recommendations'
      ],
      icon: <Sparkles className="h-6 w-6" />,
      category: 'Social Media',
      buttonText: 'Plan Social Content',
      buttonLink: '/content-creator?type=social'
    },
    {
      id: 'website-copy',
      title: 'Website Copy & SEO',
      description: 'Create compelling website copy for spiritual businesses, including About pages, service descriptions, and SEO-optimized content.',
      benefits: [
        'Conversion-focused page copy',
        'Brand voice development and consistency',
        'SEO keyword integration',
        'Spiritual industry-specific terminology'
      ],
      icon: <FileText className="h-6 w-6" />,
      category: 'Website',
      buttonText: 'Write Website Copy',
      buttonLink: '/content-creator?type=website'
    }
  ];

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-playfair font-bold text-[#0A192F] mb-4">Content Creation Capabilities</h2>
        <p className="text-[#0A192F]/80 max-w-3xl mx-auto text-lg">
          The Digital Grimoire enables you to create a wide variety of mystical and spiritual content for your brand, clients, and products. Explore our specialized content generation tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {offerings.map((offering) => (
          <Card 
            key={offering.id} 
            className={`bg-white border-2 h-full flex flex-col ${
              offering.isFeatured ? 'border-[#D4AF37]' : 'border-[#0A192F]/10'
            }`}
          >
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-md ${offering.isFeatured ? 'bg-[#D4AF37]/10' : 'bg-[#0A192F]/5'}`}>
                  {React.cloneElement(offering.icon as React.ReactElement, { 
                    className: `h-6 w-6 ${offering.isFeatured ? 'text-[#D4AF37]' : 'text-[#0A192F]'}`
                  })}
                </div>
                <div>
                  <CardTitle className="text-lg font-medium text-[#0A192F]">{offering.title}</CardTitle>
                  <Badge variant="outline" className="mt-1 text-xs bg-[#0A192F]/5 text-[#0A192F]">
                    {offering.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-[#0A192F]/80 mb-4 text-sm">
                {offering.description}
              </p>
              <div className="mt-4">
                <p className="text-sm font-medium text-[#0A192F] mb-2">Benefits:</p>
                <ul className="space-y-1">
                  {offering.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start text-sm text-[#0A192F]/80">
                      <span className="text-[#D4AF37] mr-2">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="pt-4 border-t border-[#0A192F]/10">
              <Button
                className={`w-full ${
                  offering.isFeatured 
                    ? 'bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white' 
                    : 'bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]'
                }`}
                asChild
              >
                <Link href={offering.buttonLink}>
                  {offering.buttonText}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-2xl font-playfair text-[#0A192F] mb-4">Need Custom Content?</h3>
        <p className="text-[#0A192F]/80 max-w-2xl mx-auto mb-6">
          Our premium members can request custom content types and specialized templates for their unique spiritual practices and business needs.
        </p>
        <Button 
          variant="outline" 
          className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white"
          asChild
        >
          <Link href="/membership">
            Upgrade Membership
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ContentOfferings;