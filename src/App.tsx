import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ArrowRight, CheckCircle2, 
  Instagram, Twitter, Linkedin, Facebook, 
  Mail, Phone, MapPin, Send,
  BarChart3, Megaphone, Palette, Globe, Users,
  ExternalLink
} from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  company: string;
  category: 'Ads' | 'Branding' | 'Web Dev' | 'SEO';
  image: string;
  link?: string;
  videos?: string[];
  caseStudy?: {
    challenge: string;
    solution: string;
    results: string[];
    testimonial?: {
      quote: string;
      author: string;
      role: string;
    };
  };
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// --- Data ---
const CLIENTS = [
  { name: 'Ansha Montessori', logo: 'https://ui-avatars.com/api/?name=Ansha+Montessori&background=0056b3&color=fff&bold=true&size=128' },
  { name: 'Brush Yard', logo: 'https://ui-avatars.com/api/?name=Brush+Yard&background=e91e63&color=fff&bold=true&size=128' },
  { name: 'Kalabharanam', logo: 'https://ui-avatars.com/api/?name=Kalabharanam&background=cc0000&color=fff&bold=true&size=128' },
  { name: 'Star Kids', logo: 'https://ui-avatars.com/api/?name=Star+Kids&background=ffcc00&color=000&bold=true&size=128' },
  { name: 'Apollo Computer Education', logo: 'https://ui-avatars.com/api/?name=Apollo+Computer+Education&background=ee1c25&color=fff&bold=true&size=128' },
];

const SOCIAL_LINKS = [
  { icon: Instagram, url: 'https://www.instagram.com/wince_smart/' },
  { icon: Twitter, url: '#' },
  { icon: Linkedin, url: 'https://www.linkedin.com/in/buvan-sivaraj/' },
  { icon: Facebook, url: '#' }
];

const PROJECTS: Project[] = [
  { 
    id: 7, 
    title: 'Ads & Branding Campaign', 
    company: 'Ansha Montessori Institute', 
    category: 'Ads', 
    image: 'https://api.dicebear.com/7.x/initials/svg?seed=Ansha&backgroundColor=ff7a00&fontSize=45&bold=true', // High-quality generated brand mark
    link: 'https://www.youtube.com/embed/OEB6927uThY',
    videos: [
      'https://www.youtube.com/embed/OEB6927uThY',
      'https://www.youtube.com/embed/nKxg81nRY6M'
    ],
    caseStudy: {
      challenge: "Ansha Montessori, recognized as Tamil Nadu's NO.1 Montessori Institute, faced the challenge of scaling their student enrollment in a highly competitive educational landscape. They needed to communicate their unique 'Ansha Way' of holistic child development to parents who were increasingly turning to digital platforms for school research.",
      solution: "We implemented a multi-channel digital strategy centered around high-impact video storytelling. By showcasing real classroom moments, the 'Ansha Way' of teaching, and the state-of-the-art facilities, we built an emotional connection with parents. Our campaign focused on localized social media ads, optimized for high engagement and lead conversion, specifically targeting the Chennai region.",
      results: [
        "100% Student Enrollment Capacity Reached within 3 Months",
        "Over 500,000+ Video Views across Social Media Platforms",
        "45% Reduction in Cost Per Lead compared to previous campaigns",
        "Dominant Brand Presence as Tamil Nadu's NO.1 Montessori Institute",
        "Significant Increase in Organic Inquiries and School Tours"
      ],
      testimonial: {
        quote: "Wince Smart truly understood our vision. Their ability to translate the 'Ansha Way' into compelling video content was remarkable. They didn't just run ads; they built our brand's digital legacy, helping us maintain our position as the leading Montessori institute in Tamil Nadu.",
        author: "The Management Team",
        role: "Ansha Montessori Institute"
      }
    }
  },
  { 
    id: 8, 
    title: 'Digital Enrollment Campaign', 
    company: 'Star Kids International Preschool', 
    category: 'Ads', 
    image: 'https://api.dicebear.com/7.x/initials/svg?seed=StarKids&backgroundColor=ffcc00&fontSize=45&bold=true',
    link: 'https://www.youtube.com/embed/H9_JX15AVL8',
    videos: [
      'https://www.youtube.com/embed/H9_JX15AVL8'
    ],
    caseStudy: {
      challenge: "Star Kids International Preschool needed to increase their visibility and student inquiries for the upcoming academic year in a competitive urban market.",
      solution: "We created a vibrant digital campaign featuring high-energy video content that showcased the school's modern facilities, interactive learning environment, and happy students. The campaign was targeted at young parents through social media platforms.",
      results: [
        "40% Increase in Direct Admissions Inquiries",
        "Over 200,000+ Targeted Video Impressions",
        "Enhanced Social Media Brand Presence",
        "Successful Open House Event with Record Attendance"
      ],
      testimonial: {
        quote: "The digital campaign by Wince Smart perfectly captured the joy and energy of our preschool. It significantly boosted our inquiries and helped us connect with parents in a meaningful way.",
        author: "Director",
        role: "Star Kids International Preschool"
      }
    }
  },
  { 
    id: 9, 
    title: 'Skill-Up Awareness Campaign', 
    company: 'Apollo Computer Education', 
    category: 'Ads', 
    image: 'https://api.dicebear.com/7.x/initials/svg?seed=Apollo&backgroundColor=ee1c25&fontSize=45&bold=true',
    link: 'https://www.youtube.com/embed/vecHo4CTT7w',
    videos: [
      'https://www.youtube.com/embed/vecHo4CTT7w'
    ],
    caseStudy: {
      challenge: "Apollo Computer Education wanted to reach more students and professionals looking to upgrade their technical skills in a rapidly evolving job market.",
      solution: "We launched a high-impact digital awareness campaign highlighting their diverse course offerings and job-oriented training. The strategy involved short-form video content optimized for social media to capture the attention of career-focused individuals.",
      results: [
        "60% Increase in Course Inquiries",
        "Over 300,000+ Targeted Video Views",
        "Significant Growth in Social Media Following",
        "Improved Brand Recall among Technical Students"
      ],
      testimonial: {
        quote: "Wince Smart's strategic approach to our digital presence has been game-changing. Their video campaigns effectively communicated our value proposition to the right audience, leading to a noticeable surge in enrollments.",
        author: "Management Team",
        role: "Apollo Computer Education"
      }
    }
  },
];

const SERVICES: Service[] = [
  { id: 1, title: 'Social Media Marketing', description: 'Strategic content and community management to build brand loyalty.', icon: <Users className="w-8 h-8" /> },
  { id: 2, title: 'Performance Ads', description: 'Data-driven campaigns across Google, Meta, and LinkedIn for maximum ROI.', icon: <BarChart3 className="w-8 h-8" /> },
  { id: 3, title: 'Branding & Creative', description: 'Visual identities and creative assets that tell your unique story.', icon: <Palette className="w-8 h-8" /> },
  { id: 4, title: 'Website Development', description: 'High-performance, conversion-optimized websites built for scale.', icon: <Globe className="w-8 h-8" /> },
  { id: 5, title: 'Lead Generation Systems', description: 'Automated funnels that consistently deliver high-quality prospects.', icon: <Megaphone className="w-8 h-8" /> },
];

const PROCESS = [
  { step: '01', title: 'Discovery', description: 'We dive deep into your business goals and market landscape.' },
  { step: '02', title: 'Strategy', description: 'A custom roadmap designed for measurable growth and ROI.' },
  { step: '03', title: 'Execution', description: 'Precision implementation across all digital touchpoints.' },
  { step: '04', title: 'Optimization', description: 'Continuous data analysis to scale what works best.' },
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Services', href: '#services' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex flex-col items-center leading-none group">
          <span className={`text-4xl font-display font-black tracking-tighter ${isScrolled || isMobileMenuOpen ? 'text-zinc-900' : 'text-white'}`}>
            wince
          </span>
          <span className={`text-4xl font-display font-black tracking-tighter -mt-2 ${isScrolled || isMobileMenuOpen ? 'text-brand' : 'text-zinc-900'}`}>
            smart
          </span>
          <span className={`text-[7px] uppercase font-bold tracking-[0.3em] mt-1 ${isScrolled || isMobileMenuOpen ? 'text-zinc-500' : 'text-white'}`}>
            marketing agency
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-medium transition-colors ${isScrolled ? 'text-zinc-600 hover:text-brand' : 'text-white/80 hover:text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <button className="bg-brand hover:bg-brand-dark text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-brand/20">
            Get Proposal
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-zinc-900" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className={`w-6 h-6 ${isScrolled ? 'text-zinc-900' : 'text-white'}`} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-zinc-100 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-zinc-800 hover:text-brand"
              >
                {link.name}
              </a>
            ))}
            <button className="bg-brand text-white py-3 rounded-xl font-semibold mt-2">
              Get Proposal
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative bg-brand pt-40 pb-32 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/4 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-dark rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6">
              Next-Gen Marketing Agency
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white leading-[1.1] mb-8">
              We Grow Your Brand With <span className="text-zinc-900">Precision</span> Marketing
            </h1>
            <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-2xl">
              Helping businesses scale with proven digital marketing systems. We combine data science with creative excellence to deliver unmatched ROI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 group">
                Get Proposal <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white hover:bg-zinc-50 text-brand px-8 py-4 rounded-full font-bold text-lg transition-all border border-transparent">
                Book a Strategy Call
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Clients = () => {
  return (
    <section className="py-20 bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-zinc-400 text-sm font-bold uppercase tracking-widest mb-12">
          Trusted by Industry Leaders
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 items-center justify-center">
          {CLIENTS.map((client, i) => (
            <div key={i} className="flex flex-col items-center gap-4 group">
              <div className="h-20 w-20 md:h-24 md:w-24 rounded-3xl overflow-hidden shadow-md border border-zinc-100 bg-white p-3 flex items-center justify-center group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="w-full h-full object-contain" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider group-hover:text-brand transition-colors text-center">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Counter = ({ value, duration = 2 }: { value: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, ''));
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    let start = 0;
    const end = numericValue;
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = (totalMiliseconds / end);

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [numericValue, duration]);

  return <span>{count}{suffix}</span>;
};

const Stats = () => {
  const stats = [
    { value: '20+', label: 'Successful Projects' },
    { value: '98%', label: 'Client Retention' },
    { value: '15M+', label: 'Ad Spend Managed' },
    { value: '3.5x', label: 'Average ROI' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="text-5xl md:text-6xl font-display font-extrabold text-brand mb-2">
                <Counter value={stat.value} />
              </h3>
              <p className="text-zinc-500 font-medium uppercase tracking-wide text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CaseStudyPage = ({ project }: { project: Project }) => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="/" className="flex flex-col items-center leading-none group">
            <span className="text-4xl font-display font-black tracking-tighter text-zinc-900">wince</span>
            <span className="text-4xl font-display font-black tracking-tighter -mt-2 text-brand">smart</span>
            <span className="text-[7px] uppercase font-bold tracking-[0.3em] mt-1 text-zinc-500">marketing agency</span>
          </a>
          <a href="/" className="flex items-center gap-2 text-zinc-600 font-bold hover:text-brand transition-colors">
            <ArrowRight className="w-5 h-5 rotate-180" /> Back to Home
          </a>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[3rem] overflow-hidden shadow-2xl border border-zinc-100 bg-white"
          >
            <div className="aspect-[21/9] w-full relative bg-zinc-50 flex items-center justify-center overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className={`w-full h-full ${project.id === 7 ? 'object-contain p-24 scale-150' : 'object-cover'}`} 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 right-12">
                <span className="px-4 py-1.5 bg-brand rounded-full text-xs font-bold text-white uppercase tracking-widest mb-4 inline-block">
                  {project.category}
                </span>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-2">{project.company}</h1>
                <p className="text-white/80 text-xl">{project.title}</p>
              </div>
            </div>

            <div className="p-10 md:p-20">
              <div className="grid lg:grid-cols-3 gap-20">
                <div className="lg:col-span-2 space-y-16">
                  <section>
                    <h3 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand text-lg">01</span>
                      The Challenge
                    </h3>
                    <p className="text-zinc-600 leading-relaxed text-xl">
                      {project.caseStudy?.challenge}
                    </p>
                  </section>
                  
                  <section>
                    <h3 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand text-lg">02</span>
                      Our Strategic Solution
                    </h3>
                    <p className="text-zinc-600 leading-relaxed text-xl mb-10">
                      {project.caseStudy?.solution}
                    </p>

                    {project.videos && project.videos.length > 0 ? (
                      <div className="mt-12 space-y-12">
                        <h4 className="text-2xl font-bold text-zinc-900 mb-6">Campaign Showcase</h4>
                        <div className="grid md:grid-cols-2 gap-8">
                          {project.videos.map((video, idx) => (
                            <div key={idx} className="aspect-[9/16] md:aspect-video rounded-3xl overflow-hidden shadow-2xl border border-zinc-100 bg-zinc-100">
                              <iframe 
                                width="100%" 
                                height="100%" 
                                src={video} 
                                title={`Campaign Video ${idx + 1}`} 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                              ></iframe>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      project.link && project.link.includes('youtube.com/embed') && (
                        <div className="mt-12">
                          <h4 className="text-xl font-bold text-zinc-900 mb-6">Campaign Video</h4>
                          <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border border-zinc-100 bg-zinc-100">
                            <iframe 
                              width="100%" 
                              height="100%" 
                              src={project.link} 
                              title="YouTube video player" 
                              frameBorder="0" 
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>
                      )
                    )}

                    {project.caseStudy?.testimonial && (
                      <div className="mt-20 p-10 bg-brand/5 rounded-[2.5rem] border border-brand/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                          <Megaphone className="w-32 h-32 text-brand" />
                        </div>
                        <div className="relative z-10">
                          <p className="text-2xl font-display italic text-zinc-800 mb-8 leading-relaxed">
                            "{project.caseStudy.testimonial.quote}"
                          </p>
                          <div>
                            <p className="font-bold text-zinc-900 text-lg">{project.caseStudy.testimonial.author}</p>
                            <p className="text-brand font-bold text-sm uppercase tracking-widest">{project.caseStudy.testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </section>
                </div>

                <aside className="space-y-8">
                  <div className="bg-zinc-50 p-10 rounded-[2.5rem] border border-zinc-100 shadow-sm">
                    <h3 className="text-2xl font-bold text-zinc-900 mb-8 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand text-lg">03</span>
                      Key Results
                    </h3>
                    <ul className="space-y-6">
                      {project.caseStudy?.results.map((result, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center shrink-0 mt-1">
                            <CheckCircle2 className="w-4 h-4 text-brand" />
                          </div>
                          <span className="text-zinc-800 font-semibold text-lg leading-tight">{result}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {project.link && (
                      <div className="mt-12 pt-12 border-t border-zinc-200">
                        <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-6">Live Project</p>
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full bg-zinc-900 hover:bg-brand text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-zinc-900/10"
                        >
                          View Live Work <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="bg-brand p-10 rounded-[2.5rem] text-white shadow-xl shadow-brand/20">
                    <h4 className="text-2xl font-display font-bold mb-4">Ready to scale?</h4>
                    <p className="text-white/80 mb-8">Let's build your success story together.</p>
                    <a href="/#contact" className="inline-block bg-white text-brand px-8 py-4 rounded-full font-bold hover:bg-zinc-100 transition-all">
                      Start Your Project
                    </a>
                  </div>
                </aside>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand font-bold uppercase tracking-widest text-sm mb-4 block">About Wince Smart</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-zinc-900 mb-8 leading-tight">
              Our Vision is to Redefine Digital Growth
            </h2>
            <p className="text-lg text-zinc-600 mb-8 leading-relaxed">
              We don't just run ads; we build growth engines. Our agency was founded on the principle that marketing should be a predictable investment, not a gamble. We combine cutting-edge technology with human-centric storytelling.
            </p>
            <div className="space-y-4 mb-10">
              {[
                '20+ Projects Delivered Globally',
                'ROI-Focused Strategies Only',
                'Trusted by Brands Internationally',
                'Dedicated Expert Team'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand" />
                  <span className="font-semibold text-zinc-800">{item}</span>
                </div>
              ))}
            </div>
            <button className="bg-brand text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-brand/20 hover:bg-brand-dark transition-all">
              Learn More About Us
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-[2rem] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Team" referrerPolicy="no-referrer" />
            </div>
          </motion.div>
        </div>

        <div className="pt-24 border-t border-zinc-100">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-display font-bold text-zinc-900 mb-4">Our Process</h2>
            <p className="text-zinc-500">How we take your brand from where it is to where it needs to be.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-zinc-100 z-0" />
            
            {PROCESS.map((p, i) => (
              <div key={i} className="relative z-10 text-center lg:text-left">
                <div className="w-24 h-24 bg-white border-2 border-brand rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-8 shadow-lg">
                  <span className="text-3xl font-display font-extrabold text-brand">{p.step}</span>
                </div>
                <h4 className="text-xl font-bold text-zinc-900 mb-3">{p.title}</h4>
                <p className="text-zinc-500 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = ({ onOpenCaseStudy }: { onOpenCaseStudy: (p: Project) => void }) => {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', 'Ads', 'Branding', 'Web Dev', 'SEO'];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand font-bold uppercase tracking-widest text-sm mb-4 block">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-zinc-900 mb-8">Our Success Stories</h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${filter === cat ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'bg-white text-zinc-600 hover:bg-zinc-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-zinc-100"
              >
                <div className="aspect-video overflow-hidden bg-zinc-50 flex items-center justify-center">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className={`w-full h-full ${project.id === 7 ? 'object-contain p-10' : 'object-cover'}`} 
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-brand text-xs font-bold uppercase tracking-wider mb-1">{project.category}</p>
                      <h3 className="text-xl font-display font-bold text-zinc-900">{project.company}</h3>
                    </div>
                  </div>
                  <p className="text-zinc-500 text-sm mb-6">{project.title}</p>
                  <button 
                    onClick={() => onOpenCaseStudy(project)}
                    className="w-full py-3 rounded-xl border border-zinc-200 text-zinc-800 font-bold text-sm hover:bg-zinc-50 transition-all flex items-center justify-center gap-2"
                  >
                    View Full Project <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12 items-center mb-20">
          <div className="lg:col-span-1">
            <span className="text-brand font-bold uppercase tracking-widest text-sm mb-4 block">Expertise</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-zinc-900 mb-6">How We Help You Scale</h2>
            <p className="text-zinc-500 text-lg mb-8">
              We provide end-to-end digital marketing solutions tailored to your specific business needs and growth targets.
            </p>
            <button className="flex items-center gap-2 text-brand font-bold hover:gap-3 transition-all">
              View All Services <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <motion.div 
                key={service.id}
                whileHover={{ y: -5 }}
                className="p-8 bg-zinc-50 rounded-[2rem] border border-zinc-100 hover:bg-white hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center text-brand mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-4">{service.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">{service.description}</p>
                <button className="text-zinc-900 font-bold text-sm flex items-center gap-2 hover:text-brand transition-colors">
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    phone: '',
    email: '',
    service: 'Social Media Marketing',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your interest! Our team will contact you shortly.');
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-zinc-50 rounded-[3rem] overflow-hidden shadow-2xl border border-zinc-100">
          <div className="grid lg:grid-cols-2">
            <div className="p-10 md:p-16">
              <h2 className="text-4xl font-display font-bold text-zinc-900 mb-4">Let's Build Something Great</h2>
              <p className="text-zinc-500 mb-10">Fill out the form below and we'll get back to you within 24 hours with a custom proposal.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Full Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-6 py-4 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Business Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-6 py-4 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                      placeholder="Acme Corp"
                      value={formData.business}
                      onChange={(e) => setFormData({...formData, business: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full px-6 py-4 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Email Address</label>
                    <input 
                      type="email" 
                      required
                      className="w-full px-6 py-4 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Required Service</label>
                  <select 
                    className="w-full px-6 py-4 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all appearance-none"
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                  >
                    {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full px-6 py-4 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all resize-none"
                    placeholder="Tell us about your goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brand hover:bg-brand-dark text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-brand/20 transition-all flex items-center justify-center gap-3"
                >
                  Send Message <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
            
            <div className="relative hidden lg:block overflow-hidden bg-zinc-900">
              {/* Sliding Gallery Overlay */}
              <div className="absolute inset-0 z-0">
                <motion.div 
                  animate={{ 
                    y: [0, -1000, 0] 
                  }}
                  transition={{ 
                    duration: 40, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="flex flex-col gap-4 p-4"
                >
                  {[1,2,3,4,5,6,1,2,3,4,5,6].map((n, i) => (
                    <img 
                      key={i}
                      src={`https://picsum.photos/seed/agency${n}/800/600`} 
                      alt="Agency Life" 
                      className="w-full aspect-video object-cover rounded-2xl opacity-40"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </motion.div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent z-10" />
              
              <div className="absolute bottom-16 left-16 right-16 z-20">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl">
                  <h4 className="text-white text-2xl font-display font-bold mb-4">Visit Our Office</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-white/80">
                      <MapPin className="w-5 h-5 text-brand" />
                      <span>123 Innovation Drive, Silicon Valley, CA</span>
                    </div>
                    <div className="flex items-center gap-4 text-white/80">
                      <Phone className="w-5 h-5 text-brand" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-4 text-white/80">
                      <Mail className="w-5 h-5 text-brand" />
                      <span>hello@wincesmart.com</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-8">
                    {SOCIAL_LINKS.map((social, i) => (
                      <a 
                        key={i} 
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand transition-all"
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-zinc-950 pt-24 pb-12 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <a href="#home" className="flex flex-col items-start leading-none mb-8 group">
              <span className="text-4xl font-display font-black tracking-tighter text-white">
                wince
              </span>
              <span className="text-4xl font-display font-black tracking-tighter -mt-2 text-brand">
                smart
              </span>
              <span className="text-[7px] uppercase font-bold tracking-[0.3em] mt-1 text-zinc-500">
                marketing agency
              </span>
            </a>
            <p className="text-zinc-500 leading-relaxed mb-8">
              Empowering brands with data-driven marketing strategies and creative excellence.
            </p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social, i) => (
                <a 
                  key={i} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-brand hover:text-white transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Portfolio', 'Services', 'Contact Us'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-zinc-500 hover:text-brand transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-8">Services</h4>
            <ul className="space-y-4">
              {['Social Media', 'Performance Ads', 'Branding', 'Web Development', 'SEO'].map(link => (
                <li key={link}>
                  <a href="#services" className="text-zinc-500 hover:text-brand transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-8">Newsletter</h4>
            <p className="text-zinc-500 mb-6">Get the latest marketing insights delivered to your inbox.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-4 focus:outline-none focus:border-brand transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-brand hover:bg-brand-dark px-4 rounded-lg transition-all">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Wince Smart Agency. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-zinc-500">
            <a href="#" className="hover:text-brand transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [projectId, setProjectId] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('project');
    if (id) {
      setProjectId(parseInt(id));
    }
  }, []);

  const openCaseStudy = (project: Project) => {
    window.open(`?project=${project.id}`, '_blank');
  };

  if (projectId) {
    const project = PROJECTS.find(p => p.id === projectId);
    if (project) {
      return <CaseStudyPage project={project} />;
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Clients />
      <Stats />
      <About />
      <Portfolio onOpenCaseStudy={openCaseStudy} />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}
