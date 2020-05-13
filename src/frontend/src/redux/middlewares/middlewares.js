export const adminMiddleware = (store) => (next) => (action) => {
  if (!action.meta && action.meta !== "admin") {
    return next(action);
  }
  // do something with admin
  const data = {};
  if (typeof action.payload === "string") {
    const value = action.payload;
    data.name = value;
  }
  if (typeof action.payload === "boolean") {
    const value = action.payload;
    data.login = value;
  }
};

export const smeMiddleware = (store) => (next) => (action) => {
  if (!action.meta && action.meta !== "sme") {
    return next(action);
  }
  // do something with sme
};

export const investorMiddleware = (store) => (next) => (action) => {
  if (!action.meta && action.meta !== "investor") {
    return next(action);
  }
  // do something with sme
};

export const regulatorMiddleware = (store) => (next) => (action) => {
  if (!action.meta && action.meta !== "regulator") {
    return next(action);
  }
  // do something with sme
};

export const projectMiddleware = (store) => (next) => (action) => {
  if (!action.meta && action.meta !== "project") {
    return next(action);
  }
  // do something with sme
};
