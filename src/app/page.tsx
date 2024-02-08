'use client';

import styles from "./page.module.css";

import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';

import { Page, Document, pdfjs } from 'react-pdf';
import { useState, useEffect } from "react";

import Slider from "react-slick";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

import particlesData from '../data/particles.json';
import aboutData from '../data/about.json';
import publicationsData from '../data/publications.json';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function Home() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [init, setInit] = useState(false);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  
  const aboutText = aboutData.data.about.map((item, i) => {
    return (
      <Typography key={i} style={{ marginTop: 10 }} variant="subtitle1">
        {item}
      </Typography>
    );
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container?: Container) => {
    console.log(container);
  };

  return (
    <main className={styles.main}>
      { init && <Particles
        id="tsparticles"
        options={particlesData}
        particlesLoaded={particlesLoaded}
      />}
        <Typography
          variant="h1"
        >
          Jesper Falkenby
        </Typography>
        <Typography
          variant="h4"
          gutterBottom
          marginBottom={6}
        >
          Full-Stack Developer
        </Typography>
      <Box display="flex" justifyContent="center" marginBottom={24}>
        <Avatar alt="Lion" src="/profile.jpg" sx={{ width: 200, height: 200 }} />
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography
          variant="h2"
          gutterBottom
        >
          Résumé
        </Typography>
        </Box>
        <Box display="flex" justifyContent="center" marginBottom={24}>
          <Document
            file="/resume.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} scale={1.22} />
          </Document>
      </Box>
      <Box maxWidth={1024} marginBottom={24}>
        <Box display="flex" justifyContent="center">
          <Typography
            variant="h2"
            gutterBottom
          >
            About me
          </Typography>
        </Box>
        {aboutText}
      </Box>
      <Box maxWidth={1024} marginBottom={16}>
      <Box display="flex" justifyContent="center">
          <Typography
            variant="h2"
            gutterBottom
          >
            Publications
          </Typography>
        </Box>
        <Slider {...settings}>
        {publicationsData.data.publications.map((pub, i) => (
          <div key={i}>
            <Typography variant="h6" align="center">
              {pub.title}
            </Typography>
            <div style={{ textAlign: 'center' }}>
              <Typography variant="caption" style={{ marginTop: 2 }}>
                {pub.date}
              </Typography>
            </div>
            <Typography variant="subtitle1" align="center" style={{ marginTop: 5 }}>
              {pub.publisher}
            </Typography>
            <Typography variant="subtitle1" align="center" style={{ marginTop: 2 }}>
              {pub.type}
            </Typography>
            {pub.desc.map((desc) => (
              <Typography key={desc} variant="body1" style={{ marginTop: 10 }}>
                {desc}
              </Typography>
            ))}
          </div>
            ))}
        </Slider>
        
        </Box>
      

    </main>
  );
}
