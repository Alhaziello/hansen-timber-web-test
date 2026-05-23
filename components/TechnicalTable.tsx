/**
 * @file TechnicalTable.tsx
 * @description A straightforward, responsive data table component for displaying key-value technical specifications.
 * @dependencies react
 * @state Stateless functional component.
 */
"use client";

/**
 * Configuration properties for the TechnicalTable component.
 */
interface TechnicalTableProps {
  /** 
   * An array of unparsed strings from the CMS, expected in a "Label: Value" format.
   * e.g., ["Moisture: 12%", "Grade: Select"]
   */
  specs: string[];
}

/**
 * Renders a stylized HTML table mapping raw spec strings into semantic label/value columns.
 */
export default function TechnicalTable({ specs }: TechnicalTableProps) {
  return (
    <div className="w-full border border-muted-oak/20 bg-white/50 backdrop-blur-sm overflow-hidden">
      <div className="grid grid-cols-2 bg-charcoal text-sand p-4 text-xs uppercase tracking-widest font-sans font-semibold">
        <div>Specification</div>
        <div>Detail</div>
      </div>
      <div className="divide-y divide-muted-oak/10">
        {specs && specs.map((spec, index) => {
          // NOTE: We split only on the first colon to separate the label from the value.
          // EDGE CASE: If a value itself contains a colon (e.g., "Ratio: 1:4"), we must rejoin the remaining parts.
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
