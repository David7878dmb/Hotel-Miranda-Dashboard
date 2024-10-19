import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//@ts-ignore
import { useParams } from 'react-router-dom';
//@ts-ignore
import styled from 'styled-components';
import { AppDispatch, RootState } from '../../app/store';
import { getUserByIdThunk } from '../../features/users/usersThunk';

// Estilos con styled-components (sin cambios)
const UserCard = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const UserPhoto = styled.img`
  width: 80px;
  height: 80px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const UserName = styled.h2`
  margin: 0;
`;

const P = styled.p``;

// Componente UserDetails
export const UserDetails = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch: AppDispatch = useDispatch();
    const { currentUser, status, error } = useSelector((state: RootState) => state.users);
  
    useEffect(() => {
      if (id) {
        dispatch(getUserByIdThunk(id));
      }
    }, [dispatch, id]);
  
    console.log('ID:', id);
    console.log('Current User:', currentUser);
  
    if (status === 'loading') {
      return <P>Loading...</P>;
    }
  
    if (status === 'failed') {
      return <P>Error: {error}</P>;
    }
  
    if (!currentUser) {
      return <P>User not found</P>;
    }
  
    return (
      <UserCard>
        <UserPhoto src={currentUser.picture || 'default-avatar.png'} alt={currentUser.name} />
        <UserInfo>
          <UserName>{currentUser.name}</UserName>
          <P>Job Desk: {currentUser['job-desk']}</P>
          <P>Contact: {currentUser.contact}</P>
          <P>Joined: {new Date(currentUser.joined).toLocaleDateString()}</P>
          <P>Status: {currentUser.status}</P>
        </UserInfo>
      </UserCard>
    );
  };
  