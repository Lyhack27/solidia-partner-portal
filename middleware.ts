export { auth as default } from "@/lib/auth";

export const config = {
  matcher: ["/((?!login|api/auth|_next|favicon.ico|public).*)"],
};
