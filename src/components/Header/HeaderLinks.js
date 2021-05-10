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
import { Apps, Lock, LockOpen, AttachMoney, Person, ExitToApp } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";
import Button from "../CustomButtons/Button.js";

import styles from "../../../assets/jss/nextjs-material-kit/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const [session] = useSession();

  const router = useRouter();

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          buttonText="Clubs"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link href="/components">
              <a className={classes.dropdownLink}>All clubs</a>
            </Link>,
            <a
              href="https://creativetimofficial.github.io/nextjs-material-kit/#/documentation?ref=njsmk-navbar"
              target="_blank"
              className={classes.dropdownLink}
            >
              Get onboard
            </a>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          target="_blank"
          onClick={()=>router.push('/login')}
          className={classes.navLink}
        >
          <AttachMoney className={classes.icons} /> PRICING
        </Button>
      </ListItem>
      {!session && <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          target="_blank"
          onClick={()=>router.push('/signup')}
          className={classes.navLink}
        >
          <Lock className={classes.icons}/> SIGN UP
        </Button>
      </ListItem>}
      {!session && <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          target="_blank"
          onClick={()=>router.push('/login')}
          className={classes.navLink}
        >
          <LockOpen className={classes.icons} /> LOG IN
        </Button>
      </ListItem>}
      {session && <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          target="_blank"
          onClick={()=>signOut({callbackUrl: "/"})}
          className={classes.navLink}
        >
          <ExitToApp className={classes.icons} /> LOG OUT
        </Button>
      </ListItem>}
      {session && <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <Person className={classes.icons} /> {session.user.name}
        </Button>
      </ListItem>}

    </List>
  );
}
