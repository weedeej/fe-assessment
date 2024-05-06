import { cn } from "@/lib/utils"

// https://github.com/shadcn-ui/taxonomy/blob/651f984e52edd65d40ccd55e299c1baeea3ff017/components/user-auth-form.tsx#L111
export const Spinner = ({className}: {className?: string}) => (
  <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin", className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
)