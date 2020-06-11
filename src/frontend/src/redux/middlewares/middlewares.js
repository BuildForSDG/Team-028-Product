export const adminMiddleware = (store) => (next) => (action) => {};

export const smeMiddleware = (store) => (next) => (action) => {
  if (!action.meta && action.meta !== "sme") {
    return next(action);
  }
  // do something with sme
  
};

export const investorMiddleware = (store) => (next) => (action) => {};

export const regulatorMiddleware = (store) => (next) => (action) => {};

export const projectMiddleware = (store) => (next) => (action) => {
  if (!action.meta && action.meta !== "project") {
    return next(action);
  }
  // do something with sme
};
