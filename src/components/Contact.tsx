import { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Send, Mail, Phone, MapPin, Check, Copy, Sparkles, 
  ArrowUpRight, MessageSquare, AlertCircle, ExternalLink
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram } from 'react-icons/fa6';

gsap.registerPlugin(ScrollTrigger);

function InteractiveBeacon3D() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.position.y = Math.sin(t * 1.5) * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.8) * 0.2;
      ringRef.current.rotation.y += delta * 0.25;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.35;
      ring2Ref.current.rotation.z = Math.PI / 4 + Math.cos(t * 0.6) * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Brushed Titanium & Bronze Polyhedron */}
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[1.3, 0]} />
          <meshStandardMaterial 
            color="#3B3C3A"
            metalness={0.9}
            roughness={0.2}
            wireframe
          />
        </mesh>
      </Float>

      {/* Inner Bronze Core */}
      <mesh scale={[0.6, 0.6, 0.6]}>
        <dodecahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial 
          color="#A88B62"
          metalness={0.85}
          roughness={0.3}
        />
      </mesh>

      {/* Outer Orbit Rings in Bronze and Black Chrome */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.2, 0.02, 16, 80]} />
        <meshStandardMaterial color="#A88B62" metalness={0.9} roughness={0.1} />
      </mesh>

      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.7, 0.015, 16, 80]} />
        <meshBasicMaterial color="#2B2D31" />
      </mesh>
    </group>
  );
}

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isCaptchaError, setIsCaptchaError] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const fallbackFormRef = useRef<HTMLFormElement>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText('tyagiaayush3030@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const formspreeKey = 
    import.meta.env.VITE_FORMSPREE_KEY || 
    import.meta.env.VITE_FORMSPREE_FORM_ID || 
    'xkoayjdn';

  const endpoint = formspreeKey.startsWith('http') 
    ? formspreeKey 
    : `https://formspree.io/f/${formspreeKey}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setStatus('sending');
    setErrorMessage('');
    setIsCaptchaError(false);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          _replyto: formState.email,
          subject: formState.subject || 'Portfolio Inquiry',
          _subject: formState.subject ? `[Portfolio] ${formState.subject}` : `[Portfolio] Message from ${formState.name}`,
          message: formState.message,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        setStatus('sent');
        setFormState({ name: '', email: '', subject: '', message: '' });
        setIsCaptchaError(false);
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
        const detail = data?.errors?.map((err: { message?: string }) => err.message).filter(Boolean).join(', ') 
          || data?.error 
          || 'Failed to deliver message.';
        setErrorMessage(detail);
        if (detail.toLowerCase().includes('recaptcha') || detail.toLowerCase().includes('ajax')) {
          setIsCaptchaError(true);
        }
      }
    } catch (err) {
      console.error('Formspree delivery error:', err);
      setStatus('error');
      setErrorMessage('Network connection error while sending message.');
    }
  };

  const handleDirectSubmitFallback = () => {
    if (fallbackFormRef.current) {
      fallbackFormRef.current.submit();
      setStatus('sent');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(formRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#0B0C0E]" ref={containerRef}>
      <div className="w-full max-w-6xl xl:max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15171A] border border-[#2B2D31] text-[#A88B62] text-xs font-mono tracking-widest uppercase mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Communications</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#F2EFE8] mb-4 tracking-tight">
            Initiate Contact
          </h2>
          <p className="text-[#85827B] text-sm sm:text-base max-w-xl mx-auto">
            Open for software engineering roles, high-impact AI/ML research collaborations, and production consulting projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-center" ref={formRef}>
          
          {/* Left Column: 3D Beacon & Contact Info */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Interactive 3D Beacon */}
            <div className="w-full h-[240px] sm:h-[280px] relative rounded-2xl bg-[#15171A] border border-[#2B2D31] overflow-hidden mb-8">
              <div className="absolute top-3 left-4 text-[10px] font-mono text-[#85827B] uppercase tracking-widest z-10">
                System Beacon // Active
              </div>
              <Suspense fallback={null}>
                <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[5, 5, 5]} intensity={1.2} color="#F2EFE8" />
                  <pointLight position={[0, 0, 2]} color="#A88B62" intensity={1.5} />
                  <InteractiveBeacon3D />
                </Canvas>
              </Suspense>
            </div>

            {/* Quick Email Copy Box */}
            <div className="w-full p-4 rounded-xl bg-[#15171A] border border-[#2B2D31] mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#202328] border border-[#2B2D31] text-[#A88B62]">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-mono text-[#85827B] uppercase tracking-wider">Direct Inbox</div>
                  <div className="text-xs font-mono font-medium text-[#F2EFE8]">tyagiaayush3030@gmail.com</div>
                </div>
              </div>
              
              <button 
                onClick={copyEmail}
                className="p-2 rounded-lg bg-[#202328] border border-[#2B2D31] text-[#B8B5AD] hover:text-[#F2EFE8] hover:border-[#A88B62] transition-colors cursor-pointer"
                title="Copy email address"
              >
                {copied ? <Check className="w-4 h-4 text-[#596052]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: <FaGithub />, href: "https://github.com/aayushtyagi00", label: "GitHub" },
                { icon: <FaLinkedin />, href: "https://linkedin.com/in/aayushtyagi00", label: "LinkedIn" },
                { icon: <FaXTwitter />, href: "https://x.com/aayushtyagi00", label: "Twitter" },
                { icon: <FaInstagram />, href: "https://instagram.com/aayushtyagi00", label: "Instagram" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="p-2.5 rounded-full bg-[#15171A] border border-[#2B2D31] text-[#B8B5AD] hover:text-[#F2EFE8] hover:border-[#A88B62] transition-all duration-200"
                >
                  <span className="text-sm">{item.icon}</span>
                </a>
              ))}
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-2xl bg-[#15171A] border border-[#2B2D31] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              
              <h3 className="text-xl font-display font-bold text-[#F2EFE8] mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#85827B] uppercase tracking-wider mb-2">
                      Your Name
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl bg-[#111315] border border-[#2B2D31] text-[#F2EFE8] placeholder-[#85827B] text-sm focus:outline-none focus:border-[#A88B62] focus:bg-[#15171A] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#85827B] uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#111315] border border-[#2B2D31] text-[#F2EFE8] placeholder-[#85827B] text-sm focus:outline-none focus:border-[#A88B62] focus:bg-[#15171A] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#85827B] uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input 
                    type="text" 
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="Project Inquiry / Role Opportunity"
                    className="w-full px-4 py-3 rounded-xl bg-[#111315] border border-[#2B2D31] text-[#F2EFE8] placeholder-[#85827B] text-sm focus:outline-none focus:border-[#A88B62] focus:bg-[#15171A] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#85827B] uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea 
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe your project, timeline, or engineering opportunity..."
                    className="w-full px-4 py-3 rounded-xl bg-[#111315] border border-[#2B2D31] text-[#F2EFE8] placeholder-[#85827B] text-sm focus:outline-none focus:border-[#A88B62] focus:bg-[#15171A] transition-colors resize-none"
                  />
                </div>

                {status === 'sent' && (
                  <div className="p-4 rounded-xl bg-[#172619] border border-[#234A28] flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#3FB950] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-mono font-bold text-[#3FB950] uppercase tracking-wider">
                        Transmission Confirmed
                      </div>
                      <div className="text-xs text-[#A8C7A0] mt-0.5">
                        Your message has been sent to Aayush via Formspree. Expect a response soon!
                      </div>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-[#2D1617] border border-[#522325] space-y-3">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-[#F85149] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-mono font-bold text-[#F85149] uppercase tracking-wider">
                          Transmission Notice
                        </div>
                        <div className="text-xs text-[#E8A5A3] mt-1 leading-relaxed">
                          {isCaptchaError ? (
                            <>
                              Formspree reCAPTCHA is active on this endpoint. You can transmit directly via Formspree's secure verification window below, or disable reCAPTCHA in your Formspree dashboard settings for silent inline submissions.
                            </>
                          ) : (
                            errorMessage || "Couldn't send the form right now. You can also email directly to tyagiaayush3030@gmail.com."
                          )}
                        </div>
                      </div>
                    </div>

                    {isCaptchaError && (
                      <div className="pt-2 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={handleDirectSubmitFallback}
                          className="px-4 py-2 rounded-lg bg-[#F85149]/20 hover:bg-[#F85149]/30 text-[#F85149] text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer border border-[#F85149]/30"
                        >
                          <span>Submit via Formspree Verification</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={`mailto:tyagiaayush3030@gmail.com?subject=${encodeURIComponent(formState.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`)}`}
                          className="px-4 py-2 rounded-lg bg-[#1D2127] hover:bg-[#252A32] text-[#C9D1D9] text-xs font-mono font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 border border-[#30363D]"
                        >
                          <span>Open in Email Client</span>
                          <Send className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-2 flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#F2EFE8] hover:bg-[#FAF9F6] text-[#0B0C0E] text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {status === 'sending' ? (
                      <span>Transmitting...</span>
                    ) : status === 'sent' ? (
                      <>
                        <span className="text-[#3FB950] font-bold">Delivered</span>
                        <Check className="w-4 h-4 text-[#3FB950]" />
                      </>
                    ) : status === 'error' ? (
                      <>
                        <span className="text-[#F85149] font-bold">Retry Transmission</span>
                        <AlertCircle className="w-4 h-4 text-[#F85149]" />
                      </>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <Send className="w-4 h-4 text-[#0B0C0E]" />
                      </>
                    )}
                  </button>
                </div>

              </form>

              {/* Hidden direct submission form for reCAPTCHA fallback */}
              <form
                ref={fallbackFormRef}
                action={endpoint}
                method="POST"
                target="_blank"
                className="hidden"
              >
                <input type="hidden" name="name" value={formState.name} />
                <input type="hidden" name="email" value={formState.email} />
                <input type="hidden" name="_replyto" value={formState.email} />
                <input type="hidden" name="subject" value={formState.subject || 'Portfolio Inquiry'} />
                <input type="hidden" name="_subject" value={formState.subject ? `[Portfolio] ${formState.subject}` : `[Portfolio] Message from ${formState.name}`} />
                <textarea name="message" value={formState.message} readOnly className="hidden" />
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
