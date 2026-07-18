import { style } from "framer-motion/client";

export const navLinks = [
  { label: 'Home', href: '#hero', },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Social', href: '#social' },
  { label: 'FAQ', href: '#faq' },
];

// --- Category data for the redesigned "What We Offer" section ---
export interface CategoryItem {
  id: string;
  title: string;
  description: string;
  thumbnailLabel: string;
  thumbnailSvg: string;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  images: string[];
}

export const categories: CategoryItem[] = [
  {
    id: 'fashion-events',
    title: 'Fashion & Events',
    description: 'From the runway to the red carpet, we capture the glamour, emotion, and artistry of fashion shows, weddings, and special events with a cinematic eye.',
    thumbnailLabel: 'FE',
    thumbnailSvg: `<img src="/images/Fashion & Events/8.jpeg" alt="Fashion & Events" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" />`,
    accentColor: '#E4DBC2',
    gradientFrom: '#E4DBC2',
    gradientTo: '#2E2E46',
    images: [
      '/images/Fashion & Events/1.jpeg',
      '/images/Fashion & Events/2.jpeg',
      '/images/Fashion & Events/3.jpeg',
      '/images/Fashion & Events/4.jpeg',
      '/images/Fashion & Events/5.jpeg',
      '/images/Fashion & Events/6.jpeg',
      '/images/Fashion & Events/12.jpeg',
      '/images/Fashion & Events/10.jpeg',
      '/images/Fashion & Events/11.jpeg',
    ],
  },
  {
    id: 'wildlife-nature',
    title: 'Wildlife & Nature',
    description: 'The untamed world through our lens. We document the raw beauty of wildlife, landscapes, and natural wonders with patience and reverence.',
    thumbnailLabel: 'WN',
    thumbnailSvg: `<img src="/images/Wildlife & Nature/7.jpeg" alt="Wildlife & Nature" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" />`,
    accentColor: '#E4DBC2',
    gradientFrom: '#E4DBC2',
    gradientTo: '#2E2E46',
    images: [
      '/images/Wildlife & Nature/16.jpeg',
      '/images/Wildlife & Nature/2.jpeg',
      '/images/Wildlife & Nature/3.jpeg',
      '/images/Wildlife & Nature/19.jpeg',
      '/images/Wildlife & Nature/5.jpeg',
      '/images/Wildlife & Nature/6.jpeg',
      '/images/Wildlife & Nature/17.jpeg',
      '/images/Wildlife & Nature/12.jpeg',
      '/images/Wildlife & Nature/20.jpeg',
    ],
  },
  {
    id: 'product',
    title: 'Product',
    description: 'Commercial imagery that elevates brands. Every detail, texture, and angle is crafted to present products in their most compelling light.',
    thumbnailLabel: 'PR',
    thumbnailSvg: `<img src="/images/Product/6.jpeg" alt="Product" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" />`,
    accentColor: '#E4DBC2',
    gradientFrom: '#E4DBC2',
    gradientTo: '#2E2E46',
    images: [
      '/images/Product/1.jpeg',
      '/images/Product/2.jpeg',
      '/images/Product/3.jpeg',
      '/images/Product/8.jpeg',
      '/images/Product/5.jpeg',
      '/images/Product/4.jpeg',
      '/images/Product/11.jpeg',
      '/images/Product/10.jpeg',
      '/images/Product/9.jpeg',
    ],
  },
  {
    id: 'streets-landscapes',
    title: 'Streets & Landscapes',
    description: 'Urban stories and sweeping vistas. We capture the soul of cities and the majesty of landscapes, finding beauty in every corner of the world.',
    thumbnailLabel: 'SL',
    thumbnailSvg: `<img src="/images/Street & Landscapes/1.jpeg" alt="Streets & Landscapes" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" />`,
    accentColor: '#E4DBC2',
    gradientFrom: '#E4DBC2',
    gradientTo: '#2E2E46',
    images: [
      '/images/Street & Landscapes/11.jpeg',
      '/images/Street & Landscapes/8.jpeg',
      '/images/Street & Landscapes/3.jpeg',
      '/images/Street & Landscapes/4.jpeg',
      '/images/Street & Landscapes/5.jpeg',
      '/images/Street & Landscapes/6.jpeg',
      '/images/Street & Landscapes/7.jpeg',
      '/images/Street & Landscapes/12.jpeg',
      '/images/Street & Landscapes/9.jpeg',
    ],
  },
];

export const galleryImages = [
  { id: 1, src: '/images/Fashion & Events/6.jpeg', title: 'Elegance in Motion', category: 'Events' },
  { id: 2, src: '/images/Street & Landscapes/1.jpeg', title: 'Golden Hour Serenity', category: 'Landscape' },
  { id: 3, src: '/images/Street & Landscapes/2.jpeg', title: 'Urban Symphony', category: 'Street' },
  { id: 4, src: '/images/Wildlife & Nature/4.jpeg', title: 'Wild Majesty', category: 'Wildlife' },
  { id: 5, src: '/images/Fashion & Events/4.jpeg', title: 'Celebration of Love', category: 'Events' },
  { id: 6, src: '/images/Product/1.jpeg', title: 'Art in Details', category: 'Product' },
  { id: 7, src: '/images/Wildlife & Nature/18.jpeg', title: 'Moon Shine', category: 'Nature' },
  { id: 8, src: '/images/Street & Landscapes/10.jpeg', title: 'Car Tyre', category: 'Street' },
  { id: 9, src: '/images/Wildlife & Nature/9.jpeg', title: 'Beach Essence', category: 'Nature' },
  { id: 10, src: '/images/Fashion & Events/2.jpeg', title: 'Festival of Colors', category: 'Events' },
  { id: 11, src: '/images/Product/3.jpeg', title: 'Innovative Design', category: 'Product' },
  { id: 12, src: '/images/Product/11.jpeg', title: 'Design Perfected', category: 'Product' },
];

export const stats = [
  { label: 'Projects Completed', value: 500, suffix: '+' },
  { label: 'Happy Clients', value: 200, suffix: '+' },
  { label: 'Years of Experience', value: 5, suffix: '+' },
  { label: 'Coffee Consumed', value: 1000, suffix: '+' },
];

export const faqs = [
  {
    question: 'How do I book a session?',
    answer: 'Simply reach out through our Contact form, email, or WhatsApp. We\'ll discuss your vision, requirements, and schedule a consultation to plan the perfect shoot.',
  },
  {
    question: 'What is your availability?',
    answer: 'We are available year-round, with peak seasons being spring and fall. We recommend booking at least 2-3 weeks in advance to secure your preferred date.',
  },
  {
    question: 'Do you offer photo/video editing?',
    answer: 'Absolutely! We provide comprehensive post-production services including color grading, retouching, video editing, and final delivery in your preferred format.',
  },
  {
    question: 'What are your pricing packages?',
    answer: 'We offer customized packages tailored to your specific needs. Contact us for a personalized quote based on your project scope, duration, and requirements.',
  },
  {
    question: 'Do you cover events outside the city?',
    answer: 'Yes! We travel for events and shoots nationwide. Travel expenses may apply depending on the location. We love capturing stories wherever they unfold.',
  },
  {
    question: 'Can I request revisions?',
    answer: 'We offer up to 2 rounds of revisions to ensure your complete satisfaction. Our goal is to deliver work that exceeds your expectations.',
  },
  {
    question: 'What equipment do you use?',
    answer: 'We use professional-grade Canon and Sony camera systems, professional lighting equipment, and industry-standard editing software to ensure the highest quality results.',
  },
];

export const socialLinks = {
  instagram: 'https://www.instagram.com/_.lamaknoorani',
  email: 'lamaknoorani@gmail.com',
  whatsapp: '03002623094',
};

export const personalInfo = {
  name: 'Lamak Noorani',
  age: 20,
  profession: 'Creative Media Specialist',
  studio: 'Lamak Noorani Films & Studios',
  bio: 'With an artistic eye and a passion for visual storytelling, I have dedicated my craft to capturing the extraordinary in the ordinary. From the vibrant streets to the serene landscapes, every frame tells a story waiting to be discovered. My journey in photography and videography began as a fascination with light and evolved into a profound love for preserving moments that matter. I believe that every subject has a unique narrative, and my mission is to translate those narratives into compelling visual art that resonates deeply with audiences. Whether it is the raw emotion of an event, the elegance of fashion, or the untamed beauty of wildlife, I approach each project with unwavering dedication, creativity, and a commitment to excellence.',
};