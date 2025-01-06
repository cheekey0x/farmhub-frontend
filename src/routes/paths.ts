// ----------------------------------------------------------------------
const ROOTS = {
  DASHBOARD: "/app",
  PLATFORM: "/platform",
  PROJECTS: "/project",
  ACCOUNT: "/account"
};

export const paths = {
  login: "/login",
  register: "/register",
  dashboard: {
    root: ROOTS.DASHBOARD
  },
  platform: {
    root: ROOTS.PLATFORM,
    admin: `${ROOTS.PLATFORM}/admin-manage`,
    login: `${ROOTS.PLATFORM}/login`,
    register: `${ROOTS.PLATFORM}/register`,
  },
};
