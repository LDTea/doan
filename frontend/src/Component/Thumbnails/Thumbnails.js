import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Thumbnails.module.css'
import StarRating from '../StarRating/StarRating';
import Price from '../Price/Price';
export default function Thumbnails({ stuffs }) {
    return (
      <ul className={classes.list}>
        {stuffs.map(stuff => (
          <li key={stuff.id}>
            <Link to={`/stuff/${stuff.id}`}>
              <img className={classes.image}
                src={`${stuff.imageUrl}`}
                alt={stuff.name}/>
                
              <div className={classes.content}>
                <div className={classes.name}>{stuff.name}</div>
                <span className={`${classes.favorite} ${
                    stuff.favorite ? '' : classes.not}`}>
                  ❤
                </span>

                <div className={classes.stars}>
                  <StarRating stars={stuff.stars} />
                </div>

                <div className={classes.product_item_footer}>
                  <div className={classes.origins}>
                    {stuff.origins.map(origin => (
                      <span key={origin}>{origin}</span>))}
                  </div>
                  <div className={classes.cook_time}>
                    <span>🕒</span>
                    {stuff.cookTime}
                  </div>
                </div>

                <div className={classes.price}>
                  <Price price={stuff.price} />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    );
}
