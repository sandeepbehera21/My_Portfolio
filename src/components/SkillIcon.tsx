import type { ReactElement } from 'react'
import {
  SiSpring, SiNodedotjs, SiExpress, SiMysql, SiMongodb, SiDocker,
  SiJsonwebtokens, SiGooglecloud, SiRedis, SiFastapi, SiGit, SiPostman,
  SiTailwindcss, SiAmazonwebservices,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import { TbShieldLock, TbApi, TbBrandReact, TbSparkles } from 'react-icons/tb'

/** Maps the `icon` string in data/portfolio.ts to a rendered icon. */
const icons: Record<string, ReactElement> = {
  java: <FaJava className="text-[#E76F00]" />,
  spring: <SiSpring className="text-[#6DB33F]" />,
  node: <SiNodedotjs className="text-[#3C873A]" />,
  express: <SiExpress />,
  api: <TbApi />,
  fastapi: <SiFastapi className="text-[#009688]" />,
  mysql: <SiMysql className="text-[#00618A]" />,
  mongodb: <SiMongodb className="text-[#4DB33D]" />,
  redis: <SiRedis className="text-[#DC382D]" />,
  shield: <TbShieldLock className="text-emerald-400" />,
  jwt: <SiJsonwebtokens className="text-pink" />,
  docker: <SiDocker className="text-[#2496ED]" />,
  gcloud: <SiGooglecloud className="text-[#4285F4]" />,
  aws: <SiAmazonwebservices className="text-[#FF9900]" />,
  git: <SiGit className="text-[#F05032]" />,
  react: <TbBrandReact className="text-sky-400" />,
  tailwind: <SiTailwindcss className="text-[#06B6D4]" />,
  web: <TbBrandReact className="text-orange-400" />,
  postman: <SiPostman className="text-[#FF6C37]" />,
  ai: <TbSparkles className="text-amber-400" />,
}

export default function SkillIcon({ name }: { name: string }) {
  return icons[name] ?? <TbApi />
}
