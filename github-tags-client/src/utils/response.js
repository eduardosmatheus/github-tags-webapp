export function getMessageFromRequest(err) {
  const { response } = err;
  const { message } = response ? response.data : err;
  return message;
}