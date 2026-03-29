/**
 * DeepLearning.jsx — "The Depth Revolution"
 *
 * Mobile: single-column, tilt disabled (touch)
 * Desktop: full layout with 3D tilt on architecture cards
 */

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { slideIn, fadeIn, staggerCards, marquee } from '../utils/scrollAnimations'
import NeuralNetworkScene from '../components/NeuralNetworkScene'

gsap.registerPlugin(ScrollTrigger)

const ARCHITECTURES = [
  { icon:'◈', abbr:'CNN', name:'Convolutional Neural Networks', color:'#00d4ff', year:'2012', milestone:'AlexNet — ImageNet',
    desc:'Hierarchical spatial feature extraction via learned filters. Powers object detection, medical imaging, and autonomous driving.' },
  { icon:'⟳', abbr:'RNN', name:'Recurrent Neural Networks',     color:'#7b2fff', year:'2014', milestone:'Seq2Seq, LSTM',
    desc:'Hidden state as memory — the architecture that first made language translation viable. Foundation for understanding sequential data.' },
  { icon:'⊗', abbr:'GAN', name:'Generative Adversarial Networks',color:'#c040ff', year:'2014', milestone:'Goodfellow et al.',
    desc:'Generator vs. discriminator in zero-sum competition. The creative engine behind synthetic imagery, deepfakes, and drug design.' },
  { icon:'◎', abbr:'TFM', name:'The Transformer',                color:'#ff2d78', year:'2017', milestone:'"Attention is all you need"',
    desc:'Self-attention replaces recurrence. Parallelizable, scalable, voracious for data. The bedrock of every modern frontier model.' },
]

const MARQUEE_TEXT = '  ATTENTION IS ALL YOU NEED  ·  DEEP LEARNING  ·  BACKPROPAGATION  ·  GRADIENT DESCENT  ·  CONVOLUTIONAL LAYERS  ·  LATENT SPACE  ·  EMBEDDINGS  ·  FINE-TUNING  ·'

const isTouch = () => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)

export default function DeepLearning() {
  const sectionRef   = useRef(null)
  const netWrapRef   = useRef(null)
  const eyebrowRef   = useRef(null)
  const headerRef    = useRef(null)
  const introRef     = useRef([])
  const cardRefs     = useRef([])
  const marqueeInner = useRef(null)

  useEffect(() => {
    const ctxs = [
      fadeIn(eyebrowRef.current,  { yOffset:14, duration:0.8,  st:{ start:'top 84%' } }),
      slideIn(headerRef.current,  { direction:'right', distance:80, duration:1.1, st:{ start:'top 82%' } }),
      fadeIn(introRef.current,    { yOffset:30, duration:0.85, stagger:0.15, st:{ start:'top 85%' } }),
      fadeIn(netWrapRef.current,  { yOffset:20, duration:1.0,  st:{ start:'top 85%' } }),
      staggerCards(cardRefs.current, { scaleFrom:0.92, yOffset:50, stagger:0.13, duration:0.8 }),
      marquee(marqueeInner.current, { duration:22 }),
    ]
    return () => ctxs.forEach(c => c.revert())
  }, [])

  /* 3D tilt on architecture cards — desktop only */
  const onCardMove = (e, color) => {
    if (isTouch()) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x    = (e.clientX - rect.left) / rect.width  - 0.5
    const y    = (e.clientY - rect.top)  / rect.height - 0.5
    gsap.to(e.currentTarget, {
      rotateY: x * 10, rotateX: -y * 10, scale: 1.02,
      border:    `1px solid ${color}55`,
      boxShadow: `0 20px 60px ${color}15, 0 0 0 1px ${color}30`,
      duration: 0.3, ease:'power2.out', transformPerspective:800,
    })
  }
  const onCardLeave = (e, color) => {
    gsap.to(e.currentTarget, {
      rotateY:0, rotateX:0, scale:1,
      border:`1px solid ${color}20`, boxShadow:'none',
      duration:0.5, ease:'power2.inOut',
    })
  }

  return (
    <section
      id="deep-learning"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background:'linear-gradient(170deg,#020408 0%,#08051a 50%,#020408 100%)' }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage:'linear-gradient(rgba(123,47,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(123,47,255,0.025) 1px,transparent 1px)',
          backgroundSize:'60px 60px' }} aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse 55% 60% at 85% 40%,rgba(123,47,255,0.06) 0%,transparent 70%)' }} aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 md:px-10 py-20 sm:py-28">

        {/* Header — right-aligned */}
        <div className="text-right mb-10 sm:mb-16">
          <div ref={eyebrowRef} className="inline-flex items-center justify-end gap-3 mb-4 sm:mb-5 opacity-0">
            <span className="font-mono text-[10px] tracking-[0.4em] text-violet-400/60 uppercase">Chapter 04</span>
            <span className="w-7 sm:w-8 h-px bg-violet-400/40" />
          </div>
          <div ref={headerRef} className="opacity-0">
            <h2 className="leading-none" style={{ fontFamily:'"Bebas Neue",cursive', fontSize:'clamp(2.8rem,8vw,9rem)' }}>
              <span className="text-slate-100">DEEP</span>{' '}
              <span style={{ background:'linear-gradient(135deg,#7b2fff,#ff2d78)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                LEARNING
              </span>
            </h2>
          </div>
        </div>

        {/* Intro — two columns on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mb-12 sm:mb-20">
          <p ref={el => (introRef.current[0] = el)}
            className="text-slate-400 leading-relaxed text-sm opacity-0" style={{ fontFamily:'"DM Sans",sans-serif' }}>
            The year is 2012. AlexNet enters ImageNet and obliterates the competition — not by a
            few points, but by a margin so vast the field has to reconsider its assumptions.
            The deep learning era begins not with a whisper, but a thunderclap.
          </p>
          <p ref={el => (introRef.current[1] = el)}
            className="text-slate-500 leading-relaxed text-sm opacity-0" style={{ fontFamily:'"DM Sans",sans-serif' }}>
            The secret: depth. Stack enough non-linear layers, feed enough data, apply enough
            compute, and something remarkable emerges — representations no human designed.
            The machine begins to{' '}
            <em className="text-violet-300/70 not-italic">see</em>.
          </p>
        </div>

        {/* 3D Neural Network */}
        <div
          ref={netWrapRef}
          className="mb-12 sm:mb-20 rounded-xl sm:rounded-2xl overflow-hidden opacity-0"
          style={{ background:'rgba(6,3,18,0.85)', border:'1px solid rgba(123,47,255,0.22)',
            backdropFilter:'blur(16px)', boxShadow:'0 0 80px rgba(123,47,255,0.10)' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 pt-4 sm:pt-5 pb-2">
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] text-violet-400/50 uppercase">
              7-Layer Deep Network · Live 3D Visualization
            </span>
            <div className="flex items-center gap-2 sm:gap-3">
              {['INPUT','HIDDEN','OUTPUT'].map((l, i) => (
                <span key={l} className="font-mono text-[8px] sm:text-[9px] tracking-widest flex items-center gap-1"
                  style={{ color:[`#00d4ff`,`#7b2fff`,`#ff2d78`][i] + '90' }}>
                  <span className="w-1.5 h-1.5 rounded-full inline-block"
                    style={{ background:[`#00d4ff`,`#7b2fff`,`#ff2d78`][i] }} />
                  {l}
                </span>
              ))}
            </div>
          </div>

          <NeuralNetworkScene height={320} className="sm:hidden" />
          <NeuralNetworkScene height={440} className="hidden sm:block" />

          <div className="flex justify-between px-4 sm:px-8 pb-4 sm:pb-5 pt-1">
            {['INPUT','H·01','H·02','H·03','H·04','H·05','OUTPUT'].map((lbl, i) => (
              <span key={lbl} className="font-mono text-[7px] sm:text-[9px] tracking-widest"
                style={{ color:['#00d4ff','#1ac8ff','#7b2fff','#9528ff','#c040ff','#e030d0','#ff2d78'][i] + '70' }}>
                {lbl}
              </span>
            ))}
          </div>
        </div>

        {/* Architecture cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-12 sm:mb-20">
          {ARCHITECTURES.map((arch, i) => (
            <div
              key={arch.abbr}
              ref={el => (cardRefs.current[i] = el)}
              className="rounded-xl p-5 sm:p-6 opacity-0"
              style={{ background:'rgba(8,5,20,0.7)', border:`1px solid ${arch.color}20`, backdropFilter:'blur(12px)' }}
              data-cursor data-accent={arch.color}
              onMouseMove={e => onCardMove(e, arch.color)}
              onMouseLeave={e => onCardLeave(e, arch.color)}
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <span className="font-mono text-2xl sm:text-3xl leading-none"
                  style={{ color:arch.color, textShadow:`0 0 20px ${arch.color}60` }}>
                  {arch.icon}
                </span>
                <div className="text-right">
                  <span className="font-mono text-[9px] sm:text-[10px] px-2 py-0.5 rounded tracking-widest"
                    style={{ color:arch.color, background:`${arch.color}12`, border:`1px solid ${arch.color}25` }}>
                    {arch.year}
                  </span>
                  <div className="font-mono text-[8px] sm:text-[9px] text-slate-700 tracking-widest mt-1">{arch.milestone}</div>
                </div>
              </div>
              <div className="text-slate-100 mb-1 leading-tight"
                style={{ fontFamily:'"Bebas Neue",cursive', fontSize:'clamp(1.4rem,3vw,1.8rem)', letterSpacing:'0.04em' }}>
                {arch.abbr}
              </div>
              <div className="font-mono text-[9px] sm:text-[10px] tracking-wider mb-2 sm:mb-3" style={{ color:`${arch.color}80` }}>
                {arch.name}
              </div>
              <p className="text-slate-500 text-xs leading-relaxed font-light" style={{ fontFamily:'"DM Sans",sans-serif' }}>
                {arch.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Pull quote */}
        <div className="rounded-xl p-6 sm:p-8 text-center"
          style={{ background:'rgba(123,47,255,0.06)', border:'1px solid rgba(123,47,255,0.15)' }}>
          <p className="text-slate-200 font-light leading-relaxed"
            style={{ fontFamily:'"DM Sans",sans-serif', fontSize:'clamp(0.9rem,1.8vw,1.3rem)', fontStyle:'italic' }}>
            "The fact that deep learning works is somewhat miraculous — and yet it works,
            reliably, at scale, across nearly every domain of perception we have tried."
          </p>
          <div className="mt-3 sm:mt-4 font-mono text-[9px] sm:text-[10px] tracking-widest text-slate-600">
            — Yann LeCun, 2022
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden py-3 sm:py-4 border-t border-b"
        style={{ borderColor:'rgba(123,47,255,0.15)' }} aria-hidden="true">
        <div ref={marqueeInner} className="flex whitespace-nowrap">
          {[1,2].map(k => (
            <span key={k} className="font-mono text-[9px] sm:text-[10px] tracking-[0.35em] text-violet-500/30 uppercase shrink-0"
              style={{ width:'50%', display:'inline-block' }}>
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
