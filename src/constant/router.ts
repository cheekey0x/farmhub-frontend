export const ENDPOINTS = {
  protectedRoutes: {
    url: ["/app", "/platform"]
  },
  authRoutes: {
    url: ["/register", "/"]
  }
};

export const BACKEND_ENDPOINTS = {
  auth: {
    base: "/auth",
    login: "/auth/sign-in",
    signUp: "/auth/sign-up",
    adminLogin: "/auth/sign-in/admin",
    walletLogin: "/auth/wallet",
    updateToken: "/auth/update-token",
    logout: "/auth/logout"
  },
  project: {
    base: "/project",
    checkName: "/project/check-name",
    activeByMe: "/project/me",
    getById: "/project/id",
    getByIdWithPayment: "/project/id-with-payment",
    deploy: "/project/deploy"
  },
  projectUser: {
    base: "/project-user",
    me: "/project-user/me",
    getByUser: "/project-user/user",
    getByProject: "/project-user/project",
    inviteUser: "/project-user/invite"
  },
  media: {
    base: "/media",
    upload: "/media/upload"
  },
  user: {
    base: "/user",
    me: "/user/me"
  },
  support: {
    base: "/support",
    subscribe: "/support/subscribe"
  },
  payment: {
    base: "/payment",
    stripe: {
      createSubscribeByProject: "/payment/stripe/subscribe-project"
    }
  }
};
