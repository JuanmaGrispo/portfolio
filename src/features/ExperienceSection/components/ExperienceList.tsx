"use client";

import { useState } from "react";

import { EXPERIENCE_ITEMS } from "@/data/experience";

import ExperienceCard from "./ExperienceCard";

export default function ExperienceList() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <ul className="mt-14 list-none space-y-4 p-0 md:mt-16 md:space-y-5">
      {EXPERIENCE_ITEMS.map((item) => (
        <li key={item.id}>
          <ExperienceCard
            item={item}
            isExpanded={expandedId === item.id}
            onToggle={() =>
              setExpandedId((prev) => (prev === item.id ? null : item.id))
            }
          />
        </li>
      ))}
    </ul>
  );
}
