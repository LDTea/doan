import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Tags.module.css';

export default function Tags({ tags, forStuffPage }) {
  return (
    <div
      className={classes.container}
      style={{
        justifyContent: forStuffPage ? 'start' : 'center',
      }}
    >
      {tags.map(tag => (
        <Link key={tag.name} to={`/tag/${tag.name}`}>
          {tag.name}
          {!forStuffPage && `(${tag.count})`}
        </Link>
      ))}
    </div>
  );
}
