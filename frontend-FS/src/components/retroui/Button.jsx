


import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Button as BaseButton } from "@base-ui/react/button";

const buttonVariants = cva(

  "font-head transition-all rounded cursor-pointer duration-200 font-medium flex justify-center items-center disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
  {
    variants: {
      variant: {
        default:
          "shadow-[4px_4px_0_0_black] enabled:hover:shadow-[2px_2px_0_0_black] enabled:active:shadow-none bg-[#FDE047] text-black border-2 border-black transition enabled:hover:translate-x-[2px] enabled:hover:translate-y-[2px] enabled:active:translate-x-[4px] enabled:active:translate-y-[4px] enabled:hover:bg-[#FACC15]",
        secondary:
          "shadow-[4px_4px_0_0_black] enabled:hover:shadow-[2px_2px_0_0_black] enabled:active:shadow-none bg-white text-black border-2 border-black transition enabled:hover:translate-x-[2px] enabled:hover:translate-y-[2px] enabled:active:translate-x-[4px] enabled:active:translate-y-[4px] enabled:hover:bg-gray-100",
        outline:
          "shadow-[4px_4px_0_0_black] enabled:hover:shadow-[2px_2px_0_0_black] enabled:active:shadow-none bg-transparent border-2 border-black transition enabled:hover:translate-x-[2px] enabled:hover:translate-y-[2px] enabled:active:translate-x-[4px] enabled:active:translate-y-[4px]",
        link: "bg-transparent hover:underline text-black font-semibold",
        ghost: "bg-transparent hover:bg-black/10 text-black"
      },
      size: {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-1.5 text-base",
        lg: "px-6 lg:px-8 py-2 lg:py-3 text-md lg:text-lg",
        icon: "p-2",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

export const Button = ({
  children,
  size = "md",
  className = "",
  variant = "default",
  render,
  ref,
  ...props
}) => {
  return (
    <BaseButton
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      render={render}
      {...props}>
      {children}
    </BaseButton>
  );
};
