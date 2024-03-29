import Head from "next/head";
import { GetStaticProps } from "next";
import { Banner } from "../components/Banner/Banner";
import { FeaturedCourseCard } from "../components/FeaturedCourseCard/FeaturedCourseCard";
import { getAllPosts } from "../lib/api";

import {
  Container,
  Grid,
  createStyles,
  Text,
  Paper,
  Button,
} from "@mantine/core";

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllPosts();
  const courseList = allPosts.nodes;
  return {
    props: {
      courseList,
    },
  };
};

const styles = createStyles((theme) => ({
  content: {},

  highlight: {
    minWidth: "80px",
    display: "inline-block",
    fontWeight: 600,
  },
}));

type postData = {
  courseList: {
    databaseId: number;
    slug: string;
    title: string;
    uri: string;
    content: string | null;
    featuredImage?: {
      node?: {
        mediaItemUrl: string;
      };
    };
  }[];
};

export default ({ courseList }: postData) => {
  const { classes } = styles();
  const gridItems = courseList.map((item, index) => (
    <Grid.Col key={`FCC-${index}`} md={6} lg={4}>
      <FeaturedCourseCard
        title={item.title}
        link={item.uri}
        image={
          item.featuredImage &&
          item.featuredImage.node &&
          item.featuredImage.node.mediaItemUrl
        }
      />
    </Grid.Col>
  ));
  return (
    <>
      <Head>
        <title>About Us | EFG</title>
        <meta name="description" content="EFG Training Services" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner title="All Courses" />
      <Container size="lg" mt={40}>
        <Grid gutter={40}>{gridItems}</Grid>
      </Container>
    </>
  );
};
