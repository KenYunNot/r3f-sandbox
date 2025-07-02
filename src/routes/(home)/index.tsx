import React from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Home = () => {
  const container = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.timeline().from('#header', { opacity: 0, y: '25%', delay: 0.6, ease: 'power1.out' }).from('.grid-item', {
        opacity: 0,
        y: '25%',
        delay: 0.3,
        stagger: 0.3,
        ease: 'elastic.out',
      });
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className='pt-16 p-8 md:p-16 flex flex-col justify-center items-center'
    >
      <div
        id='header'
        className='mb-16 text-center'
      >
        <h1 className='text-5xl mb-4'>R3F and GSAP Sandbox</h1>
        <p className='text-xl'>Check out what I learned so far!</p>
      </div>
      <div className='max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        <GridItem
          href='developedbyed-followalong'
          title='Three.js Crash Course for Beginners'
        >
          I did a follow-along with this{' '}
          <a
            href='https://www.youtube.com/watch?v=_OwJV2xL8M8&list=PLVOXfoQ_x6wcFJ8b122nEVC0jnDjoqKlk&index=22'
            target='_blank'
            className='text-sky-500 hover:underline'
          >
            video
          </a>{' '}
          by{' '}
          <a
            href='https://www.youtube.com/@developedbyed'
            target='_blank'
            className='text-sky-500 hover:underline'
          >
            developedbyed
          </a>{' '}
          but I implemented it in React Three Fiber. The tutorial is originally done in vanilla Three.js.
        </GridItem>

        <GridItem
          href='mouse-follow'
          title='Mouse Follow'
        >
          I saw this cool effect on a R3F example and I wanted to try and replicate it. I also experimented with
          Three.js environment and texture maps.
        </GridItem>
      </div>
    </div>
  );
};

const GridItem = ({ href, title, children }: { href: string; title: string; children?: React.ReactNode }) => {
  const gridItemRef = React.useRef<HTMLDivElement>(null!);

  useGSAP(() => {
    const hoverAnimation = gsap
      .timeline({ paused: true, defaults: { duration: 0.5, ease: 'power1.out' } })
      .fromTo(gridItemRef.current.querySelector('#hover-banner'), { opacity: 0 }, { opacity: 1 });

    gridItemRef.current.addEventListener('mouseenter', () => hoverAnimation.play());
    gridItemRef.current.addEventListener('mousemove', (event) => {
      const bounds = gridItemRef.current.getBoundingClientRect();
      const offsetX = event.clientX - bounds.left;
      const offsetY = event.clientY - bounds.top;
      gsap.to(gridItemRef.current.querySelector('#hover-banner'), {
        background: `radial-gradient(circle at ${offsetX}px ${offsetY}px, green, blue)`,
        duration: 1,
        ease: 'power1.out',
      });
    });
    gridItemRef.current.addEventListener('mouseleave', () => hoverAnimation.reverse());
  });

  return (
    <div
      ref={gridItemRef}
      className='grid-item relative p-8 border-2 border-white rounded-md overflow-hidden'
    >
      <div
        id='hover-banner'
        className='absolute w-full h-full top-0 left-0 -z-[1]'
      />
      <h2 className='mb-2 text-2xl font-bold text-white'>
        <a
          href={href}
          className='no-underline hover:underline'
        >
          {title}
        </a>
      </h2>
      <p className='italic select-none'>{children}</p>
    </div>
  );
};

export default Home;
