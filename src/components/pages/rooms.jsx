import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoomsThunk } from '../../features/rooms/roomThunk.js';
import { promiseStatus } from '../../utils/promises';
import Container from "../container/container";
import LateralMenu from "../lateralMenu/lateralMenu";
import styled from 'styled-components';
import NavBar from "../navBar/navBar";
import Table from "../tables/table";

const Title = styled.h1``;

const RoomList = () => {
  const dispatch = useDispatch();
  const { rooms, status, error } = useSelector(state => state.room);

  useEffect(() => {
    if (status === promiseStatus.IDLE) {
      dispatch(getAllRoomsThunk());
    }
  }, [dispatch, status]);

  if (status === promiseStatus.PENDING) {
    return <p>Loading...</p>;
  }

  if (status === promiseStatus.REJECTED) {
    return <p>Error: {error}</p>;
  }

  const columns = [
    { header: 'Picture', accessor: 'picture' },
    { header: 'Room Number', accessor: 'number' },
    { header: 'Room ID', accessor: 'id' },
    { header: 'Bed Type', accessor: 'bed-type' },
    { header: 'Facilities', accessor: 'facilities' },
    { header: 'Rate', accessor: 'rate' },
    { header: 'Offer Price', accessor: 'offerPrice' },
    { header: 'Status', accessor: 'status' },
  ];

  const tableData = rooms.map(room => ({
    ...room,
    picture: <img src={room.picture} alt="Room" width={80} />,
    offerPrice: room.discount ? `$${(parseFloat(room.rate.replace('$', '')) * (1 - room.discount / 100)).toFixed(2)}` : room.rate,
  }));

  return (
    <Container>
      <LateralMenu />
      <div>
        <NavBar />
        <section>
          <Title>Room List</Title>
          <Table cols={columns} data={tableData} />
        </section>
      </div>
    </Container>
  );
};

export default RoomList;
