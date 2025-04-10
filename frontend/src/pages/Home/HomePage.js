import React, { useEffect } from 'react'
import { getAll, getAllByTag, getAllTags, search } from '../../services/stuffService';
import Thumbnails from '../../Component/Thumbnails/Thumbnails';
import { useParams } from 'react-router-dom';
import Search from '../../Component/Search/Search';
import Tags from '../../Component/Tags/Tags';
import NotFound from '../../Component/NotFound/NotFound';

const initialState = { stuffs: [], tags: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'STUFFS_LOADED':
      return { ...state, stuffs: action.payload };
    case 'TAGS_LOADED':
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { stuffs, tags } = state;
  const{ searchTerm, tag } = useParams();

  useEffect(() => {
    getAllTags().then(tags => dispatch({ type: 'TAGS_LOADED', payload: tags }));

    const loadStuffs =tag
    ? getAllByTag(tag) 
    :searchTerm
    ? search(searchTerm)
    :getAll();
    searchTerm ? search(searchTerm) : getAll();

    loadStuffs.then(stuffs => dispatch({ type: 'STUFFS_LOADED', payload: stuffs }));
  }, [searchTerm, tag]);

  return (
    <>
      <Search />
      <Tags tags={tags} />
      {stuffs.length === 0 && <NotFound linkText="Reset Search" />}
      <Thumbnails stuffs={stuffs} />
    </>
  )
}
