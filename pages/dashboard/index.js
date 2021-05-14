import { useSession } from "next-auth/client";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Skeleton from "@material-ui/lab/Skeleton";

import Header from "../../src/components/Header/Header";
import HeaderLinks from "../../src/components/Header/HeaderLinks";

function Dashboard(props) {
  const [session, loading] = useSession();

  const { t } = useTranslation();

  const { ...rest } = props;

  if (loading) {
    return <Skeleton variant="rect" height="100vh"/>;
  }

  if (!session) {
    return <div>Forbidden</div>;
  }

  return (
    <div>
      <Header
        color="white"
        brand="My Trainer"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
    </div>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Dashboard;
