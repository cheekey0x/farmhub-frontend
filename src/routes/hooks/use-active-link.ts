import { usePathname } from "next/navigation";

// ----------------------------------------------------------------------

type ReturnType = boolean;

export function useActiveLink(path: string, deep = true): ReturnType {
  const pathname = usePathname();

  const checkPath = path.startsWith("#");

  const currentPath = path === "/" ? "/" : `${path}`;

  const normalActive = !checkPath && pathname === currentPath;

  const deepActive = !checkPath && pathname?.includes(currentPath);

  const res = deep ? deepActive : normalActive;

  if (pathname) {
    if (path !== "/" && pathname.indexOf(path) > -1) return true;
  }
  return res;
}
