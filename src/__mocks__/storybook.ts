export const mockRouter = {
  pathname: "/",
  route: "/",
  query: {},
  asPath: "/",
  basePath: "",
  push: () => Promise.resolve(true),
  replace: () => Promise.resolve(true),
  reload: () => {},
  back: () => {},
  prefetch: () => Promise.resolve(),
  beforePopState: () => {},
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  isPreview: false,
  forward: () => {},
  events: {
    on: () => {},
    off: () => {},
    emit: () => {},
  },
};

export const mockSession = {
  user: {
    isAdmin: true,
    email: "admin@gmail.com",
    id: "3733403",
    name: "admin",
    image: "https://i.ibb.co/RHMqQGr/man-1.png",
  },
  expires: "2024-12-31T23:59:59.999Z",
};
