"use client";

/**
 * TechnicalTable Component
 * 
 * A simple table that displays technical specifications (like dimensions, grade, or treatment).
 * 
 * Beginner Note:
 * It takes an array of strings formatted like "Label: Value" (e.g., "Moisture: 12%").
 * It uses javascript `.split(":")` to separate the bold label from the value before rendering.
 */
export default function TechnicalTable({ specs }: { specs: string[] }) {
  return (
    <div className="w-full border border-muted-oak/20 bg-white/50 backdrop-blur-sm overflow-hidden">
      <div className="grid grid-cols-2 bg-charcoal text-sand p-4 text-xs uppercase tracking-widest font-sans font-semibold">
        <div>Specification</div>
        <div>Detail</div>
      </div>
      <div className="divide-y divide-muted-oak/10">
        {specs && specs.map((spec, index) => {
          const [label, ...valueParts] = spec.split(":");
          const value = valueParts.join(":").trim();
          
          return (
            <div key={index} className="grid grid-cols-2 p-4 items-center group hover:bg-muted-oak/5 transition-colors duration-300">
              <div className="text-muted-oak text-xs uppercase tracking-widest font-sans font-semibold">
                {value ? label : "Spec " + (index + 1)}
              </div>
              <div className="text-charcoal text-sm font-sans font-medium">
                {value || label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
