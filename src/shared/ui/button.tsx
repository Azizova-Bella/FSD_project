import { cva } from "class-variance-authority"
import React from "react"

const button = cva(["flex", "justify-center", "items-center"], {
  variants: {
    color: {
      primary: "bg-blue-500 text-white",
      secondary: "bg-blue-400 text-white",
    },
    size: {
      small: "p-[5px]",
      medium: "p-[10px]",
      large: "p-[15px]",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "medium",
  },
})

interface IButton {
  color?: "primary" | "secondary"
  size?: "small" | "medium" | "large"
  children?: React.ReactNode
  sx?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
}

export default function Button({ color = "primary", size = "medium", children = "button", sx = "", onClick, type = "button" }: IButton) {
  return (
    <button type={type} onClick={onClick} className={`${button({ color, size })} ${sx}`}>
      {children}
    </button>
  )
}
