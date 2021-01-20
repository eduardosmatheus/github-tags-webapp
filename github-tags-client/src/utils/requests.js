export function toQueryParams(params) {
  return Object.keys(params).reduce((queryString, param) => {
    const value = params[param];
    if (!queryString.includes('?')) {
      return `?${param}=${value}`;
    }
    return `${queryString}&${param}=${value}`;
  }, '');
}