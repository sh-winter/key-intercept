import { FormatMessage, FORMAT_MESSAGE_ALLOCATE_BUFFER, GetLastError } from "../mod.ts";

const dwMessageId = GetLastError();
const lpMsgBuf = new Uint8Array(100);
FormatMessage(
  FORMAT_MESSAGE_ALLOCATE_BUFFER,
  null,
  dwMessageId,
  0,
  lpMsgBuf,
  0,
  null
)

console.log('message: ', new TextDecoder().decode(lpMsgBuf))