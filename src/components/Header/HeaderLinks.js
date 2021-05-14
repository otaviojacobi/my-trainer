/*eslint-disable*/
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/client";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import {
  Apps,
  Lock,
  LockOpen,
  AttachMoney,
  Person,
  ExitToApp,
  Language,
  Dashboard
} from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

import { useTranslation } from "next-i18next";

// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";
import Button from "../CustomButtons/Button.js";

import styles from "../../../assets/jss/nextjs-material-kit/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

function HeaderLinks(props) {
  const classes = useStyles();
  const [session] = useSession();

  const { t } = useTranslation("common");

  const router = useRouter();

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          buttonText={t("LANGUAGE")}
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={Language}
          dropdownList={[
            <a
              className={classes.dropdownLink}
              onClick={() => {
                router
                  .push(router.pathname, router.pathname, { locale: "en" })
                  .then(() => router.reload());
              }}
            >
              {" "}
              English{" "}
            </a>,
            <a
              className={classes.dropdownLink}
              onClick={() => {
                router
                  .push(router.pathname, router.pathname, {
                    locale: "pt-BR",
                  })
                  .then(() => router.reload());
              }}
            >
              {" "}
              Português{" "}
            </a>,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          buttonText={t("CLUBS")}
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link href="/clubs">
              <a className={classes.dropdownLink}>{t("ALL_CLUBS")}</a>
            </Link>,
            <a
              href="/onboard"
              target="_blank"
              className={classes.dropdownLink}
            >
              {t("GET_ONBOARD")}
            </a>,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          target="_blank"
          onClick={() => router.push("/login")}
          className={classes.navLink}
        >
          <AttachMoney className={classes.icons} /> {t("PRICING")}
        </Button>
      </ListItem>
      {!session && (
        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            target="_blank"
            onClick={() => router.push("/signup")}
            className={classes.navLink}
          >
            <Lock className={classes.icons} /> {t("SIGN_UP")}
          </Button>
        </ListItem>
      )}
      {!session && (
        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            target="_blank"
            onClick={() => router.push("/login")}
            className={classes.navLink}
          >
            <LockOpen className={classes.icons} /> {t("LOG_IN")}
          </Button>
        </ListItem>
      )}
      {session && (
        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            target="_blank"
            onClick={() => signOut({ callbackUrl: "/" })}
            className={classes.navLink}
          >
            <ExitToApp className={classes.icons} /> {t("LOG_OUT")}
          </Button>
        </ListItem>
      )}
      {session && (
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            navDropdown
            buttonText={session.user.name}
            buttonProps={{
              className: classes.navLink,
              color: "transparent",
            }}
            buttonIcon={Person}
            dropdownList={[
              <Button
                color="transparent"
                target="_blank"
                onClick={() => router.push("/profile")}
                className={classes.navLink}
              >
                <Person className={classes.icons} /> {t("PROFILE")}
              </Button>,
              <Button
                color="transparent"
                target="_blank"
                onClick={() => router.push("/dashboard")}
                className={classes.navLink}
              >
                <Dashboard className={classes.icons} /> {t("DASHBOARD")}
              </Button>,
            ]}
          />
        </ListItem>
      )}
    </List>
  );
}

export default HeaderLinks;
