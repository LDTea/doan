import React, { useEffect, useState } from 'react'
import classes from './StuffPage.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { getById } from '../../services/stuffService';
import StarRating from '../../Component/StarRating/StarRating';
import Tags from '../../Component/Tags/Tags';
import Price from '../../Component/Price/Price';
import { useCart } from '../../hooks/useCart';
import NotFound from '../../Component/NotFound/NotFound';
export default function StuffPage() {
    const [stuff, setStuff] = useState({});
    const {id} = useParams();
    const {addToCart} = useCart();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        addToCart(stuff);
        navigate('/cart');
    };

    useEffect(() => {
        getById(id).then(setStuff);
    }, [id]);
    return (
        <>
          {!stuff ? (
            <NotFound message="Stuff Not Found!" linkText="Back to Homepage" />
          ):(
            <div className={classes.container}>
              <img
                className={classes.image}
                src={`${stuff.imageUrl}`}
                alt={stuff.name}
              />
    
              <div className={classes.details}>
                <div className={classes.header}>
                  <span className={classes.name}>{stuff.name}</span>
                  <span
                    className={`${classes.favorite} ${
                      stuff.favorite ? '' : classes.not
                    }`}
                  >
                    ❤
                  </span>
                </div>
                <div className={classes.rating}>
                  <StarRating stars={stuff.stars} size={25} />
                </div>
    
                <div className={classes.origins}>
                  {stuff.origins?.map(origin => (
                    <span key={origin}>{origin}</span>
                  ))}
                </div>
    
                <div className={classes.tags}>
                  {stuff.tags && (
                    <Tags
                      tags={stuff.tags.map(tag => ({ name: tag }))}
                      forstuffPage={true}
                    />
                  )}
                </div>
    
                <div className={classes.cook_time}>
                  <span>
                    Time to cook about <strong>{stuff.cookTime}</strong> minutes
                  </span>
                </div>
    
                <div className={classes.price}>
                  <Price price={stuff.price} />
                </div>
                  
                <button onClick={handleAddToCart}>Add To Cart</button>
              </div>
            </div>
          )}
        </>
      );
    }
