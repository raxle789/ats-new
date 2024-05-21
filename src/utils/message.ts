export function success(api, message) {
  api.open({
    type: 'success',
    content: `${message}`,
  });
}

export function error(api, message) {
  api.open({
    type: 'error',
    content: `${message}`,
  });
}

export function warning(api, message) {
  api.open({
    type: 'warning',
    content: `${message}`,
  });
}

export function loading(api, message) {
  api.open({
    type: 'loading',
    content: `${message}`,
    duration: 0,
  });
}
