import React from 'react';
import GreenBug from '../Images/green_bug.svg';

export default function NotFoundPage() {
  return (
    <section className="section-page">
      <h2 className="notFound-page">
        <img src={GreenBug} alt='Green Open Bug' className='bug__icons' />
        {'  '}Page Not Found{'  '}
        <img src={GreenBug} alt='Green Open Bug' className='bug__icons' />
      </h2>
      <p>Oh no, the bugs must have eaten this page, try going back or using the navigation menu</p>
    </section>
  )
}