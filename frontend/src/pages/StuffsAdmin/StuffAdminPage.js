import { useCallback, useEffect, useState } from 'react';
import classes from './stuffsAdminPage.module.css';
import { Link, useParams } from 'react-router-dom';
import { deleteById, getAll, search } from '../../services/stuffService';
import NotFound from '../../Component/NotFound/NotFound';
import Title from '../../Component/Title/Title';
import Search from '../../Component/Search/Search';
import Price from '../../Component/Price/Price';
import { toast } from 'react-toastify';
 
export default function StuffsAdminPage() {
  const [stuffs, setStuffs] = useState();
  const { searchTerm } = useParams();

  const loadStuffs = useCallback(async () => {
   const stuffs = searchTerm ? await search(searchTerm) : await getAll();
   setStuffs(stuffs);
  }, [searchTerm]);

  useEffect(() => {
    loadStuffs();
  }, [loadStuffs]);
 
  const StuffsNotFound = () => {
    if (stuffs && stuffs.length > 0) return;

    return searchTerm ? (
      <NotFound linkRoute="/admin/stuffs" linkText="Show All" />
    ) : (
      <NotFound linkRoute="/dashboard" linkText="Back to dashboard!" />
    );
  };

  const deleteStuff = async stuff => {
    const confirmed = window.confirm(`Delete stuff ${stuff.name}?`);
    if (!confirmed) return;

    await deleteById(stuff.id);
    toast.success(`"${stuff.name}" Has Been Removed!`);
    setStuffs(stuffs.filter(f => f.id !== stuff.id));
  };

  return (
    <div className={classes.container}>
      <div className={classes.list}>
        <Title title="Manage stuffs" margin="1rem auto" />
        <Search
          searchRoute="/admin/stuffs/"
          defaultRoute="/admin/stuffs"
          margin="1rem 0"
          placeholder="Search for stuff..."
        />
        <Link to="/admin/addStuff" className={classes.add_stuff}>
          Add Stuff +
        </Link>
        <StuffsNotFound />
        {stuffs &&
          stuffs.map(stuff => (
            <div key={stuff.id} className={classes.list_item}>
              <img src={stuff.imageUrl} alt={stuff.name} />
              <Link to={'/stuff/' + stuff.id}>{stuff.name}</Link>
              <Price price={stuff.price} />
              <div className={classes.actions}>
                <Link to={'/admin/editStuff/' + stuff.id}>Edit</Link>
                <Link onClick={() => deleteStuff(stuff)}>Delete</Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
