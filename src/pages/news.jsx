import React from "react";
import "../styles/news.css";
import ImpactStats from "../components/impactstats";

const newsEntries = [
  {
    title: "Local Startup Revolutionizes Civic Engagement",
    description:
      "NeighbourGov, a civic tech initiative, is transforming how communities report and resolve civic issues across the nation.",
    image: "/id1.jpg",
    media: { name: "The Indian Express", url: "https://indianexpress.com" },
    link: "#",
  },
  {
    title: "NeighbourGov App Solves Pothole Complaints in Record Time",
    description:
      "The app helps solve local road issues within 24 hours. Citizens are applauding its efficiency and transparency.",
    image: "/id2.jpg",
    media: { name: "Hindustan Times", url: "https://hindustantimes.com" },
    link: "#",
  },
  {
    title: "Youth Participation Surges Through Digital Platforms",
    description:
      "A spike in youth-led reports is observed through NeighbourGov’s easy mobile interface and gamified experience.",
    image: "/id3.jpg",
    media: { name: "YourStory", url: "https://yourstory.com" },
    link: "#",
  },
  {
    title: "NeighbourGov Hosts Successful Community Hackathon",
    description:
      "The recent hackathon saw hundreds of civic-minded techies build tools to help local bodies and the public.",
    image: "/id4.jpg",
    media: { name: "TechCrunch India", url: "https://techcrunch.com" },
    link: "#",
  },
  {
    title: "PM Mentions NeighbourGov in ‘Digital India’ Address",
    description:
      "The Prime Minister lauded citizen-led digital innovations, including NeighbourGov, in a national broadcast.",
    image: "/gpt/Gemini_Generated_Image_g34vhbg34vhbg34v.jpg",
    media: { name: "DD News", url: "https://ddnews.gov.in" },
    link: "#",
  },
  {
    title: "NeighbourGov Awarded National Innovation Prize",
    description:
      "Recognized for civic impact, the platform was awarded for boosting e-governance in tier-2 cities.",
    image: "/Gemini_Generated_Image_3v6bsc3v6bsc3v6b.jpg",
    media: {
      name: "Startup India Journal",
      url: "https://startupindia.gov.in",
    },
    link: "#",
  },
  {
    title: "NeighbourGov Featured in The Times Tech Edition",
    description:
      "Tech giants and urban planners both praised the startup’s scalable, user-first design for civic reporting.",
    image: "/gpt/Gemini_Generated_Image_ktcp3pktcp3pktcp.jpg",
    media: {
      name: "The Times of India",
      url: "https://timesofindia.indiatimes.com",
    },
    link: "#",
  },
  {
    title: "NGOs Collaborate with NeighbourGov for Water Crisis Reporting",
    description:
      "Top NGOs have begun using NeighbourGov to report and act on drinking water issues in underserved regions.",
    image: "/Gemini_Generated_Image_1s7stc1s7stc1s7s.jpg",
    media: { name: "India Water Portal", url: "https://indiawaterportal.org" },
    link: "#",
  },
  {
    title: "NeighbourGov Makes It to Forbes 30 under 30 List",
    description:
      "Founders of the platform are featured for their innovation in bridging civic issues with technology.",
    image: "/gpt/Gemini_Generated_Image_wlxezswlxezswlxe.jpg",
    media: { name: "Forbes India", url: "https://forbesindia.com" },
    link: "#",
  },
  {
    title: "Civic Tech Conference Applauds NeighbourGov’s Impact",
    description:
      "NeighbourGov received national recognition at the CivicTech Conference 2025 for its growing public trust.",
    image: "/gpt/Gemini_Generated_Image_37ud9v37ud9v37ud.jpg",
    media: { name: "Civic Tech India", url: "https://civictech.in" },
    link: "#",
  },
  {
    title: "NeighbourGov Introduces AI-Powered Reporting Tools",
    description:
      "Latest feature uses AI to classify issues instantly, helping municipal teams respond faster.",
    image: "/aip.png",
    media: {
      name: "Analytics India Magazine",
      url: "https://analyticsindiamag.com",
    },
    link: "#",
  },
];

const News = () => {
  return (
    <section className="news-page">
      <h2 className="news-heading">
        <span style={{ color: "white", backgroundColor: "blue" }}> In</span> the
        News
      </h2>
      <p className="news-subheading">
        Discover how NeighbourGov is reshaping civic engagement across India.
      </p>
      <div className="news-grid">
        {newsEntries.map((item, index) => (
          <div className="news-card" key={index}>
            <img src={item.image} alt={item.title} className="news-img" />
            <div className="news-info">
              <h3>{item.title}</h3>
              <p className="news-media">
                📰{" "}
                <a
                  href={item.media.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.media.name}
                </a>
              </p>
              <p>{item.description}</p>
              <a href={item.link} className="read-more-btn">
                Read Full Article →
              </a>
            </div>
          </div>
        ))}
      </div>
      \
      <ImpactStats />
    </section>
  );
};

export default News;
