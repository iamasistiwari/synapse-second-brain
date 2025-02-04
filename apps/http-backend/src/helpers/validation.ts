import CryptoJS from "crypto-js";

function hashStringWithSecret(input: string): string {
  const secretKey = process.env.SECRET_KEY!;
  return CryptoJS.HmacSHA256(input, secretKey).toString(CryptoJS.enc.Hex);
}
const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Kolkata",
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});
export function GetHash(): string {
  const time = formatter.format(new Date());
  const hashedString = hashStringWithSecret(time);
  return hashedString;
}

export function ValidateUser(token: string) {
  const time = formatter.format(new Date());
  const hashedString = hashStringWithSecret(time);
  if (hashedString === token) {
    return true;
  }
  return false;
}
ValidateUser("asdasd");
