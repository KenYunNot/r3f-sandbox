import React from 'react';

import './styles.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Home = () => {
  const container = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const gridItems = gsap.utils.toArray('.grid-item') as HTMLElement[];
      gridItems.forEach((gridItem) => {
        const hoverAnimation = gsap
          .timeline({ paused: true, defaults: { duration: 0.5, ease: 'power1.out' } })
          .fromTo(gridItem.querySelector('.hover-banner'), { opacity: 0 }, { opacity: 1 });

        gridItem.addEventListener('mouseenter', () => hoverAnimation.play());
        gridItem.addEventListener('mousemove', (event) => {
          const bounds = gridItem.getBoundingClientRect();
          const offsetX = event.clientX - bounds.left;
          const offsetY = event.clientY - bounds.top;
          gsap.to(gridItem.querySelector('.hover-banner'), {
            background: `radial-gradient(circle at ${offsetX}px ${offsetY}px, green, blue)`,
            duration: 1,
            ease: 'power1.out',
          });
        });
        gridItem.addEventListener('mouseleave', () => hoverAnimation.reverse());
      });

      gsap
        .timeline()
        .from('.heading', { opacity: 0, y: '25%', delay: 0.6, ease: 'power1.out' })
        .from('.grid-item', { opacity: 0, y: '25%', delay: 0.3, stagger: 0.3, ease: 'elastic.out' });
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className='container'
    >
      <div className='heading'>
        <h1>R3F and GSAP Sandbox</h1>
        <p>Check out what I learned so far!</p>
      </div>
      <div className='grid-container'>
        <div className='grid-item'>
          <div className='hover-banner' />
          <h2>
            <a href='developedbyed-followalong'>Three.js Crash Course For Beginners</a>
          </h2>
          <p>
            I did a follow-along with this{' '}
            <a
              href='https://www.youtube.com/watch?v=_OwJV2xL8M8&list=PLVOXfoQ_x6wcFJ8b122nEVC0jnDjoqKlk&index=22'
              target='_blank'
            >
              video
            </a>{' '}
            by{' '}
            <a
              href='https://www.youtube.com/@developedbyed'
              target='_blank'
            >
              developedbyed
            </a>{' '}
            but I implemented it in React Three Fiber. The tutorial is originally done in vanilla Three.js.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
