import Button from "@material-ui/core/Button";
import { useSession, signOut } from "next-auth/client";

import { useRouter } from "next/router";

function Dashboard() {
  const router = useRouter();
  const [session, loading] = useSession();

  const logOut = async () => {
    await signOut({callbackUrl: '/login'});
  };

  if (!session) {
    return <div>Forbidden</div>;
  }

  return (
    <div>
      <h1>Hello {session.user.name}</h1>
      <Button onClick={logOut}>Sign out!</Button>
    </div>
  );
}

export default Dashboard;
