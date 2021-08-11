// import { useEffect, useState } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://d3dqioy2sca31t.cloudfront.net/Projects/cms/production/000/003/213/slideshow/abf4ce118cdd30f9655a12588f25ffa9/ireland-country-dunluce-castle-sunrise.jpg",
//     address: "Some Address 5, 12342 sadads, etc",
//     description: "First Meetup",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://d3dqioy2sca31t.cloudfront.net/Projects/cms/production/000/003/213/slideshow/abf4ce118cdd30f9655a12588f25ffa9/ireland-country-dunluce-castle-sunrise.jpg",
//     address: "Some Address 123, asd 123123, etc",
//     description: "Second Meetup",
//   },
// ];

function HomePage(props) {
  // NO NEED ANYMORE CAUSE OF GETSTATICPROPS
  //   const [loadedMeetup, setLoadedMeetup] = useState([]);

  //   useEffect(() => {
  //     //send http request + fetch data
  //     setLoadedMeetup(DUMMY_MEETUPS);
  //   }, []);
  return (
    <Fragment>
      <Head>
        <title>React NextJs Meetups</title>
        <meta
          name="description"
          content="Browse a list of cool react meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

//SSG - Static Site Generation
export async function getStaticProps() {
  //fetch data from an API

  const client = await MongoClient.connect(
    "mongodb+srv://alex:kranker12@cluster0.bazsr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.data.title,
        address: meetup.data.address,
        image: meetup.data.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10, //10 sec - regenerate the page
  };
}

//SSR - server side rendering. Good if data change very often every second
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = content.res;
//   //fetch data from API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
