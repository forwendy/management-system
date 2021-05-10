export const reset = (state) => {
  let data = JSON.parse(localStorage.getItem(state.localKey + 'StateInit'))
  return JSON.parse(JSON.stringify(data))
}
