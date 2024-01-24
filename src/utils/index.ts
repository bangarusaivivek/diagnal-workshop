export function debounce(fn: Function, delay: number) {
  let timer: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
}
