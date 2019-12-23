export function isEmpty(obj) {
  if (obj) {
    return obj && Object.keys(obj).length === 0;
  } else {
    return true;
  }
}