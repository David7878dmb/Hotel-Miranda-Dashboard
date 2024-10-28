import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUserThunk, deleteUserThunk, getAllUsersThunk, updateUserThunk } from '../../features/users/usersThunk';
//@ts-ignore
import { promiseStatus } from '../../utils/promises';
//@ts-ignore
import Container from "../container/container";
//@ts-ignore
import LateralMenu from "../lateralMenu/lateralMenu";
//@ts-ignore
import styled from 'styled-components';
//@ts-ignore
import NavBar from "../navBar/navBar";
//@ts-ignore
import Table from "../tables/table";
import { AppDispatch, RootState } from '../../app/store';
//@ts-ignore
import { Link } from 'react-router-dom';

interface Users {
    _id: string; 
    id: number;
    username: string;
    picture: string;
    joined: string; 
    "job-desk": string;
    schedule: string[] | string;
    contact: string;
    status: string;
}

interface UsersState {
    users: Users[];
    status: string;
    error: string | null;
}

const Title = styled.h1``;
const P = styled.p``;
const SPAN = styled.span``;
const SECTION = styled.section``;
const INPUT = styled.input``;
const DIV = styled.div``;
const SELECT = styled.select``;
const OPTIONS = styled.option``;
const Button = styled.button`
  margin: 5px;
  padding: 8px 12px;
  font-size: 1rem;
  cursor: pointer;
`;

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
const FormContainer = styled.div`
  margin-top: 10px;
  display: ${(props: { visible: boolean }) => (props.visible ? 'block' : 'none')};
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const Users = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, status, error } = useSelector((state: RootState) => state.users);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<Users[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newUserData, setNewUserData] = useState({
    username: '',
    password: '',
    picture: '',
    position: '',
    email: '',
    joined: new Date().toISOString(),
    jobDesk: '',
    schedule: '',
    contact: '',
    status: 'ACTIVE',
  });

  useEffect(() => {
    if (status === promiseStatus.IDLE) {
      dispatch(getAllUsersThunk());
    }
  }, [dispatch, status]);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user: any) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, users]);

  const handleDeleteUser = (id: string) => {
    dispatch(deleteUserThunk(id));
  };

  const handleUpdateUser = (id: string) => {
    const updatedUser = {
      username: 'Updated Username',
      contact: 'New Contact',
    };
    dispatch(updateUserThunk({ id, updates: updatedUser }));
  };

  const handleCreateUser = () => {
    dispatch(createUserThunk(newUserData));
    setShowForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUserData({ ...newUserData, [name]: value });
  };

  if (status === promiseStatus.PENDING) {
    return <P>Loading...</P>;
  }

  if (status === promiseStatus.REJECTED) {
    return <P>Error: {error}</P>;
  }

  const columns = [
    { header: 'Name', accessor: 'nameDetails' },
    { header: 'Job Desk', accessor: 'jobDesk' },
    { header: 'Schedule', accessor: 'schedule' },
    { header: 'Contact', accessor: 'contact' },
    { header: 'Status', accessor: 'status' },
    { header: 'Actions', accessor: 'actions' },
  ];

  const tableData = filteredUsers.map((user) => ({
    nameDetails: (
      <UserCard>
        <UserPhoto src={user.picture || 'default-avatar.png'} alt={user.username} />
        <UserInfo>
          <Link to={`/users/${user._id}`}>
            <UserName>{user.username}</UserName>
          </Link>
          <UserID>ID: {user._id}</UserID>
          <UserDate>{new Date(user.joined).toLocaleDateString()}</UserDate>
        </UserInfo>
      </UserCard>
    ),
    jobDesk: user['job-desk'],
    schedule: Array.isArray(user.schedule) ? user.schedule.join(', ') : 'No Schedule',
    contact: user.contact,
    status: (
      <SPAN style={{ color: user.status === 'Active' ? 'green' : 'red' }}>
        {user.status}
      </SPAN>
    ),
    actions: (
      <DIV>
        <Button onClick={() => handleUpdateUser(user._id)}>Update</Button>
        <Button onClick={() => handleDeleteUser(user._id)}>Delete</Button>
      </DIV>
    ),
  }));

  return (
    <Container>
      <LateralMenu />
      <DIV>
        <NavBar />
        <SECTION>
          <Title>Employees</Title>
          <Button onClick={() => setShowForm(!showForm)}>Create New User</Button>
          <FormContainer visible={showForm}>
            <INPUT
              type="text"
              name="username"
              placeholder="Username"
              value={newUserData.username}
              onChange={handleInputChange}
            />
            <INPUT
              type="password"
              name="password"
              placeholder="Password"
              value={newUserData.password}
              onChange={handleInputChange}
            />
            <INPUT
              type="email"
              name="email"
              placeholder="Email"
              value={newUserData.email}
              onChange={handleInputChange}
            />
            <INPUT
              type="text"
              name="picture"
              placeholder="Picture URL"
              value={newUserData.picture}
              onChange={handleInputChange}
            />
            <INPUT
              type="text"
              name="position"
              placeholder="Position"
              value={newUserData.position}
              onChange={handleInputChange}
            />
            <INPUT
              type="text"
              name="jobDesk"
              placeholder="Job Desk"
              value={newUserData.jobDesk}
              onChange={handleInputChange}
            />
            <INPUT
              type="text"
              name="schedule"
              placeholder="Schedule (comma-separated)"
              value={newUserData.schedule}
              onChange={handleInputChange}
            />
            <INPUT
              type="text"
              name="contact"
              placeholder="Contact"
              value={newUserData.contact}
              onChange={handleInputChange}
            />
            <SELECT
              name="status"
              value={newUserData.status}
              onChange={(e:any) =>
                setNewUserData({ ...newUserData, status: e.target.value })
              }
            >
              <OPTIONS value="ACTIVE">ACTIVE</OPTIONS>
              <OPTIONS value="INACTIVE">INACTIVE</OPTIONS>
            </SELECT>
            <Button onClick={handleCreateUser}>Save</Button>
          </FormContainer>
          <INPUT
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
          />
          <Table cols={columns} data={tableData} />
        </SECTION>
      </DIV>
    </Container>
  );
};

export default Users;
