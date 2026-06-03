import { Avatar as BaseAvatar } from "@base-ui/react/avatar";

import { cn } from "@/lib/utils";

const Avatar = ({
  className,
  ref,
  ...props
}) => (
  <BaseAvatar.Root
    ref={ref}
    className={cn("relative flex h-14 w-14 border-2 rounded-full overflow-hidden", className)}
    {...props} />
);

const AvatarImage = ({
  className,
  ref,
  ...props
}) => (
  <BaseAvatar.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props} />
);

const AvatarFallback = ({
  className,
  ref,
  ...props
}) => (
  <BaseAvatar.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground",
      className
    )}
    {...props} />
);

const AvatarComponent = Object.assign(Avatar, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
});

export { AvatarComponent as Avatar };
