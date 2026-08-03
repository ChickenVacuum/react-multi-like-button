import { useEffect, useRef, useState } from "react"
import { createRoot } from "react-dom/client"
import { LikeButtonVanilla } from "../../src/LikeButton/LikeButton.vanilla"
import type { IconRenderProps } from "../../src/LikeButton/types"
import type { CustomParticleShape } from "../../src/Particle/types"
import "../../src/styles.css"
import "./styles.css"

const LOOP_DURATION_MS = 9_000

const sequence = [
  { at: 800, button: 0 },
  { at: 1_400, button: 1 },
  { at: 2_100, button: 2 },
  { at: 2_700, button: 1 },
  { at: 3_500, button: 2 },
  { at: 4_200, button: 1 },
  { at: 5_000, button: 2 },
  { at: 5_800, button: 1 },
] as const

function MoodIcon({ size, className, fillPercentage }: IconRenderProps) {
  const stage = Math.min(4, Math.floor(fillPercentage / 25))

  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {stage >= 3 ? (
        <>
          <path d="M5.5 9.5q2-2.5 4 0M14.5 9.5q2-2.5 4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="5" cy="13" r="1.25" fill="#fb7185" opacity="0.8" />
          <circle cx="19" cy="13" r="1.25" fill="#fb7185" opacity="0.8" />
        </>
      ) : (
        <>
          <circle cx="8" cy="9" r={stage === 0 ? 1 : 1.2} fill="currentColor" />
          <circle cx="16" cy="9" r={stage === 0 ? 1 : 1.2} fill="currentColor" />
        </>
      )}

      {stage === 0 && <path d="M8.5 15h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}
      {stage === 1 && <path d="M8 14.5q4 3 8 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}
      {stage === 2 && <path d="M7.5 13.5q4.5 5 9 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}
      {stage === 3 && <path d="M7 13q5 6 10 0Z" fill="currentColor" opacity="0.9" />}
      {stage === 4 && (
        <>
          <path d="M6.5 12.5q5.5 8 11 0Z" fill="currentColor" />
          <path d="M9.5 17.2q2.5-1.9 5 0" stroke="#fb7185" strokeWidth="1.2" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}

const flameParticle: CustomParticleShape = {
  render: ({ size, color, className }) => (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 32 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M17 2c2 8 10 10 10 21 0 8-5 14-12 14S3 32 3 24c0-7 4-12 9-18 0 7 3 9 5 10 2-5 2-9 0-14Z"
        fill={color}
      />
      <path d="M16 18c1 5 5 6 5 11 0 4-2 7-6 7s-6-3-6-7c0-3 2-6 5-9 0 3 1 5 2 5 1-2 1-5 0-7Z" fill="#fff7cc" />
    </svg>
  ),
}

function RocketIcon({ size, className, fillPercentage, isMaxed }: IconRenderProps) {
  const translateY = 8 - fillPercentage * 0.11
  const progress = fillPercentage / 100
  const flameScale = 0.2 + progress * 1.1

  return (
    <svg
      width={size * 1.4}
      height={size * 1.4}
      className={`${className} rocket-icon${isMaxed ? " rocket-icon--launched" : ""}`}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10" cy="12" r="1.5" fill="#fbbf24" />
      <circle cx="52" cy="19" r="1" fill="#f8fafc" />
      <path d="m48 8 1 2.3L51.5 11 49 12l-1 2.3-1-2.3-2.5-1 2.5-.7L48 8Z" fill="#f8fafc" />
      {isMaxed && (
        <g className="rocket-icon__arrival">
          <ellipse
            cx="32"
            cy="30"
            rx="27"
            ry="12"
            transform="rotate(-18 32 30)"
            stroke="#bae6fd"
            strokeWidth="1.4"
            strokeDasharray="3 3"
            opacity="0.9"
          />
          <circle cx="52" cy="13" r="6" fill="#fde68a" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="50" cy="11" r="1.2" fill="#f59e0b" opacity="0.7" />
          <circle cx="54.5" cy="14.5" r="1.5" fill="#f59e0b" opacity="0.55" />
          <circle cx="51" cy="51" r="7" fill="#34d399" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="m47.5 51 2.2 2.2 4.6-5"
            stroke="#f8fafc"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}
      <g
        className="rocket-icon__ship"
        style={{
          transform: `translateY(${translateY}px)`,
          transformOrigin: "32px 32px",
          transition: "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <path
          d="M25 27 14 41l13-4Z M39 27l11 14-13-4Z"
          fill="#f8fafc"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 7c8 7 11 16 9 27l-9 8-9-8C21 23 24 14 32 7Z"
          fill="#f8fafc"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx="32" cy="24" r="5" fill="#38bdf8" stroke="currentColor" strokeWidth="2.5" />
        <g
          className="rocket-icon__engine"
          style={{
            opacity: progress,
            transform: `scaleY(${flameScale})`,
            transformOrigin: "32px 42px",
            transition: "opacity 500ms ease, transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <path
            className="rocket-icon__flame"
            d="M27 42h10l-5 13-5-13Z"
            fill="#fbbf24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="m30 43 2 7 2-7" stroke="#fb7185" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  )
}

const sharedStyles = {
  borderWidth: 3,
  borderColor: "#0f172a",
  shadowOffset: 7,
  shadowColor: "#020617",
  backgroundColor: "#ffffff",
}

function HeroScene() {
  const favoriteRef = useRef<HTMLButtonElement>(null)
  const applauseRef = useRef<HTMLButtonElement>(null)
  const celebrateRef = useRef<HTMLButtonElement>(null)
  const [clicks, setClicks] = useState([0, 0, 0])

  useEffect(() => {
    const refs = [favoriteRef, applauseRef, celebrateRef]
    let timers: Array<ReturnType<typeof setTimeout>> = []

    const play = () => {
      setClicks([0, 0, 0])
      timers = sequence.map(({ at, button }) =>
        setTimeout(() => refs[button].current?.click(), at),
      )
    }

    play()
    document.body.dataset.sceneReady = "true"
    const loop = setInterval(play, LOOP_DURATION_MS)

    return () => {
      clearInterval(loop)
      for (const timer of timers) clearTimeout(timer)
    }
  }, [])

  const updateClicks = (button: number, value: number) => {
    setClicks((current) => current.map((count, index) => (index === button ? value : count)))
  }

  return (
    <main className="hero-scene" aria-label="Animated reaction button examples">
      <div className="hero-scene__glow hero-scene__glow--rose" />
      <div className="hero-scene__glow hero-scene__glow--gold" />
      <div className="hero-scene__glow hero-scene__glow--blue" />

      <section className="reaction reaction--rose">
        <LikeButtonVanilla
          ref={favoriteRef}
          size={152}
          clicks={clicks[0]}
          onChange={(value) => updateClicks(0, value)}
          maxClicks={1}
          fillColor="#fb7185"
          waveColor="#e11d48"
          particlePreset="burst"
          styles={sharedStyles}
          cursor="none"
          ariaLabel="Like"
        />
      </section>

      <section className="reaction reaction--gold">
        <LikeButtonVanilla
          ref={applauseRef}
          size={152}
          clicks={clicks[1]}
          onChange={(value) => updateClicks(1, value)}
          maxClicks={4}
          fillColor="#fbbf24"
          waveColor="#f59e0b"
          particlePreset="gentle"
          particleConfig={{
            shape: "sparkle",
            colors: ["#fde68a", "#fb7185", "#fbbf24"],
            count: 7,
            distance: { min: 60, max: 95 },
          }}
          renderIcon={(props) => <MoodIcon {...props} />}
          shape="circle"
          styles={sharedStyles}
          cursor="none"
          ariaLabel="Make it happier"
        />
      </section>

      <section className="reaction reaction--blue">
        <LikeButtonVanilla
          ref={celebrateRef}
          size={152}
          clicks={clicks[2]}
          onChange={(value) => updateClicks(2, value)}
          maxClicks={3}
          fillColor="#111936"
          waveColor="#312e81"
          showWaves={false}
          particleConfig={{
            shape: flameParticle,
            colors: ["#ef4444", "#f97316", "#fb923c", "#facc15"],
            count: 6 + clicks[2] * 5,
            speed: 850,
            size: { min: 0.7 + clicks[2] * 0.15, max: 1 + clicks[2] * 0.3 },
            distance: { min: 75 + clicks[2] * 8, max: 105 + clicks[2] * 18 },
            spread: 55,
            spreadOffset: 90,
          }}
          renderIcon={(props) => <RocketIcon {...props} />}
          shape={{ borderRadius: "2rem" }}
          styles={{ ...sharedStyles, backgroundColor: "#010208", borderColor: "#334155" }}
          cursor="none"
          ariaLabel="Launch"
        />
      </section>
    </main>
  )
}

createRoot(document.getElementById("root")!).render(<HeroScene />)
