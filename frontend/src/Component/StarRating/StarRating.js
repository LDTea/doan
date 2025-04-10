import React from 'react'
import classes from './starRating.module.css'

export default function StarRating({ stars, size = 18 }) {
  const styles = {
    width: size +'px',
    height: size +'px',
    margin: size/6 +'px',
  };

  function Star({number}){
    const halfNumber = number - 0.5;

    return stars >= number ? (
      <img src="/star-full.svg" alt="star" style={styles} />
    ) : stars >= halfNumber ? (
      <img src="/star-half.svg" alt="star" style={styles} />
    ) : (
      <img src="/star-empty.svg" alt="star" style={styles} />
    );
  };

  return (
  <div className={classes.rating}>
    {[1, 2, 3, 4, 5].map(number => (
      <Star key={number} number={number}/>
    ))}
    </div>
  )
}

