import * as React from "react";

type ButtonVariant = "default" | "outline";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({
  className = "",
  variant = "default",
  type = "button",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:opacity-50 disabled:pointer-events-none";

  const styles =
    variant === "outline"
      ? "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
      : "bg-slate-900 text-white hover:bg-slate-800";

  return <button type={type} className={`${base} ${styles} ${className}`} {...props} />;
}
