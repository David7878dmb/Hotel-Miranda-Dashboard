import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from "../container/container";
import LateralMenu from "../lateralMenu/lateralMenu";
import styled from 'styled-components';
import NavBar from "../navBar/navBar";
import Table from "../tables/table";
import { fetchBookings, archiveBooking } from '../../features/bookings/bookingsSlice';
import { selectAllBookings, selectBookingStatus } from '../../features/bookings/bookingSelector';

const Title = styled.h1``;
const CommentText = styled.p`
  font-size: 14px;
  color: grey;
  margin-top: 0.5rem;
  white-space: pre-line;
`;

export const Booking = () => {
  const dispatch = useDispatch();
  const bookings = useSelector(selectAllBookings);
  const bookingStatus = useSelector(selectBookingStatus);

  useEffect(() => {
    if (bookingStatus === 'idle') {
      dispatch(fetchBookings());
    }
  }, [bookingStatus, dispatch]);

  const handleArchive = (id) => {
    dispatch(archiveBooking(id));
  };

  const columns = [
    { header: 'Date', accessor: 'date' },
    { header: 'ID', accessor: 'id' },
    { header: 'Customer', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Comment', accessor: 'comment' },
    { header: 'Action', accessor: 'action' },
  ];

  const tableData = bookings
    .filter(contact => !contact.archived)
    .map(contact => ({
      ...contact,
      comment: <CommentText>{`aaaaaaaaaaaaaaaaaaaaaaaa`}</CommentText>,
      action: (
        <button onClick={() => handleArchive(contact.id)}>
          Archive
        </button>
      ),
    }));

  return (
    <Container>
      <LateralMenu />
      <div>
        <NavBar />
        <section>
          <Title>Concierge</Title>
          {bookingStatus === 'loading' ? (
            <p>Loading...</p>
          ) : (
            <Table cols={columns} data={tableData} />
          )}
        </section>
      </div>
    </Container>
  );
};