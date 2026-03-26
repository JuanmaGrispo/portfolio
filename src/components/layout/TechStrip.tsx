import type { IconType } from "react-icons";
import {
  SiAndroidstudio,
  SiApplepay,
  SiDocker,
  SiGooglepay,
  SiHubspot,
  SiIos,
  SiJavascript,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiSalesforce,
  SiSvelte,
} from "react-icons/si";

import { ReactNativeIcon } from "@/components/icons/ReactNativeIcon";

type TechItem =
  | { name: string; Icon: IconType }
  | { name: string; Icon: typeof ReactNativeIcon };

const TECH_ITEMS: TechItem[] = [
  { name: "Svelte", Icon: SiSvelte },
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "React Native", Icon: ReactNativeIcon },
  { name: "Android Studio", Icon: SiAndroidstudio },
  { name: "iOS", Icon: SiIos },
  /** Marca Google Wallet (ícono Google Pay en Simple Icons). */
  { name: "Google Wallet", Icon: SiGooglepay },
  /** Marca Apple Wallet (ícono Apple Pay en Simple Icons). */
  { name: "Apple Wallet", Icon: SiApplepay },
  { name: "NestJS", Icon: SiNestjs },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "MySQL", Icon: SiMysql },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Docker", Icon: SiDocker },
  { name: "HubSpot", Icon: SiHubspot },
  { name: "Salesforce", Icon: SiSalesforce },
];

const ARIA_TECH_NAMES = TECH_ITEMS.map((t) => t.name).join(", ");

/** Mismo gap y padding-right para que el loop -50% sea matemáticamente continuo. */
const ICON_ROW_GAP =
  "gap-7 pr-7 md:gap-10 md:pr-10 lg:gap-14 lg:pr-14";

function TechIconRow({ idSuffix }: { idSuffix: string }) {
  return (
    <div
      className={`flex shrink-0 items-center ${ICON_ROW_GAP} text-muted-foreground`}
    >
      {TECH_ITEMS.map(({ name, Icon }) => (
        <span
          key={`${idSuffix}-${name}`}
          className="shrink-0 transition-colors hover:text-primary"
          title={name}
        >
          <Icon
            className="size-8 md:size-14 lg:size-[4.25rem]"
            aria-hidden
          />
        </span>
      ))}
    </div>
  );
}

/**
 * Marquee infinito: dos segmentos idénticos; pr === gap para que no se note el corte.
 */
export default function TechStrip() {
  return (
    <div
      className="border-t border-border py-6 opacity-50 md:py-12 md:opacity-100"
      role="region"
      aria-label={`Tecnologías: ${ARIA_TECH_NAMES}`}
    >
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
        }}
      >
        <div className="tech-strip-marquee-track" aria-hidden>
          <TechIconRow idSuffix="a" />
          <TechIconRow idSuffix="b" />
        </div>
      </div>
    </div>
  );
}
