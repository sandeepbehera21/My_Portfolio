import { motion, type MotionValue } from 'framer-motion'

interface BlobsProps {
  parallaxX: MotionValue<number>
  parallaxY: MotionValue<number>
  parallaxSlowX: MotionValue<number>
  parallaxSlowY: MotionValue<number>
  reducedMotion: boolean
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const

/**
 * Refined Cosmic Developer Stage Layer:
 * - Restrained technical coordinate grid & crosshairs (+)
 * - Subtle cyan orbital arcs & elliptical trajectories
 * - Left & Right 3D rim-lit planets (~14% smaller for balanced visual hierarchy)
 * - Controlled cyan halftone dot matrix framing the central portrait
 * - Subtle, atmospheric mountain silhouette along the horizon with restrained cyan highlights
 * - Full Dark (#05080D) & Light (#F6F8FB) theme adaptation via CSS custom properties
 */
export default function Blobs({
  parallaxX,
  parallaxY,
  parallaxSlowX,
  parallaxSlowY,
  reducedMotion,
}: BlobsProps) {
  const initialFade = reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }

  return (
    <div className="hero-blobs-layer" aria-hidden="true">
      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="hero-blobs-svg"
      >
        <defs>
          {/* Central cyan halftone dot pattern */}
          <pattern
            id="ht-cyan-center"
            width="15"
            height="15"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="7.5" cy="7.5" r="2.1" fill="var(--hero-ht-dot, var(--hero-cyan, #00D9F5))" />
          </pattern>

          {/* Finer outer cyan halftone dot pattern */}
          <pattern
            id="ht-cyan-fine"
            width="15"
            height="15"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="7.5" cy="7.5" r="1.25" fill="var(--hero-ht-dot, var(--hero-cyan, #00D9F5))" />
          </pattern>

          {/* Subtle technical dot matrix for side panels */}
          <pattern
            id="ht-tech-dots"
            width="18"
            height="18"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="4" cy="4" r="1.2" fill="var(--hero-tech-dot, rgba(0, 217, 245, 0.24))" />
          </pattern>

          {/* Subtle planet surface organic texture filter */}
          <filter id="planet-surface" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.026"
              numOctaves="3"
              seed="14"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0
                      0 0.55 0 0 0.04
                      0 0.72 0 0 0.06
                      0 0 0 0.26 0"
              in="noise"
              result="coloredNoise"
            />
            <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="textured" />
            <feBlend mode="screen" in="SourceGraphic" in2="textured" />
          </filter>

          {/* Restrained glow filter for cyan rim lights */}
          <filter id="cyan-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="cyan-soft-limb" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="16" result="blur1" />
            <feGaussianBlur stdDeviation="6" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial mask for portrait halftone aura */}
          <radialGradient id="portrait-halftone-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="45%" stopColor="white" stopOpacity="0.72" />
            <stop offset="76%" stopColor="white" stopOpacity="0.22" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </radialGradient>

          <mask id="mask-portrait-halftone">
            <ellipse cx="790" cy="515" rx="310" ry="235" fill="url(#portrait-halftone-grad)" />
          </mask>

          <mask id="mask-portrait-halftone-core">
            <ellipse cx="790" cy="500" rx="195" ry="165" fill="url(#portrait-halftone-grad)" />
          </mask>

          {/* Restrained ambient cyan backlight behind portrait */}
          <radialGradient id="center-cyan-aura" cx="50%" cy="52%" r="44%">
            <stop offset="0%" stopColor="var(--hero-cyan, #00D9F5)" stopOpacity="var(--hero-aura-opacity, 0.16)" />
            <stop offset="50%" stopColor="var(--hero-cyan, #00D9F5)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="var(--hero-bg, #05080D)" stopOpacity="0" />
          </radialGradient>

          {/* Left Planet Shading (~14% smaller, controlled contrast) */}
          <radialGradient id="left-planet-fill" cx="76%" cy="32%" r="72%">
            <stop offset="0%" stopColor="var(--hero-planet-rim, #5CE8FF)" stopOpacity="0.88" />
            <stop offset="18%" stopColor="var(--hero-cyan, #00D9F5)" stopOpacity="0.65" />
            <stop offset="44%" stopColor="var(--hero-planet-mid, #092E3E)" stopOpacity="0.92" />
            <stop offset="74%" stopColor="var(--hero-planet-core, #07131D)" stopOpacity="0.98" />
            <stop offset="100%" stopColor="var(--hero-planet-shadow, #04080E)" stopOpacity="1" />
          </radialGradient>

          <radialGradient id="left-planet-halo" cx="62%" cy="42%" r="56%">
            <stop offset="0%" stopColor="var(--hero-cyan, #00D9F5)" stopOpacity="var(--hero-planet-halo-opacity, 0.24)" />
            <stop offset="55%" stopColor="var(--hero-cyan, #00D9F5)" stopOpacity="0.07" />
            <stop offset="100%" stopColor="var(--hero-cyan, #00D9F5)" stopOpacity="0" />
          </radialGradient>

          {/* Right Large Planet Shading (~14% smaller, refined rim light) */}
          <radialGradient id="right-planet-fill" cx="84%" cy="38%" r="76%">
            <stop offset="0%" stopColor="var(--hero-planet-rim, #9AF5FF)" stopOpacity="0.92" />
            <stop offset="14%" stopColor="var(--hero-cyan, #00D9F5)" stopOpacity="0.74" />
            <stop offset="35%" stopColor="var(--hero-planet-mid, #0A3F54)" stopOpacity="0.92" />
            <stop offset="65%" stopColor="var(--hero-planet-core, #071722)" stopOpacity="0.97" />
            <stop offset="100%" stopColor="var(--hero-planet-shadow, #04080E)" stopOpacity="1" />
          </radialGradient>

          <radialGradient id="right-planet-halo" cx="70%" cy="42%" r="54%">
            <stop offset="0%" stopColor="var(--hero-cyan, #00D9F5)" stopOpacity="var(--hero-planet-halo-opacity, 0.28)" />
            <stop offset="50%" stopColor="var(--hero-cyan, #00D9F5)" stopOpacity="0.09" />
            <stop offset="100%" stopColor="var(--hero-cyan, #00D9F5)" stopOpacity="0" />
          </radialGradient>

          {/* Right Foreground Moon Shading */}
          <radialGradient id="right-moon-fill" cx="86%" cy="42%" r="74%">
            <stop offset="0%" stopColor="var(--hero-planet-rim, #7CF0FF)" stopOpacity="0.88" />
            <stop offset="20%" stopColor="var(--hero-cyan, #00D9F5)" stopOpacity="0.64" />
            <stop offset="48%" stopColor="var(--hero-planet-mid, #082635)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="var(--hero-planet-shadow, #04080E)" stopOpacity="1" />
          </radialGradient>

          {/* Subtle horizon mist rising behind the mountain silhouette */}
          <linearGradient id="mountain-mist" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--hero-cyan, #00D9F5)" stopOpacity="0" />
            <stop offset="52%" stopColor="var(--hero-cyan, #00D9F5)" stopOpacity="var(--hero-mist-opacity, 0.12)" />
            <stop offset="82%" stopColor="var(--hero-mtn-mist-mid, #082F42)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--hero-mtn-bottom-fade, #04070C)" stopOpacity="0.88" />
          </linearGradient>

          {/* Mountain silhouette body gradient (Dark Navy in dark mode, Dark Charcoal in light mode) */}
          <linearGradient id="mountain-base" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--hero-mtn-base-1, #0E2231)" />
            <stop offset="42%" stopColor="var(--hero-mtn-base-2, #08131D)" />
            <stop offset="100%" stopColor="var(--hero-mtn-base-3, #04070B)" />
          </linearGradient>

          {/* Restrained cyan facet highlight on mountain slopes */}
          <linearGradient id="mountain-cyan-facet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--hero-cyan, #00D9F5)" stopOpacity="var(--hero-mtn-facet-opacity, 0.38)" />
            <stop offset="45%" stopColor="var(--hero-cyan, #00D9F5)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--hero-mtn-base-2, #08131D)" stopOpacity="0.05" />
          </linearGradient>

          {/* Bottom readability vignette */}
          <linearGradient id="bottom-bar-vignette" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--hero-mtn-base-3, #04070B)" stopOpacity="0" />
            <stop offset="75%" stopColor="var(--hero-mtn-base-3, #04070B)" stopOpacity="0.72" />
            <stop offset="100%" stopColor="var(--hero-mtn-base-3, #04070B)" stopOpacity="0.92" />
          </linearGradient>

          {/* Orbital ring linear gradient */}
          <linearGradient id="orbit-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--hero-cyan, #00D9F5)" stopOpacity="0.04" />
            <stop offset="38%" stopColor="var(--hero-cyan, #00D9F5)" stopOpacity="0.32" />
            <stop offset="70%" stopColor="var(--hero-cyan, #00D9F5)" stopOpacity="0.52" />
            <stop offset="100%" stopColor="var(--hero-cyan, #00D9F5)" stopOpacity="0.06" />
          </linearGradient>
        </defs>

        {/* ============================================================
            1. RESTRAINED TECHNICAL GRID, ORBITAL ARCS & CROSSHAIRS
            ============================================================ */}
        <g opacity="var(--hero-grid-opacity, 0.5)">
          {/* Subtle coordinate grid lines */}
          <line x1="265" y1="0" x2="265" y2="1000" stroke="var(--hero-grid-line, rgba(0, 217, 245, 0.05))" strokeWidth="1" />
          <line x1="530" y1="0" x2="530" y2="1000" stroke="var(--hero-grid-line, rgba(0, 217, 245, 0.04))" strokeWidth="1" />
          <line x1="1115" y1="0" x2="1115" y2="1000" stroke="var(--hero-grid-line, rgba(0, 217, 245, 0.04))" strokeWidth="1" />
          <line x1="1380" y1="0" x2="1380" y2="1000" stroke="var(--hero-grid-line, rgba(0, 217, 245, 0.05))" strokeWidth="1" />
          <line x1="0" y1="355" x2="1600" y2="355" stroke="var(--hero-grid-line, rgba(0, 217, 245, 0.04))" strokeWidth="1" />
          <line x1="0" y1="570" x2="1600" y2="570" stroke="var(--hero-grid-line, rgba(0, 217, 245, 0.04))" strokeWidth="1" />

          {/* Side rectangular technical dot clusters */}
          <rect x="52" y="335" width="180" height="84" fill="url(#ht-tech-dots)" opacity="0.6" />
          <rect x="120" y="600" width="125" height="84" fill="url(#ht-tech-dots)" opacity="0.45" />
          <rect x="1240" y="205" width="115" height="125" fill="url(#ht-tech-dots)" opacity="0.6" />

          {/* Crosshair reticles (+) */}
          <g stroke="var(--hero-crosshair, rgba(0, 217, 245, 0.35))" strokeWidth="1.1">
            {/* Left crosshair */}
            <line x1="184" y1="570" x2="208" y2="570" />
            <line x1="196" y1="558" x2="196" y2="582" />
            {/* Upper-right crosshair */}
            <line x1="1368" y1="355" x2="1392" y2="355" />
            <line x1="1380" y1="343" x2="1380" y2="367" />
            {/* Lower-right crosshair */}
            <line x1="1368" y1="582" x2="1392" y2="582" />
            <line x1="1380" y1="570" x2="1380" y2="594" />
          </g>
        </g>

        {/* ============================================================
            2. CONTROLLED AMBIENT BACKLIGHT & HALFTONE DOT MATRIX
            ============================================================ */}
        <ellipse cx="790" cy="540" rx="500" ry="320" fill="url(#center-cyan-aura)" />

        <motion.g
          style={{ x: parallaxSlowX, y: parallaxSlowY }}
          initial={initialFade}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.05, ease: EASE_OUT }}
        >
          {/* Outer fine cyan halftone matrix behind portrait */}
          <rect
            x="460"
            y="265"
            width="660"
            height="490"
            fill="url(#ht-cyan-fine)"
            mask="url(#mask-portrait-halftone)"
            opacity="var(--hero-ht-outer-opacity, 0.48)"
          />
          {/* Inner cyan halftone matrix framing portrait */}
          <rect
            x="565"
            y="315"
            width="450"
            height="380"
            fill="url(#ht-cyan-center)"
            mask="url(#mask-portrait-halftone-core)"
            opacity="var(--hero-ht-core-opacity, 0.65)"
          />
        </motion.g>

        {/* ============================================================
            3. SUBTLE SWEEPING ORBITAL ARCS
            ============================================================ */}
        <motion.g
          style={{ x: parallaxSlowX, y: parallaxSlowY }}
          initial={initialFade}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: EASE_OUT }}
        >
          {/* Left sweeping planetary trajectory */}
          <path
            d="M195 65 C 375 200, 505 415, 515 690"
            stroke="url(#orbit-cyan-grad)"
            strokeWidth="1.2"
            fill="none"
            opacity="0.65"
          />
          {/* Upper-right vertical orbital arc */}
          <path
            d="M1135 55 C 1245 235, 1275 475, 1195 735"
            stroke="var(--hero-crosshair, rgba(0, 217, 245, 0.2))"
            strokeWidth="1"
            fill="none"
          />
        </motion.g>

        {/* ============================================================
            4. LEFT RIM-LIT 3D PLANET (~14% REDUCED DOMINANCE)
            ============================================================ */}
        <motion.g
          style={{ x: parallaxX, y: parallaxY }}
          initial={initialFade}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.95, delay: 0.12, ease: EASE_OUT }}
        >
          <g className="hero-planet-left">
            {/* Restrained atmospheric cyan halo */}
            <circle cx="388" cy="578" r="145" fill="url(#left-planet-halo)" />

            {/* Planet body (radius reduced from 112 -> 96) */}
            <circle
              cx="375"
              cy="585"
              r="96"
              fill="url(#left-planet-fill)"
              filter="url(#planet-surface)"
            />

            {/* Refined cyan crescent rim highlight */}
            <path
              d="M375 489 A 96 96 0 0 1 471 585 A 96 96 0 0 1 405 676 A 93.5 96 0 0 0 466 585 A 93.5 96 0 0 0 375 489 Z"
              fill="var(--hero-planet-rim, #72F2FF)"
              filter="url(#cyan-glow)"
              opacity="var(--hero-rim-opacity, 0.82)"
            />
          </g>
        </motion.g>

        {/* ============================================================
            5. RIGHT RIM-LIT PLANET + MOON (~14% REDUCED DOMINANCE)
            ============================================================ */}
        <motion.g
          style={{ x: parallaxX, y: parallaxY }}
          initial={initialFade}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.95, delay: 0.16, ease: EASE_OUT }}
        >
          <g className="hero-planet-right">
            {/* Controlled outer atmospheric glow */}
            <circle cx="1135" cy="395" r="225" fill="url(#right-planet-halo)" />

            {/* Large planet body (radius reduced from 196 -> 168) */}
            <circle
              cx="1100"
              cy="395"
              r="168"
              fill="url(#right-planet-fill)"
              filter="url(#planet-surface)"
            />

            {/* Refined glowing cyan crescent limb on right edge */}
            <path
              d="M1074 229 A 168 168 0 0 1 1268 395 A 168 168 0 0 1 1147 556 A 164 168 0 0 0 1261 395 A 164 168 0 0 0 1074 229 Z"
              fill="var(--hero-planet-rim, #A6F8FF)"
              filter="url(#cyan-soft-limb)"
              opacity="var(--hero-rim-opacity, 0.86)"
            />

            {/* Smaller foreground moon (radius reduced from 74 -> 62) */}
            <circle
              cx="1122"
              cy="432"
              r="62"
              fill="url(#right-moon-fill)"
              filter="url(#planet-surface)"
            />
            {/* Foreground moon cyan crescent rim light */}
            <path
              d="M1122 370 A 62 62 0 0 1 1184 432 A 62 62 0 0 1 1136 492 A 59.5 62 0 0 0 1180 432 A 59.5 62 0 0 0 1122 370 Z"
              fill="var(--hero-planet-rim, #72F2FF)"
              filter="url(#cyan-glow)"
              opacity="var(--hero-rim-opacity, 0.8)"
            />

            {/* Sweeping tilted orbital ring looping in front of planet */}
            <path
              d="M935 282 C 1135 300, 1405 425, 1385 525 C 1365 605, 1140 625, 950 570"
              stroke="url(#orbit-cyan-grad)"
              strokeWidth="1.35"
              fill="none"
            />
          </g>
        </motion.g>

        {/* ============================================================
            6. SUBTLE ATMOSPHERIC MOUNTAIN HORIZON & RESTRAINED HIGHLIGHTS
            ============================================================ */}
        <motion.g
          style={{ x: parallaxSlowX }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT }}
        >
          {/* Soft atmospheric horizon mist */}
          <rect x="0" y="700" width="1600" height="300" fill="url(#mountain-mist)" />

          {/* Distant atmospheric mountain ridge (lower, non-competing profile) */}
          <path
            d="M0 1000 V 862 L 105 828 L 195 850 L 300 764 L 415 832 L 515 805 L 645 845 L 780 798 L 915 852 L 1045 812 L 1185 865 L 1315 835 L 1455 872 L 1600 842 V 1000 Z"
            fill="url(#mountain-base)"
          />

          {/* Restrained cyan-lit facets on mountain slopes */}
          <polygon
            points="300,764 358,798 328,848 272,808"
            fill="url(#mountain-cyan-facet)"
          />
          <polygon
            points="515,805 585,830 542,865 492,830"
            fill="url(#mountain-cyan-facet)"
          />
          <polygon
            points="780,798 855,832 812,872 752,835"
            fill="url(#mountain-cyan-facet)"
          />
          <polygon
            points="1045,812 1130,850 1085,888 1018,848"
            fill="url(#mountain-cyan-facet)"
          />

          {/* Foreground dark mountain silhouette */}
          <path
            d="M0 1000 V 892 L 75 866 L 150 884 L 240 822 L 300 764 L 372 808 L 448 852 L 538 825 L 628 866 L 712 842 L 822 828 L 925 872 L 1018 846 L 1122 885 L 1235 862 L 1345 900 L 1465 878 L 1600 905 V 1000 Z"
            fill="var(--hero-mtn-fore, #04080E)"
            opacity="0.9"
          />

          {/* Subtle cyan ridge rim-lighting strokes along mountain crests */}
          <path
            d="M75 866 L 150 884 L 240 822 L 300 764 L 372 808 L 448 852 L 538 825 L 628 866 M 712 842 L 822 828 L 925 872 L 1018 846 L 1122 885"
            stroke="url(#orbit-cyan-grad)"
            strokeWidth="1.2"
            fill="none"
            opacity="0.6"
          />

          {/* Bottom vignette so bottom bar labels, social icons & preview card remain clearly visible */}
          <rect
            x="0"
            y="880"
            width="1600"
            height="120"
            fill="url(#bottom-bar-vignette)"
          />
        </motion.g>
      </svg>
    </div>
  )
}
