import { useState } from "react";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Skeleton from "@material-ui/lab/Skeleton";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Header from "../src/components/Header/Header";
import HeaderLinks from "../src/components/Header/HeaderLinks";
import Footer from "../src/components/Footer/Footer";
import SearchBar from "../src/components/SearchBar";

import GridContainer from "../src/components/Grid/GridContainer";
import GridItem from "../src/components/Grid/GridItem";

import noLogoImage from "../assets/img/ppl-cycling.jpeg";

const QUERY = gql`
  {
    clubs {
      id
      name
      description
      logo {
        url
      }
    }
  }
`;

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: 20,
  },
  paper: {
    marginTop: 30,
    width: "80%",
    marginLeft: "10%",
    marginRight: "10%",
  },
});

function Clubs(props) {
  const { loading, error, data } = useQuery(QUERY);
  const classes = useStyles();

  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  const { ...rest } = props;

  if (error) {
    return <div>Error</div>;
  }
  return (
    <div>
      <Header
        color="white"
        brand="My Trainer"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <br />
      <br />
      <br />
      <br />
      <Paper className={classes.paper}>
        <SearchBar onChange={setSearch} />
        <GridContainer>
          {(loading
            ? Array.from(new Array(4))
            : data.clubs.filter(club => club.name.toLowerCase().includes(search.toLowerCase()))
          ).map((club, index) => (
            <GridItem xs={12} sm={12} md={4} key={index}>
              <Card className={classes.root}>
                <CardActionArea>
                  {club ? (
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="280"
                      image={`${
                        club.logo
                          ? process.env.MY_TRAINER_BACKEND + club.logo.url
                          : noLogoImage
                      }`}
                      title="Contemplative Reptile"
                    />
                  ) : (
                    <Skeleton
                      animation="wave"
                      variant="rect"
                      width={345}
                      height={280}
                    />
                  )}
                </CardActionArea>
                <CardContent>
                  {club ? (
                    <div>
                      <Typography gutterBottom variant="h5" component="h2">
                        {club.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {club.description}
                      </Typography>
                    </div>
                  ) : (
                    <div>
                      <Skeleton animation="wave" variant="text" height={24} />
                      <Skeleton animation="wave" variant="text" height={18} />
                      <Skeleton animation="wave" variant="text" height={18} />
                      <Skeleton animation="wave" variant="text" height={18} />
                    </div>
                  )}
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </GridItem>
          ))}
        </GridContainer>
      </Paper>
      <Footer />
    </div>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Clubs;
