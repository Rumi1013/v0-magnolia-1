import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import ContentWorkflowManager, { ContentDestination, ContentMetadata, ContentType } from './ContentWorkflowManager';

import { 
  Wand2, MoonStar, BookOpen, ScrollText, FileText, 
  Calendar, Clock, Image, Instagram, MessageCircle, 
  Mail, Star, Sparkles, Loader2, ArrowRight,
  Download, Clipboard, Save, Share2, X
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Types for AI content generation
type AIGeneratorType = 
  'tarot-reading' | 
  'affirmations' | 
  'content-brief' | 
  'product-description' | 
  'image-prompts' | 
  'worksheet' | 
  'moon-phase-content' | 
  'workflow-steps';

type MoonPhase = 'new' | 'waxing-crescent' | 'first-quarter' | 'waxing-gibbous' | 'full' | 'waning-gibbous' | 'last-quarter' | 'waning-crescent';

interface AIGeneratorOption {
  id: AIGeneratorType;
  title: string;
  description: string;
  icon: React.ReactNode;
  endpoint: string;
  formFields: AIFormField[];
  premium: boolean;
}

interface AIFormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'slider' | 'switch' | 'checkbox';
  placeholder?: string;
  options?: {value: string, label: string}[];
  defaultValue?: any;
  min?: number;
  max?: number;
  required?: boolean;
}

// AI Generator Options
const aiGeneratorOptions: AIGeneratorOption[] = [
  {
    id: 'tarot-reading',
    title: 'Tarot Reading Generator',
    description: 'Generate insightful tarot readings based on specific queries or intentions.',
    icon: <Star className="h-5 w-5" />,
    endpoint: '/api/openai/tarot-reading',
    premium: false,
    formFields: [
      {
        name: 'query',
        label: 'Reading Focus',
        type: 'textarea',
        placeholder: 'What specific question or area of life would you like this reading to focus on?',
        required: true
      },
      {
        name: 'numCards',
        label: 'Number of Cards',
        type: 'select',
        options: [
          {value: '1', label: '1-Card Draw (Simple)'},
          {value: '3', label: '3-Card Spread (Past, Present, Future)'},
          {value: '5', label: '5-Card Spread (Detailed)'},
          {value: '7', label: '7-Card Spread (In-depth)'}
        ],
        defaultValue: '3'
      },
      {
        name: 'includeRemedies',
        label: 'Include Remedies & Actions',
        type: 'switch',
        defaultValue: true
      }
    ]
  },
  {
    id: 'affirmations',
    title: 'Affirmation Generator',
    description: 'Create powerful, personalized affirmations based on your mood, theme, and intention.',
    icon: <MoonStar className="h-5 w-5" />,
    endpoint: '/api/openai/affirmations',
    premium: false,
    formFields: [
      {
        name: 'theme',
        label: 'Theme',
        type: 'select',
        options: [
          {value: 'abundance', label: 'Abundance & Prosperity'},
          {value: 'self-love', label: 'Self-Love & Acceptance'},
          {value: 'health', label: 'Health & Vitality'},
          {value: 'creativity', label: 'Creativity & Inspiration'},
          {value: 'relationships', label: 'Relationships & Connection'},
          {value: 'peace', label: 'Peace & Calm'},
          {value: 'confidence', label: 'Confidence & Empowerment'},
          {value: 'gratitude', label: 'Gratitude & Appreciation'}
        ],
        defaultValue: 'self-love'
      },
      {
        name: 'mood',
        label: 'Current Mood',
        type: 'select',
        options: [
          {value: 'anxious', label: 'Anxious'},
          {value: 'fearful', label: 'Fearful'},
          {value: 'stressed', label: 'Stressed'},
          {value: 'sad', label: 'Sad'},
          {value: 'hopeful', label: 'Hopeful'},
          {value: 'inspired', label: 'Inspired'},
          {value: 'neutral', label: 'Neutral'}
        ],
        defaultValue: 'neutral'
      },
      {
        name: 'count',
        label: 'Number of Affirmations',
        type: 'slider',
        min: 3,
        max: 10,
        defaultValue: 5
      }
    ]
  },
  {
    id: 'content-brief',
    title: 'Content Brief Creator',
    description: 'Generate comprehensive content briefs for blog posts, newsletters, or social media content.',
    icon: <ScrollText className="h-5 w-5" />,
    endpoint: '/api/openai/content-brief',
    premium: true,
    formFields: [
      {
        name: 'contentType',
        label: 'Content Type',
        type: 'select',
        options: [
          {value: 'blog', label: 'Blog Post'},
          {value: 'newsletter', label: 'Newsletter'},
          {value: 'social', label: 'Social Media Post'},
          {value: 'ebook', label: 'eBook/Guide'}
        ],
        defaultValue: 'blog'
      },
      {
        name: 'topic',
        label: 'Topic',
        type: 'text',
        placeholder: 'Enter your content topic',
        required: true
      },
      {
        name: 'keywords',
        label: 'Keywords (comma-separated)',
        type: 'text',
        placeholder: 'astrology, moon phases, ritual, etc.',
      },
      {
        name: 'audience',
        label: 'Target Audience',
        type: 'select',
        options: [
          {value: 'beginners', label: 'Beginners in spirituality'},
          {value: 'intermediate', label: 'Intermediate practitioners'},
          {value: 'advanced', label: 'Advanced practitioners'},
          {value: 'all', label: 'All levels'}
        ],
        defaultValue: 'all'
      }
    ]
  },
  {
    id: 'moon-phase-content',
    title: 'Moon Phase Content',
    description: 'Generate content ideas, rituals, and practices aligned with specific moon phases.',
    icon: <MoonStar className="h-5 w-5" />,
    endpoint: '/api/openai/moon-phase-content',
    premium: true,
    formFields: [
      {
        name: 'moonPhase',
        label: 'Moon Phase',
        type: 'select',
        options: [
          {value: 'new', label: 'New Moon'},
          {value: 'waxing-crescent', label: 'Waxing Crescent'},
          {value: 'first-quarter', label: 'First Quarter'},
          {value: 'waxing-gibbous', label: 'Waxing Gibbous'},
          {value: 'full', label: 'Full Moon'},
          {value: 'waning-gibbous', label: 'Waning Gibbous'},
          {value: 'last-quarter', label: 'Last Quarter'},
          {value: 'waning-crescent', label: 'Waning Crescent'}
        ],
        defaultValue: 'full'
      },
      {
        name: 'contentFormat',
        label: 'Content Format',
        type: 'select',
        options: [
          {value: 'ritual', label: 'Ritual'},
          {value: 'journal-prompts', label: 'Journal Prompts'},
          {value: 'meditation', label: 'Guided Meditation'},
          {value: 'blog-outline', label: 'Blog Post Outline'},
          {value: 'social-posts', label: 'Social Media Content'},
          {value: 'affirmations', label: 'Affirmations'}
        ],
        defaultValue: 'ritual'
      },
      {
        name: 'zodiacSign',
        label: 'Zodiac Sign (if applicable)',
        type: 'select',
        options: [
          {value: 'none', label: 'Not applicable'},
          {value: 'aries', label: 'Aries'},
          {value: 'taurus', label: 'Taurus'},
          {value: 'gemini', label: 'Gemini'},
          {value: 'cancer', label: 'Cancer'},
          {value: 'leo', label: 'Leo'},
          {value: 'virgo', label: 'Virgo'},
          {value: 'libra', label: 'Libra'},
          {value: 'scorpio', label: 'Scorpio'},
          {value: 'sagittarius', label: 'Sagittarius'},
          {value: 'capricorn', label: 'Capricorn'},
          {value: 'aquarius', label: 'Aquarius'},
          {value: 'pisces', label: 'Pisces'}
        ],
        defaultValue: 'none'
      }
    ]
  },
  {
    id: 'worksheet',
    title: 'Worksheet Generator',
    description: 'Create printable worksheets for journaling, reflection, and spiritual practice.',
    icon: <FileText className="h-5 w-5" />,
    endpoint: '/api/openai/worksheet',
    premium: true,
    formFields: [
      {
        name: 'worksheetType',
        label: 'Worksheet Type',
        type: 'select',
        options: [
          {value: 'journal', label: 'Journaling Prompts'},
          {value: 'reflection', label: 'Self-Reflection Exercise'},
          {value: 'planning', label: 'Ritual Planning'},
          {value: 'tracking', label: 'Habit/Practice Tracking'},
          {value: 'oracle', label: 'Oracle/Tarot Spread Guide'}
        ],
        defaultValue: 'journal'
      },
      {
        name: 'topic',
        label: 'Topic/Theme',
        type: 'text',
        placeholder: 'Enter the main topic or theme',
        required: true
      },
      {
        name: 'sections',
        label: 'Number of Sections/Prompts',
        type: 'slider',
        min: 3,
        max: 15,
        defaultValue: 7
      },
      {
        name: 'includePrintInstructions',
        label: 'Include Printing Instructions',
        type: 'switch',
        defaultValue: true
      }
    ]
  },
  {
    id: 'image-prompts',
    title: 'Image Prompt Generator',
    description: 'Generate detailed prompts for AI image generation tools like Midjourney or DALL-E.',
    icon: <Image className="h-5 w-5" />,
    endpoint: '/api/openai/image-prompts',
    premium: true,
    formFields: [
      {
        name: 'subject',
        label: 'Subject',
        type: 'text',
        placeholder: 'What would you like to see in the image?',
        required: true
      },
      {
        name: 'style',
        label: 'Art Style',
        type: 'select',
        options: [
          {value: 'digital-art', label: 'Digital Art'},
          {value: 'fantasy', label: 'Fantasy'},
          {value: 'realistic', label: 'Realistic'},
          {value: 'watercolor', label: 'Watercolor'},
          {value: 'oil-painting', label: 'Oil Painting'},
          {value: 'mystical', label: 'Mystical/Ethereal'},
          {value: 'vintage', label: 'Vintage/Retro'},
          {value: 'cinematic', label: 'Cinematic'}
        ],
        defaultValue: 'mystical'
      },
      {
        name: 'mood',
        label: 'Mood/Atmosphere',
        type: 'select',
        options: [
          {value: 'ethereal', label: 'Ethereal'},
          {value: 'dark', label: 'Dark/Mysterious'},
          {value: 'serene', label: 'Serene/Peaceful'},
          {value: 'vibrant', label: 'Vibrant/Energetic'},
          {value: 'dreamy', label: 'Dreamy/Soft'},
          {value: 'dramatic', label: 'Dramatic/Intense'}
        ],
        defaultValue: 'ethereal'
      },
      {
        name: 'imageModel',
        label: 'Target AI Model',
        type: 'select',
        options: [
          {value: 'midjourney', label: 'Midjourney'},
          {value: 'dalle', label: 'DALL-E'},
          {value: 'stable-diffusion', label: 'Stable Diffusion'},
          {value: 'generic', label: 'Generic/Any Model'}
        ],
        defaultValue: 'midjourney'
      }
    ]
  },
  {
    id: 'product-description',
    title: 'Product Description Generator',
    description: 'Create compelling descriptions for spiritual or mystical products and services.',
    icon: <Sparkles className="h-5 w-5" />,
    endpoint: '/api/openai/product-description',
    premium: false,
    formFields: [
      {
        name: 'productName',
        label: 'Product Name',
        type: 'text',
        placeholder: 'Enter the name of your product or service',
        required: true
      },
      {
        name: 'productType',
        label: 'Product Type',
        type: 'select',
        options: [
          {value: 'physical', label: 'Physical Product (Crystal, Herb, etc.)'},
          {value: 'digital', label: 'Digital Product (Ebook, Guide, etc.)'},
          {value: 'service', label: 'Service (Reading, Consultation, etc.)'},
          {value: 'course', label: 'Course/Workshop'},
          {value: 'subscription', label: 'Subscription/Membership'}
        ],
        defaultValue: 'physical'
      },
      {
        name: 'keyBenefits',
        label: 'Key Benefits (comma-separated)',
        type: 'text',
        placeholder: 'healing, clarity, protection, etc.'
      },
      {
        name: 'descriptionLength',
        label: 'Description Length',
        type: 'select',
        options: [
          {value: 'short', label: 'Short (50-100 words)'},
          {value: 'medium', label: 'Medium (150-250 words)'},
          {value: 'long', label: 'Long (300-500 words)'}
        ],
        defaultValue: 'medium'
      }
    ]
  },
  {
    id: 'workflow-steps',
    title: 'Workflow Steps Generator',
    description: 'Generate step-by-step workflows for your spiritual or creative business practices.',
    icon: <Wand2 className="h-5 w-5" />,
    endpoint: '/api/openai/generate-workflow-steps',
    premium: true,
    formFields: [
      {
        name: 'workflowType',
        label: 'Workflow Type',
        type: 'select',
        options: [
          {value: 'content-creation', label: 'Content Creation'},
          {value: 'client-onboarding', label: 'Client Onboarding'},
          {value: 'ritual-preparation', label: 'Ritual Preparation'},
          {value: 'workshop-planning', label: 'Workshop Planning'},
          {value: 'product-launch', label: 'Product Launch'},
          {value: 'social-media', label: 'Social Media Planning'}
        ],
        defaultValue: 'content-creation'
      },
      {
        name: 'description',
        label: 'Workflow Description',
        type: 'textarea',
        placeholder: 'Describe what you want your workflow to accomplish',
        required: true
      },
      {
        name: 'complexity',
        label: 'Complexity',
        type: 'select',
        options: [
          {value: 'simple', label: 'Simple (3-5 steps)'},
          {value: 'medium', label: 'Medium (6-10 steps)'},
          {value: 'complex', label: 'Complex (11-15 steps)'}
        ],
        defaultValue: 'medium'
      },
      {
        name: 'includeResources',
        label: 'Include Recommended Tools/Resources',
        type: 'switch',
        defaultValue: true
      }
    ]
  }
];

// Mock function to simulate an API call for generating AI content
const generateMockContent = async (generatorType: AIGeneratorType, formData: any): Promise<string> => {
  // This is a placeholder for actual API calls
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResponses: Record<AIGeneratorType, string> = {
        'tarot-reading': `# Tarot Reading: ${formData.query || 'Your Path Forward'}\n\n## Card 1: The High Priestess (Past)\nThe High Priestess represents intuition, unconscious knowledge, and inner wisdom. In the position of the past, this card suggests that you've recently been developing your intuitive abilities and connecting with your inner voice. There may have been situations where you relied on your intuition rather than logical reasoning, and this has served you well.\n\n## Card 2: The Wheel of Fortune (Present)\nThe Wheel of Fortune signifies cycles, destiny, and pivotal moments. In your present position, this indicates that you're at a turning point in your life. Events may seem to be happening by chance, but there's a greater pattern at work. This is a time of change and opportunity—the wheel is turning in your favor.\n\n## Card 3: The Star (Future)\nThe Star brings hope, inspiration, and renewed faith. In the position of your future, this beautiful card promises healing, optimism, and a period of peace after difficulty. New opportunities for growth and creativity will present themselves. This is a time to follow your dreams and trust that the universe is supporting your journey.\n\n## Interpretation & Guidance\nThis spread tells a story of spiritual awakening and transformation. You've been developing your intuition (High Priestess), and now you're experiencing a significant turning point (Wheel of Fortune) that will lead to a period of hope and inspiration (The Star).\n\nThis is a highly positive reading that suggests you're on the right path. The challenges you've faced have prepared you for this moment of change, and brighter days are ahead. Trust in the process and remain open to the opportunities that come your way.\n\n${formData.includeRemedies ? '## Recommended Actions\n1. **Practice Meditation**: To further strengthen your connection to your intuition.\n2. **Embrace Change**: Say yes to new opportunities, even if they seem intimidating.\n3. **Follow Your Inspiration**: Make time for creative projects and activities that bring you joy.\n4. **Set Intentions**: Work with the moon cycles to set and manifest your intentions.\n5. **Express Gratitude**: Keep a gratitude journal to maintain a positive outlook.' : ''}`,
        
        'affirmations': `# Daily Affirmations: ${formData.theme ? formData.theme.charAt(0).toUpperCase() + formData.theme.slice(1) : 'Self-Love'}\n\n1. I am worthy of love and respect, exactly as I am.\n2. I embrace my unique qualities and celebrate my authentic self.\n3. My body is a sacred vessel that deserves care and appreciation.\n4. I release all self-criticism and choose to speak to myself with kindness.\n5. Every day, I grow more comfortable in my own skin.\n\n## How to Use These Affirmations\n- Repeat each affirmation aloud while looking in the mirror each morning\n- Write your favorite affirmation in your journal or on sticky notes around your home\n- Record them in your own voice and listen during meditation\n- Breathe deeply as you recite them, allowing the words to sink into your subconscious\n\n## Personalization Tips\nFeel free to adjust these affirmations to make them feel more authentic to you. Adding your name can make them more powerful, such as "[Your Name], you are worthy of love and respect."`,
        
        'content-brief': `# Content Brief: ${formData.topic || 'Lunar Rituals for Beginners'}\n\n## Overview\nThis ${formData.contentType || 'blog post'} will serve as a comprehensive introduction to lunar rituals for readers who are new to moon-based spiritual practices. It will explain the significance of the moon in various spiritual traditions, outline basic rituals for each moon phase, and provide practical tips for getting started.\n\n## Target Audience\n${formData.audience === 'beginners' ? 'Complete beginners to spiritual practices who are curious about working with moon energy.' : formData.audience === 'intermediate' ? 'Readers with some spiritual practice experience who want to deepen their connection to lunar cycles.' : formData.audience === 'advanced' ? 'Experienced practitioners looking to refine their lunar practice with advanced techniques.' : 'Spiritual seekers of all levels who are interested in incorporating moon rituals into their practice.'}\n\n## Key Points to Cover\n1. **Introduction to Lunar Energy**\n   - Brief explanation of moon phases and their energetic qualities\n   - Historical significance of moon rituals across cultures\n   - How moon cycles affect us emotionally and spiritually\n\n2. **Basic Ritual Components**\n   - Creating sacred space\n   - Essential tools and materials\n   - Setting intentions aligned with lunar energy\n   - Cleansing and charging objects by moonlight\n\n3. **Rituals for Each Moon Phase**\n   - New Moon: Setting intentions and planting seeds\n   - Waxing Moon: Building energy and taking action\n   - Full Moon: Celebration, manifestation, and release\n   - Waning Moon: Letting go, banishing, and reflection\n\n4. **Simple Starter Ritual**\n   - Step-by-step guide for a basic full moon ritual\n   - Modifications for indoor/outdoor practice\n   - Journal prompts for reflection\n\n5. **Incorporating Lunar Awareness Daily**\n   - Moon tracking methods\n   - Quick daily practices\n   - Recommended resources for deepening practice\n\n## Tone & Style\n- Warm, inviting, and non-intimidating\n- Practical with a touch of mystery\n- Respectful of diverse spiritual paths\n- Emphasize personal connection over rigid rules\n\n## SEO Considerations\nPrimary Keyword: lunar rituals for beginners\nSecondary Keywords: moon phases, full moon ritual, new moon intentions, moon cycle spirituality\n\n## Call to Action\nEncourage readers to download your moon phase calendar, join your lunar newsletter, or share their first ritual experience in the comments.\n\n## Visuals to Include\n- Diagram of moon phases\n- Photos of simple altar setups\n- Infographic on correspondences between moon phases and intentions`,
        
        'product-description': `# ${formData.productName || 'Crystal Moon Elixir'} - Product Description\n\n## Short Description\nHarness the transformative energy of selenite and moonstone with our ${formData.productName || 'Crystal Moon Elixir'}. This hand-crafted essence combines the clarifying power of selenite with the intuitive, feminine energy of moonstone, created during the full moon to maximize its energetic potential. Perfect for ritual cleansing, meditation enhancement, or adding divine feminine energy to your sacred space.\n\n## Full Description\nThe ${formData.productName || 'Crystal Moon Elixir'} is a potent energetic tool crafted with intention under the illuminating rays of the full moon. Each bottle contains the vibrational essence of ethically sourced selenite and moonstone crystals, known for their powerful connection to lunar energy and the divine feminine.\n\nSelenite works to clear energetic blockages and purify spaces, while moonstone enhances intuition and connects you to the cyclical wisdom of the moon. Together, they create a harmonious blend that supports emotional balance, psychic awareness, and spiritual growth.\n\n### Key Benefits:\n- Enhances intuitive abilities and psychic awareness\n- Creates a protective, purifying barrier around your aura\n- Deepens meditation experiences and dreamwork\n- Strengthens connection to lunar cycles and feminine wisdom\n- Supports emotional healing and hormonal balance\n\n### How to Use:\n**Sacred Space Cleansing**: Add 3-5 drops to a room spray bottle with purified water and spritz around your home or altar space before rituals.\n\n**Ritual Bath**: Add 7 drops to warm bathwater along with dried roses and lavender for a full moon renewal ritual.\n\n**Meditation Aid**: Place a single drop in the palm of your hand, rub hands together, and inhale deeply before entering meditation.\n\n**Chakra Balancing**: Apply a drop to your third eye or crown chakra to enhance spiritual connection during energy work.\n\n### Ingredients:\n100% alcohol-free preservation system, purified water, essence of selenite and moonstone, charged under the full moon in ${new Date().toLocaleDateString('en-US', {month: 'long', year: 'numeric'})}.\n\n### Product Details:\n- 1oz (30ml) glass bottle with dropper\n- Comes with a small selenite wand for amplification\n- Includes ritual guide card with suggested uses\n- Handcrafted in small batches during the full moon`,
        
        'image-prompts': `# AI Image Generation Prompts - ${formData.subject || 'Mystical Garden'}\n\n## Primary Prompt for ${formData.imageModel || 'Midjourney'}\n\n\`\`\`\n${formData.subject || 'A mystical garden'} at twilight, ${formData.mood || 'ethereal'} atmosphere, glowing runes embedded in ancient stone pathways, rare magical plants with luminescent blooms, moonlight filtering through crystalline trees, wispy trails of colored light hovering above flower beds, small fairies tending to giant mushrooms, reflection in a still pond showing another dimension, ${formData.style || 'digital art'} style, highly detailed, fantasy concept art, artstation trending, cinematic lighting, vibrant colors, 8k resolution\n\`\`\`\n\n## Variations & Alternative Approaches\n\n### Dawn Version\n\`\`\`\n${formData.subject || 'A mystical garden'} at dawn, morning mist, golden light breaking through ancient trees, ${formData.mood || 'ethereal'} atmosphere, dew-covered magical plants awakening, small creatures of light emerging from flowers, spell book open on a moss-covered altar, ${formData.style || 'digital art'} style, highly detailed, volumetric lighting, depth of field, artstation trending\n\`\`\`\n\n### Night Version\n\`\`\`\n${formData.subject || 'A mystical garden'} under a full moon, deep night, stars that form constellations connecting to plants below, glowing runes, magical creatures hiding among shadows, floating orbs of colored light, ancient standing stones covered in luminescent moss, ${formData.style || 'digital art'} style, ${formData.mood || 'ethereal'} atmosphere, dramatic lighting, rich colors, 8k, highly detailed\n\`\`\`\n\n### Macro/Detail Version\n\`\`\`\nClose-up detail of a magical plant in ${formData.subject || 'a mystical garden'}, intricate patterns on leaves revealing hidden symbols, tiny elemental beings living within the bloom, dew drops containing galaxies, ${formData.mood || 'ethereal'} ${formData.style || 'digital art'} style, extreme detail, macro photography inspired, shallow depth of field, vibrant colors, fantasy illustration\n\`\`\`\n\n## Tips for Better Results\n\n1. **Aspect Ratio Modifiers**\n   - Add --ar 16:9 for landscape cinematic views\n   - Add --ar 1:1 for perfect square compositions\n   - Add --ar 9:16 for portrait phone wallpapers\n\n2. **Style Refinements**\n   - Add "matte painting" for a more artistic, painted look\n   - Add "photorealistic" if you want a more realistic approach\n   - Add "concept art by [artist name]" to emulate a specific artist's style (e.g., "concept art by James Gurney")\n\n3. **Element Emphasis**\n   - To emphasize certain elements, place them earlier in your prompt\n   - Add "intricate details," "highly detailed," or "8k" for more detail\n   - Use specific color palettes like "color palette: teal, purple, and gold" to control the mood\n\n4. **Specific to ${formData.imageModel || 'Midjourney'}**\n   - Use :: to separate and weight different parts of your prompt\n   - Add --stylize <number> to control stylization level\n   - Use --seed <number> to save a specific random seed for consistent results\n\nExperiment with these variations to find the perfect representation of your ${formData.subject || 'mystical garden'}!`,
        
        'worksheet': `# ${formData.worksheetType === 'journal' ? 'Journaling Prompts' : formData.worksheetType === 'reflection' ? 'Self-Reflection Exercise' : formData.worksheetType === 'planning' ? 'Ritual Planning Worksheet' : formData.worksheetType === 'tracking' ? 'Practice Tracking Sheet' : 'Oracle/Tarot Spread Guide'}: ${formData.topic || 'Connecting with Moon Energy'}\n\n## Introduction\nThis worksheet is designed to help you deepen your connection with lunar energy through reflective journaling. The moon has long been associated with intuition, emotions, and the subconscious mind. By working with these prompts during different moon phases, you'll develop a more intimate relationship with both the moon's energy and your inner landscape.\n\n## Instructions\nFind a quiet, comfortable space where you won't be disturbed. Light a candle if desired, and take a few deep breaths to center yourself. Consider reading through all the prompts first, then coming back to answer them one by one. There are no right or wrong answers—this practice is about personal exploration and discovery.\n\n---\n\n## Prompts\n\n### Section 1: Your Relationship with Lunar Energy\n\n1. **Describe your earliest memory or connection with the moon. How did you feel in its presence?**\n   \n   ____________________________________________________________\n   \n   ____________________________________________________________\n   \n   ____________________________________________________________\n\n2. **Which moon phase do you feel most drawn to, and why?**\n   \n   ____________________________________________________________\n   \n   ____________________________________________________________\n   \n   ____________________________________________________________\n\n3. **How does your energy and mood shift during different moon phases? Have you noticed any patterns?**\n   \n   ____________________________________________________________\n   \n   ____________________________________________________________\n   \n   ____________________________________________________________\n\n### Section 2: New Moon Reflections\n\n4. **What seeds of intention would you like to plant during this lunar cycle?**\n   \n   ____________________________________________________________\n   \n   ____________________________________________________________\n   \n   ____________________________________________________________\n\n5. **What must you release or clear away to make space for these new beginnings?**\n   \n   ____________________________________________________________\n   \n   ____________________________________________________________\n   \n   ____________________________________________________________\n\n6. **What specific actions will support the growth of your intentions?**\n   \n   ____________________________________________________________\n   \n   ____________________________________________________________\n   \n   ____________________________________________________________\n\n### Section 3: Full Moon Reflections\n\n7. **What has come to fruition or become illuminated in your life since the last new moon?**\n   \n   ____________________________________________________________\n   \n   ____________________________________________________________\n   \n   ____________________________________________________________\n\n8. **What emotions or insights are surfacing now that need to be acknowledged?**\n   \n   ____________________________________________________________\n   \n   ____________________________________________________________\n   \n   ____________________________________________________________\n\n9. **What are you ready to release or transform under the full moon's light?**\n   \n   ____________________________________________________________\n   \n   ____________________________________________________________\n   \n   ____________________________________________________________\n\n### Section 4: Moon-Aligned Practices\n\n10. **Describe a simple ritual or practice you could perform during the new moon:**\n    \n    ____________________________________________________________\n    \n    ____________________________________________________________\n    \n    ____________________________________________________________\n\n11. **Describe a simple ritual or practice you could perform during the full moon:**\n    \n    ____________________________________________________________\n    \n    ____________________________________________________________\n    \n    ____________________________________________________________\n\n12. **How might you incorporate lunar awareness into your daily life?**\n    \n    ____________________________________________________________\n    \n    ____________________________________________________________\n    \n    ____________________________________________________________\n\n### Section 5: Reflective Integration\n\n13. **What has working with this worksheet revealed to you about yourself?**\n    \n    ____________________________________________________________\n    \n    ____________________________________________________________\n    \n    ____________________________________________________________\n\n---\n\n## Closing Reflection\nTake a moment to express gratitude for this time of reflection and for the moon's constant presence in our lives. Consider revisiting these prompts regularly as you deepen your practice.\n\n${formData.includePrintInstructions ? '## Printing Instructions\nFor best results, print this worksheet on 8.5" x 11" paper. Consider using parchment paper or other specialty paper to enhance the mystical feeling. Leave ample space between prompts for writing, or print the prompts alone and use a separate journal for responses. You may wish to add lunar symbols or personal touches to customize your worksheet.' : ''}`,
        
        'moon-phase-content': `# ${formData.contentFormat === 'ritual' ? 'Full Moon Ritual' : formData.contentFormat === 'journal-prompts' ? 'Journal Prompts' : formData.contentFormat === 'meditation' ? 'Guided Meditation' : formData.contentFormat === 'blog-outline' ? 'Blog Post Outline' : formData.contentFormat === 'social-posts' ? 'Social Media Content' : 'Affirmations'} for the ${formData.moonPhase === 'new' ? 'New Moon' : formData.moonPhase === 'waxing-crescent' ? 'Waxing Crescent Moon' : formData.moonPhase === 'first-quarter' ? 'First Quarter Moon' : formData.moonPhase === 'waxing-gibbous' ? 'Waxing Gibbous Moon' : formData.moonPhase === 'full' ? 'Full Moon' : formData.moonPhase === 'waning-gibbous' ? 'Waning Gibbous Moon' : formData.moonPhase === 'last-quarter' ? 'Last Quarter Moon' : 'Waning Crescent Moon'}\n\n${formData.contentFormat === 'ritual' ? `## Sacred Full Moon Release Ritual\n\n### Purpose\nThis ritual harnesses the illuminating and culminating energy of the full moon to bring awareness to what no longer serves you and to release it with intention. The full moon represents completion, illumination, and the height of power—making it the perfect time to celebrate achievements and let go of what's holding you back.\n\n### Timing\nIdeally performed within 3 days before or after the full moon, with the exact full moon night being most potent. This ritual is most effective when done outdoors under the moonlight, but can be adapted for indoor practice.\n\n### Materials Needed\n- White or silver candle\n- Fire-safe bowl or cauldron\n- Small pieces of paper\n- Pen with blue or black ink\n- Moon water (water charged under a previous full moon)\n- Cleansing herbs (sage, lavender, or rosemary)\n- Crystal associated with release (black tourmaline, obsidian, or selenite)\n- Optional: Fresh flowers, additional candles, incense\n\n### Space Preparation\n1. Clean your ritual space physically before beginning\n2. Create a comfortable seating area with cushions or a chair\n3. Arrange your materials on a small table or altar cloth\n4. Place your crystal at the center of your space\n5. Create a circle of protection using salt, crystals, or visualization\n\n### Ritual Steps\n\n#### 1. Opening the Sacred Space\nLight your candle and cleansing herbs, saying:\n\n*"I call upon the light of the full moon to illuminate this sacred space. As this candle burns, may clarity, wisdom, and truth be present here. I am open to release and transformation."*\n\nTake three deep breaths, centering yourself in the present moment.\n\n#### 2. Gratitude Practice\nBefore focusing on release, acknowledge what has manifested or completed in your life since the last new moon. Speak aloud three things you're grateful for, saying after each:\n\n*"Under this full moon, I celebrate and give thanks for [achievement/manifestation]."*\n\n#### 3. Identification of Release\nReflect on what you're ready to release—limiting beliefs, unhelpful patterns, relationships that no longer serve you, or old goals that are no longer aligned with your path.\n\nOn small pieces of paper, write what you wish to release. One item per paper. Be specific and honest.\n\n#### 4. Release Ceremony\nHold each paper, read it aloud, then say:\n\n*"Under the witness of the full moon, I acknowledge and release [item to release]. It no longer serves my highest good. I transmute this energy and reclaim my power."*\n\nBurn the paper in your fire-safe bowl (if safe to do so) or tear it into tiny pieces.\n\n#### 5. Cleansing Bath\nSprinkle your moon water over your head and hands (or immerse your hands in it), saying:\n\n*"I am cleansed, I am renewed, I am open to receive the blessings that await me."*\n\n#### 6. Closing the Ritual\nHold your crystal and set an intention for the coming waning moon phase, saying:\n\n*"As the moon now begins to wane, I commit to letting go more deeply. What I have released tonight continues to diminish. I walk forward lighter and more aligned with my true path. So it is."*\n\nExtinguish your candle or allow it to burn down completely if it's safe to do so.\n\n### After the Ritual\n- Record your experience in your journal\n- Place the ashes from your burning papers in the earth, releasing them back to nature\n- Keep your crystal nearby during the waning moon phase as a reminder of your commitment to release\n- Notice signs or synchronicities related to your release in the coming days\n\n### Monthly Integration\nConsider performing this ritual monthly to develop a consistent practice of release and renewal in alignment with lunar cycles. Each month, you may find deeper layers to release as you continue your spiritual growth journey.` : formData.contentFormat === 'journal-prompts' ? `## Full Moon Journal Prompts\n\n### Introduction\nThe full moon illuminates our inner landscape, bringing to light what has previously been hidden in shadow. It represents culmination, clarity, and the height of intuitive power. Use these journal prompts during the full moon phase (within 3 days before or after) to gain insights, celebrate achievements, and identify what's ready to be released.\n\n### Setting the Space\nBefore you begin writing, create a sacred journaling environment:\n- Find a quiet, comfortable space\n- Light a white, silver, or blue candle\n- Play soft, ambient music if desired\n- Place a moon-associated crystal nearby (selenite, moonstone, or clear quartz)\n- Take three deep breaths to center yourself\n\n### Reflection Prompts\n\n#### Illumination & Awareness\n1. What situation in my life is being "illuminated" under this full moon's light? What am I seeing more clearly now?\n\n2. When I look at my reflection by the light of the full moon, what aspects of myself am I most proud of? What growth do I recognize?\n\n3. What patterns or cycles have I noticed in my emotional landscape since the last full moon?\n\n4. If the full moon could speak directly to me about what I need to understand right now, what would it say?\n\n5. What truth am I ready to acknowledge that I've been avoiding or not fully facing?\n\n#### Celebration & Gratitude\n6. What seeds that I planted at the new moon have now come to fruition or shown significant progress?\n\n7. What three achievements, no matter how small, can I celebrate under this full moon's light?\n\n8. How have my spiritual practices evolved or deepened since the last full moon?\n\n9. What unexpected gifts or blessings have appeared in my life during this lunar cycle?\n\n10. Who has supported my growth during this moon cycle, and how can I express my gratitude to them?\n\n#### Release & Letting Go\n11. What limiting beliefs or thought patterns am I ready to release under this full moon?\n\n12. What relationship dynamics no longer serve my highest good and need transformation or release?\n\n13. What emotions have I been carrying that are ready to be acknowledged and released with compassion?\n\n14. What old goals or plans am I holding onto that no longer align with my authentic path?\n\n15. If I could energetically release one burden under this full moon's light, what would create the most space for new growth in my life?\n\n#### Integration & Moving Forward\n16. What message or lesson from this full moon do I want to carry forward into the waning phase?\n\n17. What practical steps can I take to honor the insights I've received today?\n\n18. How can I work with the waning moon energy to support the release of what I've identified today?\n\n19. What boundaries do I need to establish or reinforce as I move forward from this full moon?\n\n20. What am I most looking forward to exploring or experiencing in the coming lunar cycle?\n\n### Closing Reflection\nAfter completing your chosen prompts, close your journaling session by writing a short letter to the moon, expressing gratitude for its illumination and guidance. Sign and date your entry, and consider revisiting it at the next full moon to observe your journey.` : formData.contentFormat === 'meditation' ? `## Full Moon Guided Meditation Script\n\n### Preparation Notes\nThis meditation is designed to be read slowly, with pauses between each paragraph to allow for integration. Consider recording yourself reading it so you can fully immerse in the meditation experience, or share with others. The full meditation takes approximately 15-20 minutes.\n\n### Setting\nFind a comfortable place where you won't be disturbed. If possible, position yourself where you can see the full moon, or imagine its light filling your space. You may wish to light a white or silver candle and have a glass of water nearby.\n\n### Guided Meditation: Bathing in Moonlight Wisdom\n\n*Begin by taking a comfortable seat or lying down. Close your eyes and bring your awareness to your breath. Inhale deeply through your nose, filling your lungs completely, and exhale slowly through your mouth. Continue breathing naturally, allowing each breath to bring you deeper into relaxation.*\n\n*With each inhale, imagine drawing in silvery moonlight through the crown of your head. With each exhale, feel your body becoming heavier and more relaxed. Allow tension to melt away from your muscles as you sink deeper into this sacred moment.*\n\n*Become aware of the full moon above you, whether you can physically see it or not. Its luminous energy is present, bathing the Earth in gentle, reflective light. Feel its radiance touching your skin, like cool silk against your face and hands.*\n\n*Imagine roots extending from the base of your spine, reaching down into the Earth below you. These roots anchor you safely as you prepare to work with the powerful illuminating energy of the full moon.*\n\n*Visualize a sphere of moonlight forming around your body, creating a protective and nurturing space for this meditation. The sphere pulses gently with silvery-blue light, growing stronger with each breath you take.*\n\n*Now bring your attention to your heart center. See a small seed of light there, the same silvery-blue as the moonlight above. With each breath, this light expands, growing brighter and more radiant within your chest.*\n\n*As this light grows, it begins to illuminate aspects of your inner landscape. In this safe container, allow the moonlight to shine upon what needs to be seen right now. What is being revealed to you? What is reaching its fullness or completion in your life?*\n\n*The full moon illuminates not only what is ready to bloom but also what is ready to be released. Bring your awareness to anything you've been carrying that no longer serves your highest good—outdated beliefs, stagnant emotions, or attachments to outcomes that limit your growth.*\n\n*Visualize these elements as objects or symbols within your moonlight sphere. See them clearly, acknowledge their presence without judgment, and thank them for the lessons they've provided.*\n\n*Now, imagine the moonlight growing more intense, creating a gentle magnetic pull. This pulling energy begins to draw these outdated elements up and out of your energy field. Watch as they are lifted toward the moon, transmuted by its purifying light.*\n\n*Feel the spaciousness that remains as these elements leave. Notice the lightness, the openness, the possibility that resides in these spaces. The full moon has helped you clear what was ready to be released.*\n\n*Bring your awareness back to the seed of light in your heart. See how it has transformed into a luminous full moon within you, mirroring the one above. This inner moon is your intuitive wisdom, now more accessible than ever.*\n\n*Ask this inner moon what message it has for you at this time. What wisdom does it wish to share? What clarity is now available to you? Listen deeply and receive whatever comes without analysis or doubt.*\n\n*Express gratitude for this communion with both your inner moon and the celestial moon above. Feel their energies merging, creating a circuit of light that flows through you, connecting heaven and earth.*\n\n*Slowly begin to bring your awareness back to your physical body. Feel the points of contact between your body and the surface supporting you. Wiggle your fingers and toes, gently reawakening to the physical plane.*\n\n*When you're ready, take three deep breaths—inhaling the essence of what you wish to cultivate from this meditation, and exhaling any remaining heaviness or resistance.*\n\n*Slowly open your eyes, carrying the moonlight wisdom within you. The clarity and release you've experienced remains available to you in the days ahead.*\n\n### Integration\nAfter completing this meditation, consider sipping some water to ground your energy. You may wish to journal about your experience while it's still fresh, noting any insights, symbols, or messages you received. Return to this meditation monthly at the full moon to deepen your practice of illumination and release.` : formData.contentFormat === 'blog-outline' ? `# Full Moon in ${formData.zodiacSign !== 'none' ? formData.zodiacSign.charAt(0).toUpperCase() + formData.zodiacSign.slice(1) : 'Aries'}: Illuminating Your Path Forward\n\n## Blog Post Outline\n\n### Introduction (250-300 words)\n- Hook: Powerful opening about the intensity of the current full moon energy\n- Brief explanation of full moon significance (culmination, illumination, release)\n- Introduction to this specific full moon in ${formData.zodiacSign !== 'none' ? formData.zodiacSign.charAt(0).toUpperCase() + formData.zodiacSign.slice(1) : 'Aries'} and its unique qualities\n- Overview of what readers will learn from this post\n- Personal anecdote about your experience with this lunar energy\n\n### Section 1: Understanding the Full Moon in ${formData.zodiacSign !== 'none' ? formData.zodiacSign.charAt(0).toUpperCase() + formData.zodiacSign.slice(1) : 'Aries'} (300-400 words)\n- Astrological significance of this full moon\n- The qualities of ${formData.zodiacSign !== 'none' ? formData.zodiacSign.charAt(0).toUpperCase() + formData.zodiacSign.slice(1) : 'Aries'} energy (courage, initiation, passion, independence)\n- Current planetary aspects influencing this full moon\n- How this energy differs from the previous full moon\n- What parts of life this full moon is most likely to illuminate (relationships, career, personal identity, etc.)\n\n### Section 2: Signs and Synchronicities to Watch For (250-300 words)\n- Physical sensations associated with this full moon energy\n- Emotional patterns that may emerge during this time\n- Dreams and their significance during the full moon phase\n- Synchronicities that indicate alignment with lunar wisdom\n- Journal prompts for recognizing these signs in your own experience\n\n### Section 3: Full Moon Release Ritual (400-500 words)\n- Detailed instructions for a release ritual aligned with ${formData.zodiacSign !== 'none' ? formData.zodiacSign.charAt(0).toUpperCase() + formData.zodiacSign.slice(1) : 'Aries'} energy\n- Materials needed and their significance\n- Step-by-step process\n- Modifications for different experience levels\n- Timing considerations (best hours to perform the ritual)\n- Suggestions for crystal allies and herbal supports\n\n### Section 4: Harnessing the Full Moon for Shadow Work (300-350 words)\n- Explanation of shadow aspects that may emerge during this full moon\n- How to recognize projection versus authentic insight\n- Journaling prompts specifically for shadow exploration\n- Safe container practices for emotional processing\n- Signs that indicate healing and integration\n\n### Section 5: Moving Forward – Waning Moon Practices (250-300 words)\n- How to carry the illumination from the full moon into the waning phase\n- Daily practices to support continued release\n- Signs that your release work is taking effect\n- Preparation for the upcoming new moon\n- Calendar of important lunar dates for the next 2 weeks\n\n### Conclusion (150-200 words)\n- Recap of key points about this full moon\n- Encouragement for personal practice\n- Invitation to share experiences in comments\n- Final inspirational thought about working with lunar wisdom\n- What to expect in your next moon-related post\n\n### Additional Blog Elements to Include\n- Pull quotes highlighting key insights\n- Sidebar with quick full moon facts\n- Beautiful featured image of the full moon\n- Infographic showing the current moon phase and upcoming phases\n- Pinterest-optimized vertical image with key ritual steps\n- Downloadable full moon journal page\n- Author bio emphasizing your lunar expertise\n\n### SEO Considerations\n- Primary keyword: Full Moon in ${formData.zodiacSign !== 'none' ? formData.zodiacSign.charAt(0).toUpperCase() + formData.zodiacSign.slice(1) : 'Aries'}\n- Secondary keywords: full moon ritual, releasing ceremony, moon magic, lunar cycle, shadow work\n- Include keyword in title, first paragraph, at least one heading, and meta description\n- Alt text for all images including moon-related keywords\n- Internal links to previous moon content and related spiritual practices\n- External links to moon phase calendar and astrological references (cite sources)` : formData.contentFormat === 'social-posts' ? `# Full Moon Social Media Content Bundle\n\n## Content Strategy Overview\nThis bundle provides 10 social media posts designed for the Full Moon phase. These posts are crafted to educate, inspire, and engage your audience while establishing your expertise in lunar wisdom. The content is designed to be posted during the 3 days before, the day of, and 3 days after the Full Moon for maximum relevance.\n\n---\n\n## Instagram Carousel Post: Full Moon Ritual Guide\n\n### Caption:\n✨ FULL MOON MAGIC: YOUR STEP-BY-STEP RITUAL GUIDE ✨\n\nTonight's powerful Full Moon illuminates everything—including what you're ready to release. Save this guide for your Full Moon ceremony tonight! 🌕\n\nThe Full Moon represents culmination, clarity, and release. It's when the moon's illuminating power is at its peak, making it the perfect time to celebrate what's flourished and let go of what no longer serves you.\n\nWhat will you release under tonight's moonlight? Share in the comments below!\n\n#FullMoon #MoonRitual #LunarLiving #MoonMagic #SpiritualPractice #IntentionSetting #MysticCommunity #MidnightMagnolia\n\n### Carousel Slides:\n\n**Slide 1:**\nFULL MOON RITUAL GUIDE\n[Image: Beautiful full moon with title text overlay]\n\n**Slide 2:**\nSTEP 1: PREPARE YOUR SPACE\n- Cleanse your area with smoke or sound\n- Gather a candle, paper, pen, and fire-safe bowl\n- Fill a glass with water to place under the moonlight\n- Create a comfortable seat facing the moon if possible\n\n**Slide 3:**\nSTEP 2: GROUND & CENTER\n- Take 3 deep breaths\n- Feel your connection to the earth below\n- Visualize the moonlight entering through your crown\n- Set your intention for this ritual\n\n**Slide 4:**\nSTEP 3: ACKNOWLEDGE COMPLETION\n- Reflect on what has culminated since the New Moon\n- Write down 3 things you're grateful for\n- Celebrate your growth and achievements\n\n**Slide 5:**\nSTEP 4: IDENTIFY RELEASE\n- Write what you're ready to release on small papers\n- Be specific and honest\n- Hold each paper and read it aloud\n\n**Slide 6:**\nSTEP 5: RELEASE CEREMONY\n- Safely burn each paper (or tear into tiny pieces)\n- Say: "I release this with gratitude for its lessons"\n- Visualize these energies transforming into light\n\n**Slide 7:**\nSTEP 6: MOON WATER CLEANSING\n- Sprinkle some moon water over your hands\n- Wash away any remaining heaviness\n- Set your glass of water under the moonlight to charge\n\n**Slide 8:**\nSTEP 7: CLOSING & INTEGRATION\n- Express gratitude to the moon\n- Journal about your experience\n- Use your moon water in the coming days for continued release\n\n---\n\n## Short-Form Video Script: Full Moon Energy Explanation\n\n### Caption:\nUnderstanding Full Moon energy transformed my spiritual practice. Here's what you need to know about tonight's powerful lunar event! #FullMoonTips #MoonMagic #SpiritualTok\n\n### Video Script:\n[Open with you looking up at the moon or holding a moon prop]\n\n"The Full Moon isn't just a beautiful sight—it's a powerful energy portal. Here are 3 things you should know about tonight's Full Moon:" \n\n[Text on screen: "3 FULL MOON SECRETS"]\n\n"First, the Full Moon illuminates what's been hidden. Those emotions or situations you've been avoiding? Expect them to surface now. This isn't to punish you—it's a gift of awareness."\n\n[Text on screen: "1. ILLUMINATION"]\n\n"Second, Full Moon energy peaks for 3 days before and after the exact Full Moon. That means you have a full week to work with this energy—not just tonight!"\n\n[Text on screen: "2. EXTENDED INFLUENCE"]\n\n"Third, the Full Moon is the perfect time for release work. Write down what you're ready to let go of, then safely burn it while stating: 'I release this with gratitude for its lessons.'"\n\n[Text on screen: "3. POWERFUL RELEASE"]\n\n"Drop a '🌕' in the comments if you're doing a Full Moon ritual tonight! And tell me—what are you releasing under this moonlight?"\n\n---\n\n## Quote Post: Full Moon Wisdom\n\n### Caption:\nThe Full Moon doesn't create shadows—it simply reveals what has been there all along. What has tonight's Full Moon illuminated for you? ✨\n\nMoonlight carries the profound gift of clarity. When we embrace what it reveals—even the challenging parts—we create space for authentic growth.\n\nWhat shadows-turned-teachers have appeared in your life recently?\n\n#FullMoonWisdom #MoonQuotes #SpiritualJourney #ShadowWork #MoonMagic #LunarLiving #MoonCycle #MysticWisdom\n\n### Quote for Image:\n"The Full Moon illuminates both our greatest light and deepest shadows, asking only that we witness them with equal compassion."\n\n---\n\n## Educational Text Post: Full Moon Science + Spirituality\n\n### Caption:\nFull Moon Fascinat-ion: Where science meets spiritual practice 🌕✨\n\nWhile we connect with the Full Moon's metaphysical energy, there's also fascinating science behind why this lunar phase feels so powerful!\n\nDid you know the gravitational pull of the Full Moon is strong enough to cause measurable changes in Earth's water bodies? If it can pull oceans, imagine its subtle effects on our bodies (which are roughly 60% water)!\n\nMany dismiss "moon sensitivity" as superstition, yet numerous studies suggest connections between the lunar cycle and:\n- Sleep patterns\n- Hormonal fluctuations\n- Emotional sensitivity\n- Wildlife behavior\n\nOur ancestors lived by lunar rhythms for thousands of years before artificial light. That relationship is encoded in our collective consciousness.\n\nDo you notice changes in your energy, sleep, or emotions during the Full Moon? You're not imagining it—you're connecting to an ancient human experience.\n\n#FullMoonScience #LunarLiving #MoonMagic #ScienceAndSpirituality #CosmicConnection #MoonCycles #AncestralWisdom\n\n---\n\n## Story/Reel Prompts (Text Overlays for Visual Content)\n\n**Prompt 1:**\nTONIGHT: FULL MOON IN [ZODIAC SIGN]\nTime to release, reflect, and renew\n\n**Prompt 2:**\nFull Moon Crystal Allies:\n- Selenite (amplifies lunar energy)\n- Moonstone (intuitive insight)\n- Black Tourmaline (protection during release)\n- Labradorite (seeing beneath the surface)\n\n**Prompt 3:**\n3 THINGS TO DO UNDER TODAY'S FULL MOON:\n1. Charge your crystals and tools\n2. Perform a release ritual\n3. Journal about what's being illuminated\n\n**Prompt 4:**\nFull Moon Affirmation:\n"I release what no longer serves me with gratitude and grace. I stand in my authentic power, illuminated by moonlight wisdom."\n\n**Prompt 5:**\nDID YOU KNOW?\nTonight's Full Moon in [Zodiac Sign] brings powerful energy for [specific quality]. The perfect time for [specific activity]!\n\n---\n\n## Engagement Question Post\n\n### Caption:\nFULL MOON CHECK-IN ✨\n\nAs tonight's Full Moon illuminates the sky, let's create a sacred space to share our experiences.\n\nFull Moons often bring emotions to the surface and clarity to situations that have been developing since the New Moon.\n\nDrop a word or phrase in the comments describing the energy you're feeling under this Full Moon. Let's witness each other's journeys! 💫\n\nMy word is: [your personal response]\n\n#FullMoonCircle #MoonMagic #LunarLiving #MoonCommunity #CollectiveWisdom #MysticConnection #SpiritualJourney\n\n---\n\n## Product/Service Promotion (If Applicable)\n\n### Caption:\nHARNESS THE FULL MOON'S TRANSFORMATIVE ENERGY 🌕✨\n\nThe Full Moon illuminates our path and brings powerful energy for release and clarity—but sometimes we need guidance to work with this energy effectively.\n\n[PRODUCT/SERVICE NAME] helps you align with lunar wisdom through [brief description of benefits].\n\n"Working with [your name]'s lunar guidance transformed my relationship with the moon cycles. I now have practical tools to harness each phase's unique energy." - [Client Name]\n\n[Call to action - e.g., "Click the link in bio to explore my Full Moon Ritual Guide" or "Limited spots available for Full Moon Circle tomorrow night!"] \n\n#FullMoonMagic #LunarLiving #MoonRituals #SpiritualTools #MysticCommunity #MoonWisdom #SpiritualGrowth\n\n---\n\n## Behind-the-Scenes Preparation Post\n\n### Caption:\nPreparing for tonight's Full Moon 🌕✨\n\n[Share a brief personal story about how you're preparing for the Full Moon]\n\nMy Full Moon essentials:\n• Journal and favorite pen\n• Selenite and moonstone crystals\n• White candle and matches\n• Rose water for cleansing\n• Loose herbs for offerings\n\nCreating sacred space isn't about perfection—it's about presence and intention. Even a simple setup on your windowsill can become a powerful altar under moonlight.\n\nWhat are your Full Moon ritual essentials? Share below!\n\n#FullMoonPrep #MoonAltar #SacredSpace #LunarRitual #MoonPractice #MysticLiving #SpiritualTools\n\n---\n\n## Full Moon Wisdom Teaching\n\n### Caption:\nFULL MOON WISDOM: THE CYCLE OF CULMINATION AND RELEASE 🌕\n\nThe Full Moon represents the peak of the lunar cycle—energy fully expressed, seeds planted at the New Moon now bearing fruit.\n\nYet within this fullness lies the seed of release. After culmination comes letting go, making this phase powerful for both celebration and conscious release work.\n\nIn many traditions, the Full Moon teaches us about the natural cycle of all things:\n\n• Growth reaches its peak\n• We pause to appreciate completion\n• We identify what's ready to be released\n• We consciously let go to create space for the next cycle\n\nResisting this natural rhythm creates stagnation. When we hold onto what's completed its purpose, we block new growth.\n\nTonight, ask yourself:\n• What has reached completion in my life?\n• What am I ready to celebrate?\n• What am I still clinging to that's completed its purpose?\n• What needs to be released to create space for new growth?\n\nThe Full Moon illuminates these questions. Your answers light the path forward.\n\n#FullMoonTeachings #LunarWisdom #MoonCycles #SpiritualGrowth #CosmicLessons #MoonMagic #AncestralWisdom\n\n---\n\n## Day-After Integration Post\n\n### Caption:\nINTEGRATING FULL MOON INSIGHTS ✨\n\nThe morning after a powerful Full Moon often brings clarity. As the intensity of yesterday's peak lunar energy begins to wane, it's the perfect time to integrate what was illuminated.\n\nLast night's Full Moon showed me [brief personal share].\n\nIf you performed a release ritual, today is ideal for gentle self-care and reflection. The releasing process continues as the moon begins to wane.\n\nIntegration practices for today:\n• Journal about insights that surfaced\n• Drink plenty of water to support energetic cleansing\n• Spend time in nature to ground shifted energy\n• Rest if you experienced disrupted sleep\n• Notice what feels lighter or clearer today\n\nWhat did last night's Full Moon reveal to you? Share your experience below if it feels supportive.\n\n#FullMoonAftercare #LunarIntegration #MoonWisdom #SpiritualPractice #MoonMagic #ConsciousLiving #EnergeticCleansing\n\n---\n\n## Content Calendar Timing Suggestions\n\n**3 Days Before Full Moon:**\n- Educational Post about the upcoming Full Moon\n- Behind-the-Scenes Preparation\n\n**2 Days Before Full Moon:**\n- Full Moon Wisdom Teaching\n- Story/Reel Prompts about preparation\n\n**1 Day Before Full Moon:**\n- Engagement Question Post to build excitement\n- Product/Service Promotion if applicable\n\n**Full Moon Day:**\n- Instagram Carousel Ritual Guide\n- Quote Post\n- Multiple Stories/Reels showing your personal practice\n\n**1 Day After Full Moon:**\n- Integration Post\n- Share user-generated content from those who tagged you\n\n**2-3 Days After Full Moon:**\n- Short-Form Video reflecting on the Full Moon energy\n- Start teasing the upcoming waning moon practices` : formData.contentFormat === 'affirmations' ? `# Full Moon Affirmations for Illumination and Release\n\n## Introduction\nThe Full Moon represents the peak of lunar energy—a time of culmination, clarity, and release. These affirmations are designed to align your consciousness with the illuminating and releasing qualities of Full Moon energy. Use them during the Full Moon phase (the day before, day of, and day after the Full Moon) for greatest resonance.\n\n## How to Use These Affirmations\n- Choose 3-5 affirmations that particularly resonate with your current journey\n- Speak them aloud while gazing at the moon (if possible)\n- Write them on paper and place under moonlight to charge\n- Use as journaling prompts, expanding on each with personal reflections\n- Record them in your own voice and listen during meditation\n- Place them around your home on sticky notes as reminders\n\n## Illumination Affirmations\n\n1. I welcome the full light of awareness into all aspects of my being.\n\n2. As the moon illuminates the night sky, clarity dawns within my consciousness.\n\n3. I see myself fully and embrace all that I discover with compassion.\n\n4. Divine light reveals the truth that sets me free.\n\n5. I am open to receiving insights, messages, and clarity under this Full Moon.\n\n6. My intuition shines brightly, guiding me toward my highest good.\n\n7. I acknowledge my growth and celebrate how far I've come.\n\n8. The wisdom I seek is now revealing itself to me in perfect timing.\n\n9. I recognize patterns in my life with clarity and objectivity.\n\n10. My inner knowing glows with the same brilliance as the Full Moon.\n\n11. I honor the cycle of growth that has brought me to this moment of culmination.\n\n12. What once was hidden now comes to light for my healing and transformation.\n\n13. I am receptive to the messages and signs the universe is sending me.\n\n14. My path forward is illuminated with each step revealed in divine timing.\n\n15. I witness my emotions with clarity and compassion, neither suppressing nor indulging them.\n\n## Release Affirmations\n\n16. I release what no longer serves my highest good with gratitude for its lessons.\n\n17. As I exhale, I let go of outdated beliefs, patterns, and attachments.\n\n18. I create space for new blessings by releasing what has completed its purpose in my life.\n\n19. Letting go is an act of self-love that I embrace fully.\n\n20. I release the need to control outcomes and surrender to divine timing.\n\n21. I forgive myself and others, setting us all free.\n\n22. The Full Moon witnesses my conscious release of [specific thing you're releasing].\n\n23. I shed old identities that limit my authentic expression.\n\n24. With each breath, I release tension from my body and mind.\n\n25. I let go of perfectionism and embrace the beauty of my human journey.\n\n26. I release comparison and competition, honoring my unique path.\n\n27. I am safe to let go of what was and welcome what is becoming.\n\n28. I release energetic cords that drain my vitality and reclaim my power.\n\n29. I let go of the stories that keep me small and embrace expansive possibilities.\n\n30. Just as the moon releases its fullness to begin a new cycle, I too release and renew.\n\n## Balance & Integration Affirmations\n\n31. I stand in perfect balance between holding on and letting go.\n\n32. I integrate the wisdom revealed by moonlight into my daily consciousness.\n\n33. I honor both the light and shadow aspects of myself with equal compassion.\n\n34. I am both powerful and vulnerable, strong and soft, being and becoming.\n\n35. I trust the natural cycles of growth, culmination, release, and renewal.\n\n36. I embrace both action and rest as sacred parts of my spiritual practice.\n\n37. My inner wisdom guides me to know what to keep and what to release.\n\n38. I celebrate my accomplishments while remaining open to further growth.\n\n39. I balance giving and receiving, filling my cup so I can serve from abundance.\n\n40. As the Full Moon balances the sun's reflection, I balance my masculine and feminine energies.\n\n## Personalization\nTo make these affirmations even more powerful, personalize them by:\n\n- Adding your name: "[Your name], you release what no longer serves you..."\n- Being specific about what you're releasing or celebrating\n- Connecting them to the specific zodiac sign of the current Full Moon\n- Adjusting the language to match your spiritual practice or beliefs\n\n## Full Moon Journal Prompts\nExtend your affirmation practice with these complementary journal prompts:\n\n1. How has the energy of this affirmation appeared in my life recently?\n2. What resistance do I feel when speaking this affirmation?\n3. If I fully embodied this affirmation, how would my life be different?\n4. What specific action can I take to align more fully with this truth?\n5. How does speaking this affirmation make me feel in my body?` : `## Workflow Steps Generator\n\n### Content Creation Workflow for Spiritual Entrepreneurs\n\n#### Overview\nThis comprehensive content creation workflow helps spiritual entrepreneurs and practitioners create aligned, impactful content that resonates with their audience while maintaining authenticity and spiritual integrity. This workflow integrates practical content strategy with intuitive practices for a balanced approach.\n\n#### Phase 1: Intuitive Planning & Alignment\n\n**Step 1: Energy Alignment Check-in**\n- Create a sacred space for your content planning session\n- Light a candle and set an intention for your content work\n- Meditate for 5-10 minutes to center yourself\n- Journal: "How can my content best serve at this time?"\n- Note any intuitive hits, images, or themes that arise\n\n**Step 2: Moon Phase & Seasonal Alignment**\n- Consult lunar calendar to identify current and upcoming moon phases\n- Review seasonal themes, holidays, or cosmic events (equinoxes, etc.)\n- Consider how these energies align with your offerings and message\n- Map content themes to these natural cycles for the next 4-6 weeks\n- Select 2-3 priority themes that feel most aligned and timely\n\n**Step 3: Oracle/Tarot Guidance (Optional)**\n- Pull a card for each selected theme to gain deeper insight\n- Journal about how the card imagery and meaning enhances your understanding\n- Ask: "What aspect of this theme needs to be highlighted now?"\n- Record key words, symbols, or messages that emerge\n- Take photos of your cards for visual inspiration later\n\n**Step 4: Audience Attunement**\n- Review recent client questions, comments, or feedback\n- Check in with where your ideal client is in their journey\n- Journal: "What are my audience's current challenges and desires?"\n- Identify the intersection between timely themes and audience needs\n- Prioritize content that serves both the collective energy and individual needs\n\n#### Phase 2: Strategic Content Development\n\n**Step 5: Content Type Selection**\n- Based on themes and audience needs, decide on content formats:\n  * Educational posts (carousel, blog, video)\n  * Inspirational content (quotes, stories)\n  * Interactive content (polls, questions, challenges)\n  * Promotional content (offers, services)\n  * Behind-the-scenes/personal shares\n- Aim for a balanced mix with emphasis on value-first content\n\n**Step 6: Content Batch Planning**\n- Create a content calendar template (use Notion, Google Sheets, or paper planner)\n- Map your themes to specific dates and content types\n- Plan in 2-week batches minimum (1-month ideal)\n- Include space for spontaneous/intuitive content\n- Mark key dates: product launches, events, cosmic events\n\n**Step 7: Resource Collection**\n- Gather visual inspiration that aligns with your themes\n- Collect relevant quotes, books, teachings to reference\n- Review your own content archive for repurposing opportunities\n- Create a folder structure to organize resources by theme\n- Research relevant keywords if SEO is important for your platform\n\n**Step 8: Content Creation Template Setup**\n- Create templates for each content type to streamline creation\n- Include sections for:\n  * Hook/opener\n  * Main teaching/value points\n  * Personal story/example\n  * Actionable takeaway\n  * Engagement question\n  * Call to action (when appropriate)\n  * Hashtags (if applicable)\n\n#### Phase 3: Sacred Creation Process\n\n**Step 9: Grounding Ritual Before Creation**\n- Clear your workspace physically and energetically\n- Connect with your higher purpose for sharing content\n- Set a timer for focused creation (25-50 minute blocks)\n- Turn off distractions and notifications\n- Take three deep breaths and set an intention for flow state\n\n**Step 10: Batch Writing Content Drafts**\n- Focus on writing all similar content types together\n- Start with outlines before full drafts\n- Write from your authentic voice without self-editing initially\n- Include personal stories and examples to illustrate points\n- After drafting, take a movement break to integrate\n\n**Step 11: Visual Creation & Curation**\n- Select or create images that align with your content energy\n- Maintain consistent brand aesthetics while allowing seasonal variation\n- Create graphic templates for quotes and educational content\n- If using stock photos, energetically clear and set intention for them\n- Batch edit photos and graphics in one session\n\n**Step 12: Heart-Centered Editing**\n- Review content from both strategic and intuitive perspectives\n- Check that each piece aligns with your authentic voice and values\n- Ensure content provides genuine value and clear takeaways\n- Refine language for clarity, impact, and accessibility\n- Add relevant keywords naturally if optimizing for search\n\n#### Phase 4: Implementation & Engagement\n\n**Step 13: Content Scheduling**\n- Choose optimal posting times based on audience activity\n- Schedule content using your preferred tool\n- Balance automated posting with real-time engagement\n- Leave space for intuitive, in-the-moment content\n- Set calendar reminders for live content opportunities\n\n**Step 14: Energetic Launch Ritual**\n- Before publishing, hold each piece of content in your awareness\n- Set an intention for how it will serve those who encounter it\n- Visualize your content reaching those who need it most\n- Express gratitude for the opportunity to share your wisdom\n- Release attachment to specific outcomes or metrics\n\n**Step 15: Mindful Community Engagement**\n- Set aside dedicated time for meaningful engagement\n- Respond to comments with genuine presence and care\n- Ask follow-up questions to deepen conversations\n- Notice themes in feedback for future content inspiration\n- Express gratitude for community participation\n\n**Step 16: Reflection & Integration**\n- Weekly review: What content resonated most with your audience?\n- Notice patterns without judgment or attachment\n- Journal about insights gathered through the creation process\n- Note any resistance that arose and its potential message\n- Celebrate wins and completion of your content cycle\n\n#### Recommended Tools & Resources\n\n**Planning & Organization**\n- Notion or Trello for content mapping\n- Google Calendar or physical planner for scheduling\n- Moon calendar app or lunar journal\n- Voice memo app for capturing intuitive insights\n\n**Content Creation**\n- Canva or Adobe Express for graphics\n- Google Docs or Notion for collaborative writing\n- Unsplash, Pexels for aligned stock photography\n- Grammarly for basic editing assistance\n\n**Publishing & Scheduling**\n- Later, Planoly, or Meta Business Suite for social scheduling\n- WordPress or Squarespace for blog content\n- Mailchimp or Flodesk for email content\n- Google Analytics or platform insights for content performance\n\n**Spiritual Support**\n- Oracle or tarot cards for creative inspiration\n- Crystals for workspace (clear quartz for clarity, amethyst for intuition)\n- Essential oils for focus and creativity (rosemary, frankincense)\n- Meditation app with creativity-focused practices\n\n#### Integration Tips\n\n1. Start with implementing just phases 1 & 2 if this workflow feels overwhelming\n2. Customize steps based on your personal practice and business needs\n3. Consider batching all similar tasks (writing, visuals, scheduling) together\n4. Honor the natural ebbs and flows of creative energy\n5. Review and refine this workflow quarterly to ensure it continues to serve\n\nThis workflow creates a sustainable rhythm that honors both the practical needs of content creation and the sacred nature of sharing spiritual wisdom. Adjust and personalize it to align with your unique gifts and business model.`
      };
      
      return mockResponses[generatorType];
    }, 1500);
  });
};

// Interface for the form values state
interface FormValues {
  [key: string]: any;
}

const AIContentGenerator: React.FC = () => {
  const { toast } = useToast();
  const [activeGenerator, setActiveGenerator] = useState<AIGeneratorOption | null>(null);
  const [formValues, setFormValues] = useState<FormValues>({});
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false); // Simulated subscription status
  const [workflowOpen, setWorkflowOpen] = useState<boolean>(false);
  
  // Reset form values when switching generators
  const handleGeneratorChange = (generator: AIGeneratorOption) => {
    // Initialize with default values from the generator
    const initialValues: FormValues = {};
    
    generator.formFields.forEach(field => {
      if (field.defaultValue !== undefined) {
        initialValues[field.name] = field.defaultValue;
      }
    });
    
    setFormValues(initialValues);
    setActiveGenerator(generator);
    setGeneratedContent("");
  };
  
  // Handle form field changes
  const handleInputChange = (field: AIFormField, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [field.name]: value
    }));
  };
  
  // Handle content generation
  const handleGenerateContent = async () => {
    if (!activeGenerator) return;
    
    // Check if user is subscribed for premium content
    if (activeGenerator.premium && !isSubscribed) {
      toast({
        title: "Premium Feature",
        description: "This generator is only available to premium subscribers.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate required fields
    const missingFields = activeGenerator.formFields
      .filter(field => field.required && !formValues[field.name])
      .map(field => field.label);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in the following fields: " + missingFields.join(", "),
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // In a real application, this would be an API call
      const content = await generateMockContent(activeGenerator.id, formValues);
      setGeneratedContent(content);
      
      toast({
        title: "Content Generated",
        description: "Your AI-generated content is ready!",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Function to copy generated content
  const handleCopyContent = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Copied to Clipboard",
      description: "Your generated content has been copied.",
    });
  };
  
  // Function to start content workflow
  const handleStartWorkflow = () => {
    setWorkflowOpen(true);
  };
  
  // Handle workflow completion
  const handleWorkflowComplete = (destination: ContentDestination, metadata: ContentMetadata) => {
    toast({
      title: "Content Workflow Complete",
      description: "Your content has been successfully saved to " + destination,
    });
    
    // Reset workflow state
    setWorkflowOpen(false);
    setGeneratedContent("");
    setActiveGenerator(null);
  };
  
  // Content type mapping from generator to workflow
  const mapGeneratorToContentType = (generator: AIGeneratorOption | null): ContentType => {
    if (!generator) return 'blog';
    
    switch (generator.id) {
      case 'tarot-reading':
        return 'ritual';
      case 'affirmations':
        return 'ritual';
      case 'content-brief':
        return 'blog';
      case 'moon-phase-content':
        return 'ritual';
      case 'worksheet':
        return 'resource';
      case 'image-prompts':
        return 'resource';
      case 'product-description':
        return 'product';
      case 'workflow-steps':
        return 'resource';
      default:
        return 'blog';
    }
  };
  
  // Format markdown content to HTML for display
  const formatMarkdownToHtml = (markdown: string) => {
    if (!markdown) return '';
    
    // Parse headers
    let html = markdown.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mb-4 mt-6">$1</h1>');
    html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mb-3 mt-5">$1</h2>');
    html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mb-2 mt-4">$1</h3>');
    
    // Parse lists
    html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-5 list-decimal mb-1">$1</li>');
    html = html.replace(/^- (.+)$/gm, '<li class="ml-5 list-disc mb-1">$1</li>');
    
    // Parse paragraphs (any line that doesn't start with a special character)
    html = html.replace(/^([^<#\-\d\*\n].+)$/gm, '<p class="mb-4">$1</p>');
    
    // Parse code blocks
    html = html.replace(/```([^`]+)```/, '<pre class="bg-gray-100 p-3 rounded-md my-4 overflow-x-auto text-sm">$1</pre>');
    
    // Parse emphasis
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    // Wrap consecutive <li> elements in <ul> or <ol>
    html = html.replace(/(<li class="ml-5 list-disc mb-1">.*?<\/li>(?:\n|$))+/g, '<ul class="mb-4">$&</ul>');
    html = html.replace(/(<li class="ml-5 list-decimal mb-1">.*?<\/li>(?:\n|$))+/g, '<ol class="mb-4">$&</ol>');
    
    return html;
  };
  
  return (
    <div className="bg-[#FAF3E0] min-h-screen">
      {/* Content Workflow Modal */}
      {workflowOpen && generatedContent && activeGenerator && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FAF3E0] rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-playfair text-[#0A192F]">Content Workflow</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-[#0A192F]"
                  onClick={() => setWorkflowOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <ContentWorkflowManager 
                content={generatedContent}
                contentTitle={activeGenerator ? activeGenerator.title : ''}
                contentType={mapGeneratorToContentType(activeGenerator)}
                onComplete={handleWorkflowComplete}
                onCancel={() => setWorkflowOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-playfair text-[#0A192F] mb-2">AI Content Generator</h1>
          <p className="text-[#0A192F]/70">Create mystical content with our AI-powered generators</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left sidebar - Generator Selection */}
          <div className="lg:col-span-3">
            <Card className="bg-white border-[#0A192F]/10 sticky top-24">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-playfair text-[#0A192F]">Choose Generator</CardTitle>
                <CardDescription className="text-[#0A192F]/70">
                  Select the type of content you want to create
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-2">
                {aiGeneratorOptions.map((generator) => (
                  <div 
                    key={generator.id}
                    className={`flex items-start p-3 rounded-md cursor-pointer transition-colors ${activeGenerator?.id === generator.id ? 'bg-[#0A192F]/10' : 'hover:bg-[#0A192F]/5'}`}
                    onClick={() => handleGeneratorChange(generator)}
                  >
                    <div className="mr-3 mt-0.5 text-[#0A192F]">
                      {generator.icon}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium text-[#0A192F]">{generator.title}</h3>
                        {generator.premium && (
                          <Badge className="ml-2 bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/50">
                            Premium
                          </Badge>
                        )}
                      </div>
                      <p className="text-[#0A192F]/60 text-sm">{generator.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          {/* Main content - Generator Form & Output */}
          <div className="lg:col-span-9">
            {activeGenerator ? (
              <div className="space-y-6">
                <Card className="bg-white border-[#0A192F]/10">
                  <CardHeader>
                    <CardTitle className="text-2xl font-playfair text-[#0A192F] flex items-center">
                      {activeGenerator.icon}
                      <span className="ml-2">{activeGenerator.title}</span>
                      {activeGenerator.premium && (
                        <Badge className="ml-3 bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/50">
                          Premium
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-[#0A192F]/70">
                      {activeGenerator.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <form className="space-y-4">
                      {activeGenerator.formFields.map((field) => (
                        <div key={field.name} className="space-y-2">
                          <Label htmlFor={field.name} className="text-[#0A192F]">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </Label>
                          
                          {field.type === 'text' && (
                            <Input
                              id={field.name}
                              placeholder={field.placeholder}
                              value={formValues[field.name] || ''}
                              onChange={(e) => handleInputChange(field, e.target.value)}
                              className="border-[#0A192F]/20 text-[#0A192F]"
                            />
                          )}
                          
                          {field.type === 'textarea' && (
                            <Textarea
                              id={field.name}
                              placeholder={field.placeholder}
                              value={formValues[field.name] || ''}
                              onChange={(e) => handleInputChange(field, e.target.value)}
                              className="min-h-[100px] border-[#0A192F]/20 text-[#0A192F]"
                            />
                          )}
                          
                          {field.type === 'select' && field.options && (
                            <Select
                              value={formValues[field.name] || field.defaultValue || ''}
                              onValueChange={(value) => handleInputChange(field, value)}
                            >
                              <SelectTrigger className="border-[#0A192F]/20 text-[#0A192F]">
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                              <SelectContent>
                                {field.options.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                          
                          {field.type === 'slider' && (
                            <div className="pt-2">
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-[#0A192F]/70">{field.min}</span>
                                <span className="text-sm text-[#0A192F]/70">{field.max}</span>
                              </div>
                              <div className="flex items-center space-x-4">
                                <Slider
                                  id={field.name}
                                  min={field.min}
                                  max={field.max}
                                  step={1}
                                  value={[formValues[field.name] || field.defaultValue || field.min || 0]}
                                  onValueChange={(value) => handleInputChange(field, value[0])}
                                  className="flex-1"
                                />
                                <span className="w-12 text-center font-medium text-[#0A192F]">
                                  {formValues[field.name] || field.defaultValue || field.min || 0}
                                </span>
                              </div>
                            </div>
                          )}
                          
                          {field.type === 'switch' && (
                            <div className="flex items-center justify-between">
                              <Label htmlFor={field.name} className="text-[#0A192F]">{field.label}</Label>
                              <Switch
                                id={field.name}
                                checked={formValues[field.name] ?? field.defaultValue ?? false}
                                onCheckedChange={(checked) => handleInputChange(field, checked)}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </form>
                  </CardContent>
                  
                  <CardFooter>
                    <Button
                      onClick={handleGenerateContent}
                      disabled={isGenerating}
                      className="bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="mr-2 h-4 w-4" />
                          Generate Content
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Generated Content Display */}
                {generatedContent && (
                  <Card className="bg-white border-[#0A192F]/10">
                    <CardHeader>
                      <CardTitle className="text-xl font-playfair text-[#0A192F]">Generated Content</CardTitle>
                      <CardDescription className="text-[#0A192F]/70">
                        Your AI-generated content is ready to use
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="relative">
                        <div 
                          className="prose max-w-none"
                          dangerouslySetInnerHTML={{ __html: formatMarkdownToHtml(generatedContent) }}
                        />
                        
                        {/* Watermark */}
                        <div className="absolute top-2 right-2 opacity-10 rotate-[-30deg]">
                          <Badge variant="outline" className="text-[#0A192F] border-[#0A192F]/30 text-xs px-2 py-1">
                            Midnight Magnolia
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex flex-wrap gap-3">
                      <Button
                        onClick={handleCopyContent}
                        variant="outline"
                        className="border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F]/5"
                      >
                        <Clipboard className="mr-2 h-4 w-4" />
                        Copy to Clipboard
                      </Button>
                      
                      <Button
                        onClick={handleStartWorkflow}
                        className="bg-[#0A192F] hover:bg-[#0A192F]/90 text-[#FAF3E0]"
                      >
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Publish & Share
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </div>
            ) : (
              // No generator selected
              <div className="bg-white border border-[#0A192F]/10 rounded-lg p-12 text-center">
                <Wand2 className="h-12 w-12 mx-auto mb-4 text-[#0A192F]/30" />
                <h3 className="text-lg font-medium text-[#0A192F] mb-2">Choose a Generator</h3>
                <p className="text-[#0A192F]/60 max-w-md mx-auto mb-6">
                  Select a content generator from the left sidebar to begin creating magical content for your audience.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIContentGenerator;