interface GlassTipProps {
  tip: string;
}

export function GlassTip({ tip }: GlassTipProps) {
  return (
    <div className="glass-gradient glass-hover rounded-2xl p-6 shadow-2xl">
      <h3 className="font-semibold text-foreground mb-3">Quick Tip</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {tip}
      </p>
    </div>
  );
}
