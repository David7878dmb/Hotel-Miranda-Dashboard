import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { getAllRoomsThunk } from '../../features/rooms/roomThunk';
// @ts-ignore
import { promiseStatus } from '../../utils/promises';
// @ts-ignore
import Container from "../container/container";
// @ts-ignore
import LateralMenu from "../lateralMenu/lateralMenu";
import styled from 'styled-components';
// @ts-ignore
import NavBar from "../navBar/navBar";
// @ts-ignore
import Table from "../tables/table";

// Definimos los tipos para Room y el estado de Redux
interface Room {
  id: number;
  "room-type": string;
  number: number;
  picture: string;
  "bed-type": string;
  facilities: string[];
  rate: string;
  status: string;
  discount?: number;
}

interface RoomState {
  rooms: Room[];
  status: string;
  error: string | null;
}

// Definimos los estilos de la fila
const StyledRow = styled.tr<{ status: string }>`
  background-color: ${(props) => 
    props.status === 'Available' ? 'green' : 'red'};
`;

const Title = styled.h1``;

const RoomList: React.FC = () => {
  // Tipamos el dispatch y el selector
  const dispatch: AppDispatch = useDispatch();
  const { rooms, status, error } = useSelector((state: RootState) => state.room);

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

  // Columnas con sus accesores
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

  // Mapeamos los datos de las habitaciones y calculamos el precio con descuento
    const tableData = rooms.map((room: Room) => ({
    ...room,
    picture: <img src={room.picture} alt="Room" width={80} />,
    offerPrice: room.discount 
        ? `$${(parseFloat(room.rate.replace('$', '')) * (1 - room.discount / 100)).toFixed(2)}`
        : room.rate,
    status: room.status,
    rowStyle: <StyledRow status={room.status}></StyledRow>,
    }));


  return (
    <Container>
      <LateralMenu />
      <div>
        <NavBar />
        <section>
          <Title>Room List</Title>
          <Table 
            cols={columns} 
            data={tableData} 
            rowRenderer={(row:any) => <StyledRow status={row.status}>{row.children}</StyledRow>} 
          />
        </section>
      </div>
    </Container>
  );
};

export default RoomList;
