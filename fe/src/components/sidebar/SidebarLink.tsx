/* eslint-disable */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { RoleRoutes } from "../../routes/routes";
import Cookies from "universal-cookie";

export interface RoutesType {
  name: string;
  role?: string;
  component?: JSX.Element;
  path: string;
  secondary?: boolean;
}

export const SidebarLinks = (props: { routes: RoutesType[] }): JSX.Element => {
  const cookies = new Cookies();
  let location = useLocation();
  const { routes } = props;

  const activeRoute = (routeName: string) => {
    return location.pathname.includes(routeName);
  };

  const createLinks = (routes: RoutesType[]) => {
    return routes.map((route, index) => {
      //! TODO: Check role
      if (route.role === cookies.get("role")) {
        return (
          <Link key={index} to={route.path}>
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li className="my-[3px] flex cursor-pointer items-center px-4" key={index}>
                <p
                  className={`leading-1 ml-4 flex ${
                    activeRoute(route.path) === true
                      ? "font-bold text-navy-700 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.name}
                </p>
              </li>
              {activeRoute(route.path) ? (
                <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
              ) : null}
            </div>
          </Link>
        );
      }
    });
  };
  return <>{createLinks(routes)}</>;
};

export default SidebarLinks;
