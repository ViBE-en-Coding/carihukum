import React, { ElementType } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

// d=display, h=heading, p=paragraph
type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p1'
  | 'p2'
  | 'p3'
  | 'p4'
  | 'p5'
  | 'small';

const typographyVariants = cva('text-ellipsis', {
  variants: {
    variant: {
      h1: 'xxl:text-[2.5] xxl:leading-[calc(2.5rem*1.2)] xl:text-[2.2rem] xl:leading-[calc(2.2rem*1.2)] md:text-[2rem] md:leading-[calc(2rem*1.2)] text-[1.75rem] leading-[calc(1.75rem*1.2)] font-semibold',
      h2: 'xxl:text-[2rem] xxl:leading-[calc(2rem*1.2)] xl:text-[1.85rem] xl:leading-[calc(1.85rem*1.2)] md:text-[1.5rem] md:leading-[calc(1.5rem*1.2)] text-[1.25rem] leading-[calc(1.25rem*1.2)] font-semibold',
      h3: 'xxl:text-[1.75rem] xxl:leading-[calc(1.75rem*1.2)] xl:text-[1.6rem] xl:leading-[calc(1.6rem*1.2)] md:text-[1.4rem] md:leading-[calc(1.4rem*1.2)] text-[1.2rem] leading-[calc(1.2rem*1.2)] font-semibold',
      h4: 'xxl:text-[1.5rem] xxl:leading-[calc(1.5rem*1.2)] xl:text-[1.4rem] xl:leading-[calc(1.4rem*1.2)] md:text-[1.3rem] md:leading-[calc(1.3rem*1.2)] text-[1.15rem] leading-[calc(1.15rem*1.2)] font-semibold',
      h5: 'xxl:text-[1.25rem] xxl:leading-[calc(1.25rem*1.2)] xl:text-[1.2rem] xl:leading-[calc(1.2rem*1.2)] md:text-[1.1rem] md:leading-[calc(1.1rem*1.2)] text-[1rem] leading-[calc(1rem*1.2)] font-semibold',
      h6: 'xxl:text-[1.125rem] xxl:leading-[calc(1.125rem*1.2)] xl:text-[1.1rem] xl:leading-[calc(1.1rem*1.2)] md:text-[1rem] md:leading-[calc(1rem*1.2)] text-[0.9rem] leading-[calc(0.9rem*1.2)] font-semibold',

      p1: 'xxl:text-[1.5rem] xxl:leading-[calc(1.5rem*1.5)] xl:text-[1.4rem] xl:leading-[calc(1.4rem*1.5)] md:text-[1.3rem] md:leading-[calc(1.3rem*1.5)] text-[1.1rem] leading-[calc(1.1rem*1.5)]',
      p2: 'xxl:text-[1.125rem] xxl:leading-[calc(1.125rem*1.5)] xl:text-[1.1rem] xl:leading-[calc(1.1rem*1.5)] md:text-[1rem] md:leading-[calc(1rem*1.5)] text-[0.9rem] leading-[calc(0.9rem*1.5)]',
      p3: 'xxl:text-[1rem] xxl:leading-[calc(1rem*1.5)] xl:text-[0.95rem] xl:leading-[calc(0.95rem*1.5)] md:text-[0.9rem] md:leading-[calc(0.9rem*1.5)] text-[0.85rem] leading-[calc(0.85rem*1.5)]',
      p4: 'xxl:text-[0.875rem] xxl:leading-[calc(0.875rem*1.5)] xl:text-[0.85rem] xl:leading-[calc(0.85rem*1.5)] md:text-[0.8rem] md:leading-[calc(0.8rem*1.5)] text-[0.75rem] leading-[calc(0.75rem*1.5)]',
      p5: 'xxl:text-[0.8125rem] xxl:leading-[calc(0.8125rem*1.5)] xl:text-[0.8rem] xl:leading-[calc(0.8rem*1.5)] md:text-[0.75rem] md:leading-[calc(0.75rem*1.5)] text-[0.7rem] leading-[calc(0.7rem*1.5)]',
      small:
        'xxl:text-[0.7rem] xxl:leading-[calc(0.7rem*1.5)] xl:text-[0.65rem] xl:leading-[calc(0.65rem*1.5)] md:text-[0.6rem] md:leading-[calc(0.6rem*1.5)] text-[0.55rem] leading-[calc(0.55rem*1.5)]',
    },
  },
  defaultVariants: { variant: 'p3' },
});

const tags: Record<Variant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p1: 'p',
  p2: 'p',
  p3: 'p',
  p4: 'p',
  p5: 'p',
  small: 'span',
};

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant: Variant;
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ variant, children, className, asChild = false }, ref) => {
    const Comp = asChild ? Slot : tags[variant];
    return (
      <Comp
        className={cn(typographyVariants({ variant, className }))}
        ref={ref}
      >
        {children}
      </Comp>
    );
  }
);

Typography.displayName = 'Typography';
