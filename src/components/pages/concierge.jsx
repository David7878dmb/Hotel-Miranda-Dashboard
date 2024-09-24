import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersThunk } from '../../features/users/usersThunk';
import { promiseStatus } from '../../utils/promises';
import Container from "../container/container";
import LateralMenu from "../lateralMenu/lateralMenu";
import styled from 'styled-components';
import NavBar from "../navBar/navBar";
import Table from "../tables/table";

const Title = styled.h1``;

const UserCard = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;

`;

const UserPhoto = styled.img`
  width: 40px;
  height: 40px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const UserID = styled.p`
  margin: 5px 0;
  font-size: 0.9rem;
  color: #555;
`;

const UserDate = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: #888;
`;

const Users = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector(state => state.users);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (status === promiseStatus.IDLE) {
      dispatch(getAllUsersThunk());
    }
  }, [dispatch, status]);

  useEffect(() => {
    // Filtro por nombre de usuario
    setFilteredUsers(
      users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, users]);

  if (status === promiseStatus.PENDING) {
    return <p>Loading...</p>;
  }

  if (status === promiseStatus.REJECTED) {
    return <p>Error: {error}</p>;
  }

  // Columnas de la tabla
  const columns = [
    { header: 'Name', accessor: 'nameDetails' },
    { header: 'Job Desk', accessor: 'jobDesk' },
    { header: 'Schedule', accessor: 'schedule' },
    { header: 'Contact', accessor: 'contact' },
    { header: 'Status', accessor: 'status' },
  ];

  // Datos de la tabla
  const tableData = filteredUsers.map(user => ({
    nameDetails: (
      <div>
        <UserCard>
          <UserPhoto src={user.picture} alt={user.name} style={{ width: '50px', borderRadius: '50%', marginRight: '10px' }} />
          <UserInfo>
            <UserName>{user.name} </UserName> 
            <UserID>ID: {user.id} </UserID>
            <UserDate>{new Date(user.joined).toLocaleDateString()}</UserDate>
          </UserInfo>
        </UserCard>
      </div>
    ),
    jobDesk: user['job-desk'],
    schedule: user.schedule.join(', '),
    contact: user.contact,
    status: (
      <span style={{ color: user.status === 'Active' ? 'green' : 'red' }}>
        {user.status}
      </span>
    ),
  }));

  return (
    <Container>
      <LateralMenu />
      <div>
        <NavBar />
        <section>
          <Title>Employees</Title>
          <input 
            type="text" 
            placeholder="Search by name" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
          <Table cols={columns} data={tableData} />
        </section>
      </div>
    </Container>
  );
};

export default Users;
