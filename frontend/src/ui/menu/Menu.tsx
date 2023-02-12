import React, { HTMLProps } from "react";

import "./Menu.css";

export const Menu = ({ className, ...props }: HTMLProps<HTMLUListElement>) => (
  <ul role="menu" className={"menu"} {...props} />
);
