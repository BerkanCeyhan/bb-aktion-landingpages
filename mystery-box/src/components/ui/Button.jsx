import React from 'react';
import { cn } from '../../utils';

const Button = React.forwardRef(({ className, variant = "primary", size = "default", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-drama uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none active:scale-95";

    const variants = {
        primary: "bg-brand-orange text-dark-bg hover:bg-brand-volt box-shadow-neon hover:box-shadow-volt cursor-pointer",
        outline: "border-2 border-brand-orange text-brand-orange hover:bg-brand-orange/10 cursor-pointer",
        ghost: "text-dark-text hover:text-brand-orange hover:bg-dark-surface cursor-pointer",
        accent: "bg-brand-volt text-dark-bg hover:bg-brand-orange box-shadow-volt hover:box-shadow-neon text-shadow-none cursor-pointer",
    };

    const sizes = {
        default: "h-14 px-8 text-lg",
        sm: "h-10 px-6 text-sm",
        lg: "h-16 px-10 text-xl md:text-2xl",
        icon: "h-14 w-14",
    };

    return (
        <button
            ref={ref}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
});

Button.displayName = "Button";
export { Button };
