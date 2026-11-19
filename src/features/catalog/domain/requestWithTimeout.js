/** @typedef {Error & { code: 'REQUEST_TIMEOUT' }} RequestTimeoutError */

export class RequestTimeoutError extends Error {
  constructor(timeoutMs) {
    super(`Request exceeded ${timeoutMs} ms.`);
    this.name = 'RequestTimeoutError';
    this.code = 'REQUEST_TIMEOUT';
  }
}

/** @template T @param {() => Promise<T>} request @param {number} timeoutMs @returns {Promise<T>} */
export function requestWithTimeout(request, timeoutMs) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new RequestTimeoutError(timeoutMs)), timeoutMs);
    Promise.resolve()
      .then(request)
      .then(
        (value) => { clearTimeout(timer); resolve(value); },
        (error) => { clearTimeout(timer); reject(error); },
      );
  });
}
