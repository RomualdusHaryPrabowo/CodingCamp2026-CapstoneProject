import { Text } from "@/components/retroui/Text";
import { cn } from "@/lib/utils";
import { Ghost } from "lucide-react";

const Empty = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-4 md:p-8 border-2 border-black rounded shadow-[4px_4px_0px_1px_black] bg-white text-center text-black",
        className
      )}
      {...props} />
  );
};
Empty.displayName = "Empty";

const EmptyContent = ({
  className,
  ...props
}) => {
  return (<div className={cn("flex flex-col items-center gap-3", className)} {...props} />);
};
EmptyContent.displayName = "Empty.Content";

const EmptyIcon = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn(className)} {...props}>
      {children || <Ghost className="w-full h-full" />}
    </div>
  );
};
EmptyIcon.displayName = "Empty.Icon";

const EmptyTitle = ({
  className,
  ...props
}) => {
  return (
    <Text
      as="h3"
      className={cn("text-lg md:text-2xl font-bold", className)}
      {...props} />
  );
};
EmptyTitle.displayName = "Empty.Title";

const EmptySeparator = ({
  className,
  ...props
}) => {
  return (
    <div
      role="separator"
      className={cn("h-[2px] w-12 bg-black my-2", className)}
      {...props} />
  );
};
EmptySeparator.displayName = "Empty.Separator";

const EmptyDescription = ({
  className,
  ...props
}) => (
  <p
    className={cn("text-muted-foreground max-w-[320px]", className)}
    {...props} />
);
EmptyDescription.displayName = "Empty.Description";

const EmptyComponent = Object.assign(Empty, {
  Content: EmptyContent,
  Icon: EmptyIcon,
  Title: EmptyTitle,
  Separator: EmptySeparator,
  Description: EmptyDescription,
});

export { EmptyComponent as Empty };
