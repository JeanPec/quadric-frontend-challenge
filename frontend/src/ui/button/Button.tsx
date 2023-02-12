import React, { HTMLAttributes } from "react";
import cn from "classnames";

import "./Button.css";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  seeMore?: boolean;
  close?: boolean;
  iconAfter?: JSX.Element;
}

/*
    Button:
        - close state to manage when used in the Modal
 */

export const Button = React.forwardRef(
  (
    { seeMore, close, iconAfter, children, ...props }: ButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => (
    <button
      type="button"
      className={cn("button", { close: close })}
      ref={ref}
      {...props}
    >
      {children}
      {!!iconAfter && iconAfter}
    </button>
  )
);
