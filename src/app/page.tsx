'use client';

import styles from './page.module.css';

import { Page, Document, pdfjs } from 'react-pdf';
import { useState, useEffect, useMemo } from 'react';

import { LinkedInLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons';

import Particles, { initParticlesEngine } from '@tsparticles/react';
import type { Container, ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

import { particlesData } from '../data/particles';
import aboutData from '../data/about.json';
import publicationsData from '../data/publications.json';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function Home() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [init, setInit] = useState(false);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const aboutText = aboutData.data.about.map((item, i) => {
    return (
      <p
        key={i}
        className='leading-7 [&:not(:first-child)]:mt-4 text-slate-200'
      >
        {item}
      </p>
    );
  });

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  // @ts-ignore
  const options: ISourceOptions = useMemo(() => particlesData, []);

  return (
    <main className={styles.main}>
      {init && (
        <Particles
          id='tsparticles'
          options={options}
          particlesLoaded={particlesLoaded}
        />
      )}
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 text-slate-200'>
        Jesper Falkenby
      </h1>
      <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-16 text-slate-200'>
        Full-Stack Developer
      </h2>
      <div className='flex justify-center mb-48'>
        <Avatar className='w-64 h-64'>
          <AvatarImage alt='Jesper Falkenby' src='/profile.jpg' />
          <AvatarFallback>JF</AvatarFallback>
        </Avatar>
      </div>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 text-slate-200'>
        Résumé
      </h1>
      <div className='flex justify-center mb-48'>
        <Document file='/resume.pdf' onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} scale={1.25} />
        </Document>
      </div>
      <div className='max-w-4xl mb-48'>
        <div className='flex justify-center'>
          <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 text-slate-200'>
            About me
          </h1>
        </div>
        {aboutText}
      </div>
      <div className='max-w-4xl mb-48'>
        <div className='flex justify-center'>
          <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 text-slate-200'>
            Publications
          </h1>
        </div>
        <Carousel>
          <CarouselContent>
            {publicationsData.data.publications.map((pub, i) => (
              <CarouselItem key={i}>
                <div className='text-center'>
                  <h4 className='scroll-m-20 text-xl font-semibold tracking-tight text-slate-200'>
                    {pub.title}
                  </h4>
                  <div style={{ textAlign: 'center' }}>
                    <small className='text-sm font-medium leading-none text-slate-200'>
                      {pub.date}
                    </small>
                  </div>
                  <div className='text-lg font-semibold text-slate-200'>
                    {pub.publisher}
                  </div>
                  <div className='text-lg font-semibold text-slate-200'>
                    {pub.type}
                  </div>
                </div>
                {pub.desc.map((desc) => (
                  <p
                    key={desc}
                    className='leading-7 [&:not(:first-child)]:mt-4 text-slate-200'
                  >
                    {desc}
                  </p>
                ))}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className='flex justify-center'>
        <a
          href='https://www.linkedin.com/in/jesperfalkenby/'
          target='_blank'
          className='mr-2'
        >
          <Button variant='default' size='icon'>
            <LinkedInLogoIcon className='h-6 w-6' />
          </Button>
        </a>
        <a href='https://github.com/hyzor' target='_blank'>
          <Button variant='default' size='icon'>
            <GitHubLogoIcon className='h-6 w-6' />
          </Button>
        </a>
      </div>
    </main>
  );
}
