import { Building2, Heart, Landmark, GraduationCap, Radio, Building } from "lucide-react";

const ICONS = {
  BANK: Building2,
  HOSPITAL: Heart,
  GOVERNMENT: Landmark,
  UNIVERSITY: GraduationCap,
  TELECOM: Radio,
  OTHER: Building,
};

export function InstitutionIcon({ type, className }: { type: string; className?: string }) {
  const Icon = ICONS[type as keyof typeof ICONS] || ICONS.OTHER;
  return <Icon className={className || "w-5 h-5"} />;
}
