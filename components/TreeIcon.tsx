import React from 'react';

export function TreeIcon({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            {...props}
        >
            {/* 
        M12 0: Start at the top tip (center)
        L6 17: Draw left side of the canopy (narrower)
        H11: Draw horizontal line to the left edge of the trunk
        V24: Draw down to the bottom of the trunk
        H13: Draw across the bottom of the trunk (thinner trunk)
        V17: Draw up the right edge of the trunk
        H18: Draw horizontal line to the right edge of the canopy
        Z: Close the path back to the top tip
      */}
            <path d="M12 0 L5 18 H10 V23 H14 V18 H19 Z" />
        </svg>
    );
}