import Link from "next/link";
import { Button } from "../ui/button";

export default function AuthButton() {
  return (
    <Button nativeButton={false} render={<Link href={"/login"} />}>
      Login
    </Button>
  );
}
