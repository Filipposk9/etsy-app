import cx from "classnames";
import { NavLink } from "react-router-dom";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLAnchorElement> & {
  route: string;
  text: string;
};

const NavBarLink = ({ route, text }: Props) => {
  return (
    <NavLink
      to={route}
      className={({ isActive }) =>
        cx("text-white block rounded-md px-3 py-2 text-base font-medium", {
          "bg-gray-900": isActive,
        })
      }
      aria-current="page"
    >
      {text}
    </NavLink>
  );
};

export default NavBarLink;
