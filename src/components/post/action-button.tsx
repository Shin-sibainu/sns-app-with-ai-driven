"use client";

import { ActionButtonProps, ActionButtonColor } from "@/types/post";

const actionButtonStyles: Record<ActionButtonColor, string> = {
  blue: "hover:text-blue-500 group [&_div]:hover:bg-blue-500/10",
  green: "hover:text-green-500 group [&_div]:hover:bg-green-500/10",
  pink: "hover:text-pink-500 group [&_div]:hover:bg-pink-500/10",
};

export function ActionButton({
  icon,
  count,
  color,
  onClick,
}: ActionButtonProps) {
  return (
    <button
      className={`flex items-center gap-2 ${actionButtonStyles[color]}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      <div className="p-2 rounded-full transition-colors">{icon}</div>
      <span className="text-sm">{count}</span>
    </button>
  );
}
