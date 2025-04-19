import { useParams } from 'react-router-dom';
import classes from './stuffEdit.module.css';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { add, getById, update } from '../../services/stuffService';
import Title from '../../Component/Title/Title';
import InputContainer from '../../Component/InputContainer/InputContainer';
import Input from '../../Component/Input/Input';
import Button from '../../Component/Button/Button';
import { uploadImage } from '../../services/uploadService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
 
export default function StuffEditPage() {
  const { stuffId } = useParams();
  const [imageUrl, setImageUrl] = useState();
  const isEditMode = !!stuffId;
 
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
 
  useEffect(() => {
    if (!isEditMode) return;

    getById(stuffId).then(stuff => {
      if (!stuff) return;
      reset(stuff);
      setImageUrl(stuff.imageUrl);
    });
  }, [stuffId]);
 
  const submit = async stuffData => {
    const stuff = { ...stuffData, imageUrl };

    if (isEditMode) {
      await update(stuff);
      toast.success(`stuff "${stuff.name}" updated successfully!`);
      return;
    }

    const newStuff = await add(stuff);
    toast.success(`stuff "${stuff.name}" added successfully!`);
    navigate('/admin/editStuff/' + newStuff.id, { replace: true });
  };

  const upload = async event => {
    setImageUrl(null);
    const imageUrl = await uploadImage(event);
    setImageUrl(imageUrl);
  };
 
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Title title={isEditMode ? 'Edit Stuff' : 'Add Stuff'} />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <InputContainer label="Select Image">
            <input type="file" onChange={upload} accept="image/jpeg" />
          </InputContainer>
 
          {imageUrl && (
            <a href={imageUrl} className={classes.image_link} target="blank">
              <img src={imageUrl} alt="Uploaded" />
            </a>
          )}
 
          <Input
            type="text"
            label="Name"
            {...register('name', { required: true, minLength: 5 })}
            error={errors.name}
          />
 
          <Input
            type="number"
            label="Price"
            {...register('price', { required: true })}
            error={errors.price}
          />
 
          <Input
            type="text"
            label="Tags"
            {...register('tags')}
            error={errors.tags}
          />
 
          <Input
            type="text"
            label="Origins"
            {...register('origins', { required: true })}
            error={errors.origins}
          />
 
          <Input
            type="text"
            label="Cook Time"
            {...register('cookTime', { required: true })}
            error={errors.cookTime}
          />
 
          <Button type="submit" text={isEditMode ? 'Update' : 'Create'} />
        </form>
      </div>
    </div>
  );
}