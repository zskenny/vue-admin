export const session = function (key, value = undefined) {
  if (key === null) {
    return window.sessionStorage.clear()
  } else if (value === undefined) {
    return window.sessionStorage.getItem(key)
  } else if (value === null) {
    return window.sessionStorage.removeItem(key)
  } else {
    return window.sessionStorage.setItem(key, value)
  }
}
