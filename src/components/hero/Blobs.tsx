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
 * Art-directed SVG organic liquid shapes and halftone textures.
 * Uses a 1600x1000 coordinate space carefully calibrated around the central portrait:
 * - Face area (x: 650-950, y: 200-500) is kept 100% clear.
 * - Shapes frame the head, shoulders, and flanks.
 * - All shapes remain behind the typography so SANDEEP and BEHERA stay perfectly legible.
 */
export default function Blobs({
  parallaxX,
  parallaxY,
  parallaxSlowX,
  parallaxSlowY,
  reducedMotion,
}: BlobsProps) {
  const initialScale = reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }

  return (
    <div className="hero-blobs-layer" aria-hidden="true">
      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="hero-blobs-svg"
      >
        <defs>
          {/* Crisp, fine angled halftone dot patterns */}
          <pattern
            id="ht-lime"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(18)"
          >
            <circle cx="2.8" cy="2.8" r="1.9" fill="var(--hero-blob-lime, var(--hero-chartreuse))" />
          </pattern>
          <pattern
            id="ht-pink"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-15)"
          >
            <circle cx="2.8" cy="2.8" r="1.9" fill="var(--hero-blob-pink, var(--hero-pink))" />
          </pattern>
          <pattern
            id="ht-dark"
            width="9"
            height="9"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(22)"
          >
            <circle cx="2.4" cy="2.4" r="1.75" fill="var(--hero-blob-dots-dark, var(--hero-bg))" />
          </pattern>

          {/* Radial soft masks so halftone dot clusters feather out organically */}
          <radialGradient id="fade-mask-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="65%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </radialGradient>

          <mask id="mask-top-dots">
            <ellipse cx="490" cy="110" rx="90" ry="70" fill="url(#fade-mask-grad)" />
          </mask>
          <mask id="mask-right-pink-dots">
            <ellipse cx="1280" cy="250" rx="100" ry="75" fill="url(#fade-mask-grad)" />
          </mask>
          <mask id="mask-left-pink-dots">
            <ellipse cx="340" cy="670" rx="85" ry="65" fill="url(#fade-mask-grad)" />
          </mask>
          <mask id="mask-right-flank-dots">
            <ellipse cx="1210" cy="480" rx="90" ry="70" fill="url(#fade-mask-grad)" />
          </mask>
          <mask id="mask-bottom-dots">
            <ellipse cx="440" cy="880" rx="95" ry="70" fill="url(#fade-mask-grad)" />
          </mask>
        </defs>

        {/* 1. TOP-CENTER ELECTRIC LIME DRIP (flowing down left of hair, clear of face) */}
        <motion.g
          style={{ x: parallaxSlowX, y: parallaxSlowY }}
          initial={initialScale}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.05, ease: EASE_OUT }}
        >
          {/* Halftone cluster to the upper-left of hair */}
          <rect
            x="390"
            y="30"
            width="200"
            height="160"
            fill="url(#ht-lime)"
            mask="url(#mask-top-dots)"
            opacity="0.8"
          />
          {/* Liquid drip curving along top edge and behind top-left of hair */}
          <path
            className="blob-morph-slow"
            d="M480 -20H590C600 30 635 60 660 62C690 64 715 32 755 42C790 52 805 110 820 152C830 185 810 215 780 225C740 238 695 195 650 160C600 120 540 105 505 60C485 32 475 8 480 -20Z"
            fill="var(--hero-blob-lime, var(--hero-chartreuse))"
          />
        </motion.g>

        {/* 2. UPPER-RIGHT NEON PINK LIQUID CLOUD + ELECTRIC LIME LOBE (clear of face) */}
        <motion.g
          style={{ x: parallaxX, y: parallaxY }}
          initial={initialScale}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.12, ease: EASE_OUT }}
        >
          {/* Large Neon Pink liquid cloud in upper right */}
          <path
            className="blob-morph-med"
            d="M990 145C1045 95 1125 105 1195 112C1265 120 1335 75 1410 98C1478 120 1515 185 1485 245C1455 305 1370 310 1315 340C1260 370 1215 415 1150 405C1085 392 1035 330 1005 272C975 215 950 180 990 145Z"
            fill="var(--hero-blob-pink, var(--hero-pink))"
          />
          {/* Halftone dot texture on lower belly of pink cloud */}
          <rect
            x="1170"
            y="170"
            width="220"
            height="160"
            fill="url(#ht-dark)"
            mask="url(#mask-right-pink-dots)"
            opacity="0.55"
          />

          {/* Electric Lime lobe below pink cloud */}
          <path
            className="blob-morph-slow"
            d="M1120 310C1185 280 1275 300 1325 365C1375 430 1390 525 1338 575C1285 625 1185 610 1130 550C1075 490 1055 340 1120 310Z"
            fill="var(--hero-blob-lime, var(--hero-chartreuse))"
          />
          {/* Halftone texture on right flank lobe */}
          <rect
            x="1110"
            y="400"
            width="200"
            height="160"
            fill="url(#ht-lime)"
            mask="url(#mask-right-flank-dots)"
            opacity="0.75"
          />
        </motion.g>

        {/* 3. LEFT FLANK NEON PINK SPLASH & LIME TENDRIL (clear of face) */}
        <motion.g
          style={{ x: parallaxSlowX, y: parallaxY }}
          initial={initialScale}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.18, ease: EASE_OUT }}
        >
          {/* Left cheek lime curl outside facial contour */}
          <path
            className="blob-morph-slow"
            d="M320 330C350 315 375 350 405 375C435 400 480 395 495 430C510 465 475 515 435 520C395 525 365 475 340 435C315 395 290 345 320 330Z"
            fill="var(--hero-blob-lime, var(--hero-chartreuse))"
          />
          {/* Mid-left Neon Pink splash reaching toward left rail */}
          <path
            className="blob-morph-med"
            d="M160 560C155 515 210 495 260 515C310 535 355 570 410 565C465 558 530 588 540 650C550 710 495 790 430 788C365 785 350 700 298 660C245 618 165 605 160 560Z"
            fill="var(--hero-blob-pink, var(--hero-pink))"
          />
          {/* Pink halftone dots below left splash */}
          <rect
            x="250"
            y="600"
            width="180"
            height="140"
            fill="url(#ht-pink)"
            mask="url(#mask-left-pink-dots)"
            opacity="0.8"
          />
        </motion.g>

        {/* 4. BOTTOM BACKGROUND SWEEPING WAVES (safely behind BEHERA) */}
        <motion.g
          style={{ x: parallaxSlowX, y: parallaxSlowY }}
          initial={initialScale}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.95, delay: 0.22, ease: EASE_OUT }}
        >
          {/* Lower Electric Lime sweeping wave */}
          <path
            className="blob-morph-med"
            d="M240 1020C270 920 350 840 460 845C560 850 630 910 715 870C800 830 820 730 900 710C975 690 1030 745 1020 815C1000 885 905 910 845 960C810 990 790 1005 780 1020H240Z"
            fill="var(--hero-blob-lime, var(--hero-chartreuse))"
          />
          {/* Lower Neon Pink bottom wave */}
          <path
            className="blob-morph-slow"
            d="M740 1020C760 960 825 930 895 915C965 900 1020 855 1090 875C1150 895 1180 955 1195 1020H740Z"
            fill="var(--hero-blob-pink, var(--hero-pink))"
          />
          {/* Dark halftone texture on the lower-left wave */}
          <rect
            x="340"
            y="810"
            width="200"
            height="140"
            fill="url(#ht-dark)"
            mask="url(#mask-bottom-dots)"
            opacity="0.45"
          />
        </motion.g>
      </svg>
    </div>
  )
}
