import { Slider as BaseSlider } from "@base-ui/react/slider";

import { cn } from "@/lib/utils";

const Slider = ({
  className,
  indicatorClassName,
  ref,
  ...props
}) => (
  <BaseSlider.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}>
    <BaseSlider.Control className="relative flex w-full items-center">
      <BaseSlider.Track
        className="relative h-3 w-full grow overflow-hidden bg-white border-2 border-black">
        <BaseSlider.Indicator className={cn("absolute h-full transition-all duration-150 ease-out", indicatorClassName || "bg-primary")} />
      </BaseSlider.Track>
      <BaseSlider.Thumb
        className="block h-5 w-5 border-2 bg-background shadow-[2px_2px_0_0_black] border-black transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    </BaseSlider.Control>
  </BaseSlider.Root>
);

export { Slider };
