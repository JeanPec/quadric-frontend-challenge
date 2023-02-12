import React, { HTMLProps } from "react";

import "./Menu.css";

export const MenuItem = ({ className, ...props }: HTMLProps<HTMLLIElement>) => (
  <li role="menu" className={"menu-item"} {...props} />
);
