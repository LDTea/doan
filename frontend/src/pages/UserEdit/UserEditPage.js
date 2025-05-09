import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getById, updateUser } from '../../services/userService';
import { useParams } from 'react-router-dom';
import classes from './userEditPage.module.css';
import Title from '../../Component/Title/Title';
import Input from '../../Component/Input/Input';
import { EMAIL } from '../../constants/patterns';
import Button from '../../Component/Button/Button';
 
export default function UserEditPage() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
  const { userId } = useParams();
  const isEditMode = userId;
 
  useEffect(() => {
    if (isEditMode) loadUser();
  }, [isEditMode]);
 
  const loadUser = useCallback(async () => {
    const user = await getById(userId);
    reset(user);
  }, [userId, reset]);
  
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const submit = userData => {
    updateUser(userData);
  };
 
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Title title={isEditMode ? 'Edit User' : 'Add User'} />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            label="Name"
            {...register('name', { required: true, minLength: 3 })}
            error={errors.name}
          />
          <Input
            label="Email"
            {...register('email', { required: true, pattern: EMAIL })}
            error={errors.email}
          />
          <Input
            label="Address"
            {...register('address', { required: true, minLength: 5 })}
            error={errors.address}
          />

          <Input label="Is Admin" type="checkbox" {...register('isAdmin')} />
          <Button type="submit" />
        </form>
      </div>
    </div>
  );
}
