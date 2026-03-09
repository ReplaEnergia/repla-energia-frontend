/**
 * SectionDivider – geometric/electric-themed section separators.
 *
 * Variants:
 *  "diagonal" – sharp angled cut with notch (primary style)
 *  "chevron"  – V-shaped angular cut
 */

interface Props {
  fromColor: string;
  toColor: string;
  flip?: boolean;
  variant?: "diagonal" | "chevron";
  className?: string;
}

// ViewBox 1200x80. Fill = fromColor (section above) painted over toColor background.
const PATHS: Record<string, string> = {
  // Sharp diagonal with left notch
  diagonal:
    "M0,0 L1200,0 L1200,20 L300,20 L180,80 L0,80 Z",
  // Chevron V-cut
  chevron:
    "M0,0 L600,70 L1200,0 L1200,0 L0,0 Z",
};

const SectionDivider = ({
  fromColor,
  toColor,
  flip = false,
  variant = "diagonal",
  className = "",
}: Props) => {
  const d = PATHS[variant];

  return (
    <div
      className={`relative w-full overflow-hidden leading-none ${className}`}
      style={{ background: toColor }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="block w-full"
        style={{
          height: "70px",
          transform: flip ? "scaleX(-1)" : undefined,
          display: "block",
        }}
      >
        <path d={d} fill={fromColor} />
      </svg>
    </div>
  );
};

export default SectionDivider;
