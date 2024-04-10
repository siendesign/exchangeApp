export { default } from "next-auth/middleware";

export const config = { matcher: ["/exchange", '/dashboard','/exchange/orders'] };
