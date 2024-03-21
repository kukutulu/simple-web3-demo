export type TruncateStringOptions = {
  first?: number;
  last?: number;
};

export function formatBalance(value: string) {
  return value.slice(0, 6);
}

export function truncateString(
  s: string,
  options: TruncateStringOptions = {}
): string {
  if (options.first === undefined && options.last === undefined) return s;
  if (
    (options.first && options.first < 0) ||
    (options.last && options.last < 0)
  ) {
    throw new Error("Invalid parameter(s)");
  }
  let _s = "";
  if (options.first) {
    _s = s.slice(0, options.first);
  }
  _s += "...";
  if (options.last) {
    _s += s.slice(-options.last);
  }
  return _s;
}

export function formatAddress(address: string, first = 6, last = 4): string {
  if (!address) {
    return "";
  }
  return truncateString(address, { first, last });
}

export function debounce(callback: any, delay: any) {
  let timeout: any;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };
}
