import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, CheckCircle2, Play, ChevronLeft, ChevronRight, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PLAYBACK_RATE = 1.25;

// Video testimonials. Posters are pre-extracted frames so nothing heavy loads
// until the visitor actually hits play (videos use preload="none").
const VIDEOS = [
    {
        id: 'lutz',
        src: 'testimonial-lutz.mp4',
        poster: 'testimonial-lutz.jpg',
        name: 'Lutz F.',
        verified: true,
        box: 'XL-Box (19-25 Artikel)',
        quote: 'Ich bin mit der Bestellung super zufrieden. Das ist auch nur ein Teil der Bestellung da vieles schon alle ist 😬. Ich finde es lohnt sich und man kann Produkte testen die man sonst nicht gekauft hätte.',
    },
    {
        id: 'weber',
        src: 'testimonial-weber.mp4',
        poster: 'testimonial-weber.jpg',
        name: 'Weber S.',
        verified: false,
        box: 'XL-Box (19-25 Artikel)',
        quote: 'Eine richtig tolle Box. Ich war am Anfang skeptisch aber ich wurde überrascht was alles drin ist und das für den Preis ist schon genial. Macht weiter so!',
    },
    {
        id: 'sarah',
        src: 'testimonial-sarah.mp4',
        poster: 'testimonial-sarah.jpg',
        name: 'Sarah N.',
        verified: true,
        box: 'XL-Box (19-25 Artikel)',
        quote: 'Habe auch noch mehr Sachen bekommen sind aber schon aufgebraucht. Mystery Box lohnt sich auf jeden Fall!!!!',
    },
];

// Text-only reviews shown below the video wall.
const REVIEWS = [
    {
        name: 'Alexander R.',
        verified: false,
        box: 'S-Box (8-12 Artikel)',
        text: 'Coole Produkte. Sehr viele Proben. Etwas abwechslungsreicher, dann wäre es perfekt.',
    },
    { name: 'Luca L.', verified: false, box: null, text: 'Lohnt sich richtig!' },
    {
        name: 'Sven K.',
        verified: false,
        box: null,
        text: 'Super Box, kein billiges Zeug drin, bin überzeugt. Werde wieder bestellen.',
    },
    {
        name: 'Claudia B.',
        verified: false,
        box: null,
        text: 'Die Box war und ist sensationell. Ich bin von den Produkten begeistert und nach dem Ausprobieren wird sofort wieder bestellt. Vielen Dank. Macht weiter so....',
    },
    {
        name: 'Dominik W.',
        verified: true,
        box: 'S-Box (8-12 Artikel)',
        text: 'Super Preis-Leistung ist top.',
    },
];

function Stars({ size = 16 }) {
    return (
        <div className="flex gap-0.5" aria-label="5 von 5 Sternen">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={size} className="text-brand-yellow fill-brand-yellow" />
            ))}
        </div>
    );
}

function VerifiedTag() {
    return (
        <p className="text-xs text-brand-teal font-semibold flex items-center gap-1">
            <CheckCircle2 size={12} /> Verifizierter Käufer
        </p>
    );
}

function VideoCard({ video, index, cardRef, onOpen }) {
    return (
        <figure ref={cardRef} className="flex flex-col">
            {/* Gradient-ring phone frame */}
            <button
                type="button"
                onClick={() => onOpen(index)}
                aria-label={`Video-Bewertung von ${video.name} öffnen`}
                className="group relative block aspect-[9/16] rounded-xl sm:rounded-[1.75rem] p-px sm:p-[1.5px] bg-gradient-to-b from-brand-orange/70 via-dark-surface2/60 to-brand-volt/50 transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg"
            >
                <span className="relative block w-full h-full rounded-[0.7rem] sm:rounded-[1.65rem] overflow-hidden bg-dark-bg">
                    <img
                        src={`${import.meta.env.BASE_URL}${video.poster}`}
                        alt={`Video-Bewertung von ${video.name}`}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/15 to-dark-bg/30" />
                    <span className="absolute inset-0 flex items-center justify-center">
                        {/* Pulsing ring */}
                        <span className="absolute w-9 h-9 sm:w-16 sm:h-16 rounded-full ring-1 ring-brand-orange/50 animate-ping" />
                        <span className="relative flex items-center justify-center w-9 h-9 sm:w-16 sm:h-16 rounded-full bg-brand-orange/95 backdrop-blur-sm text-dark-text ring-2 ring-white/25 transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
                            <Play className="w-4 h-4 sm:w-7 sm:h-7 translate-x-px fill-current" />
                        </span>
                    </span>
                    <span className="absolute bottom-1.5 left-1.5 right-1.5 sm:bottom-3.5 sm:left-3.5 sm:right-3.5 flex items-center justify-between gap-1">
                        <span className="font-drama text-dark-text text-[11px] sm:text-sm tracking-wide truncate">{video.name}</span>
                        {video.verified && (
                            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-dark-bg/60 backdrop-blur-sm text-brand-teal text-[11px] font-drama">
                                <CheckCircle2 size={12} /> Verifiziert
                            </span>
                        )}
                    </span>
                </span>
            </button>

            <figcaption className="mt-2 sm:mt-4 px-0.5 sm:px-1">
                <div className="scale-90 origin-left sm:scale-100"><Stars /></div>
                {/* Quote + box hidden on mobile (3-up is too narrow) */}
                <p className="hidden sm:block mt-2 text-dark-text font-sans text-sm leading-relaxed">"{video.quote}"</p>
                <div className="mt-1.5 sm:mt-3 flex items-center gap-2 sm:gap-3">
                    <span className="font-drama text-dark-text text-[11px] sm:text-sm truncate">{video.name}</span>
                    {video.verified && <span className="hidden sm:block"><VerifiedTag /></span>}
                </div>
                {video.box && (
                    <p className="hidden sm:block mt-1 text-xs font-mono text-dark-muted/80">
                        Produktart: <span className="text-dark-text">{video.box}</span>
                    </p>
                )}
            </figcaption>
        </figure>
    );
}

// Fullscreen lightbox slider. Swipe / arrows / dots navigate the videos,
// the active testimonial text shows as a blob under the big video.
function VideoModal({ index, onClose, onNavigate }) {
    const video = VIDEOS[index];
    const videoRef = useRef(null);
    const touchX = useRef(null);

    // (Re)start playback at the requested speed whenever the slide changes.
    useEffect(() => {
        const el = videoRef.current;
        if (!el) return;
        el.playbackRate = PLAYBACK_RATE;
        el.play().catch(() => {});
    }, [index]);

    // Keyboard nav + body scroll lock while open.
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
            else if (e.key === 'ArrowLeft') onNavigate(-1);
            else if (e.key === 'ArrowRight') onNavigate(1);
        };
        document.addEventListener('keydown', onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [onClose, onNavigate]);

    const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
    const onTouchEnd = (e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 45) onNavigate(dx < 0 ? 1 : -1);
        touchX.current = null;
    };

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex flex-col bg-dark-bg/95 backdrop-blur-md"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={`Video-Bewertung von ${video.name}`}
        >
            <div className="flex items-center justify-between px-4 pt-4 pb-2 shrink-0">
                <span className="font-drama text-dark-text text-sm">{index + 1} / {VIDEOS.length}</span>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Schließen"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-dark-surface/80 text-dark-text hover:bg-brand-orange hover:text-dark-surface transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            <div
                className="flex-1 min-h-0 overflow-y-auto px-4 pb-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full max-w-sm mx-auto flex flex-col gap-4">
                    {/* Big video with side arrows + swipe */}
                    <div
                        className="relative mx-auto rounded-2xl overflow-hidden bg-black ring-1 ring-dark-surface2"
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                    >
                        <video
                            key={video.id}
                            ref={videoRef}
                            src={`${import.meta.env.BASE_URL}${video.src}`}
                            poster={`${import.meta.env.BASE_URL}${video.poster}`}
                            controls
                            autoPlay
                            playsInline
                            preload="auto"
                            onLoadedMetadata={(e) => { e.currentTarget.playbackRate = PLAYBACK_RATE; }}
                            onRateChange={(e) => {
                                if (e.currentTarget.playbackRate !== PLAYBACK_RATE) {
                                    e.currentTarget.playbackRate = PLAYBACK_RATE;
                                }
                            }}
                            className="w-full max-h-[58vh] aspect-[9/16] object-contain bg-black mx-auto"
                        />

                        <button
                            type="button"
                            onClick={() => onNavigate(-1)}
                            aria-label="Vorheriges Video"
                            className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-dark-bg/60 backdrop-blur-sm text-dark-text hover:bg-brand-orange hover:text-dark-surface transition-colors"
                        >
                            <ChevronLeft size={22} />
                        </button>
                        <button
                            type="button"
                            onClick={() => onNavigate(1)}
                            aria-label="Nächstes Video"
                            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-dark-bg/60 backdrop-blur-sm text-dark-text hover:bg-brand-orange hover:text-dark-surface transition-colors"
                        >
                            <ChevronRight size={22} />
                        </button>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2">
                        {VIDEOS.map((v, i) => (
                            <button
                                key={v.id}
                                type="button"
                                onClick={() => onNavigate(i - index)}
                                aria-label={`Zu Video ${i + 1}`}
                                className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-brand-orange' : 'w-2 bg-dark-surface2 hover:bg-brand-orange/60'}`}
                            />
                        ))}
                    </div>

                    {/* Quote blob */}
                    <div className="rounded-2xl bg-dark-surface/80 border border-dark-surface2 p-5">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="font-drama text-dark-text">{video.name}</span>
                            {video.verified && <VerifiedTag />}
                        </div>
                        <Stars />
                        <p className="mt-2 text-dark-text font-sans text-sm leading-relaxed">"{video.quote}"</p>
                        {video.box && (
                            <p className="mt-3 text-xs font-mono text-dark-muted/80">
                                Produktart: <span className="text-dark-text">{video.box}</span>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

export function DesireSection() {
    const sectionRef = useRef(null);
    const elementsRef = useRef([]);
    const [openIndex, setOpenIndex] = useState(null);

    const closeModal = useCallback(() => setOpenIndex(null), []);
    const navigate = useCallback((delta) => {
        setOpenIndex((i) => (i === null ? i : (i + delta + VIDEOS.length) % VIDEOS.length));
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            elementsRef.current.forEach((el, i) => {
                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    },
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    delay: (i % 3) * 0.1,
                    ease: "power2.out"
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el) => {
        if (el && !elementsRef.current.includes(el)) {
            elementsRef.current.push(el);
        }
    };

    return (
        <section id="testimonials" ref={sectionRef} className="py-24 bg-dark-surface2 relative overflow-hidden">
            {/* Decorative background blur */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-yellow/20 rounded-full blur-[110px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-brand-orange/15 rounded-full blur-[110px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div ref={addToRefs} className="text-center mb-16">
                    <div className="flex justify-center items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="text-brand-yellow fill-brand-yellow" size={24} />
                        ))}
                    </div>
                    <p className="text-brand-teal font-drama text-sm tracking-widest uppercase mb-4">4.8/5 · 1,247 Bewertungen</p>
                    <h2 className="text-3xl md:text-5xl font-heading text-dark-text">Schau was andere bekommen haben</h2>
                    <p className="text-dark-muted font-sans text-lg mt-4 max-w-2xl mx-auto">
                        Echte Mystery Box Inhalte
                    </p>
                </div>

                {/* Video wall */}
                <div className="grid grid-cols-3 gap-2 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
                    {VIDEOS.map((v, i) => (
                        <VideoCard key={v.id} video={v} index={i} cardRef={addToRefs} onOpen={setOpenIndex} />
                    ))}
                </div>

                {/* Text reviews */}
                <div className="mt-20">
                    <h3 className="text-center font-drama text-xl md:text-2xl text-dark-text mb-8">
                        Mehr Stimmen aus der Community
                    </h3>
                    <div className="columns-2 gap-3 sm:gap-5 [column-fill:_balance] max-w-3xl mx-auto">
                        {REVIEWS.map((r) => (
                            <div
                                key={r.name}
                                ref={addToRefs}
                                className="break-inside-avoid mb-3 sm:mb-5 bg-dark-surface p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-dark-surface2 hover:border-brand-orange/40 hover:-translate-y-1 transition-all duration-300 ease-out"
                            >
                                <Stars size={14} />
                                <p className="mt-2 sm:mt-3 text-dark-text font-sans text-[13px] sm:text-sm leading-relaxed">"{r.text}"</p>
                                <div className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-3 border-t border-dark-surface2 pt-3 sm:pt-4">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full flex items-center justify-center font-drama text-sm text-dark-surface bg-gradient-to-br from-brand-volt to-brand-orange">
                                        {r.name.charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[13px] sm:text-sm font-bold text-dark-text tracking-wide truncate">{r.name}</p>
                                        {r.verified && <VerifiedTag />}
                                    </div>
                                </div>
                                {r.box && (
                                    <p className="mt-3 text-[11px] sm:text-xs font-mono text-dark-muted/80">
                                        Produktart: <span className="text-dark-text">{r.box}</span>
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Edeka / Rewe Trust Bar */}
                <div ref={addToRefs} className="mt-20 pt-10 border-t border-dark-bg text-center">
                    <p className="text-dark-muted font-mono text-sm mb-6 uppercase tracking-widest">Qualität, der du vertraust. Bekannt aus:</p>
                    <div className="flex justify-center items-center gap-12 sm:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Simulated Edeka/Rewe Text Logos for now, since actual logos weren't provided in the directory. */}
                        <span className="font-drama text-2xl tracking-tighter text-dark-text">EDEKA</span>
                        <span className="font-drama text-2xl tracking-tighter text-dark-text text-red-600">REWE</span>
                    </div>
                </div>

            </div>

            {openIndex !== null && (
                <VideoModal index={openIndex} onClose={closeModal} onNavigate={navigate} />
            )}
        </section>
    );
}
