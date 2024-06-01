import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Api from 'utils/request/http';

// ----------------------------------------------------------------------
const formatDateToString = (date) => {
  if (!date) return '';
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString('en-AU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

const formatTimeToString = (date) => {
  if (!date) return '';
  return date.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' });
};
const [technician, setTechnician] = useState([]);

const getTechnicians = (id) => {
  //console.log('useEff')
  Api.('/getTechnicianName/'+id)
    .then((res) => {
      const technician = res;
      setTechnician(technician);
    })
    .catch((err) => {
      console.log(err);
    });
};

useEffect(() => {
  getTechnicians();
}, []);

export default function OrderSummary({ orderSummary }) {

  return (
    <>
      <h2>Order Summmary</h2>
      <h3>Address</h3>
      <h5>{orderSummary[0].address}</h5>
      <h3>Date</h3>
      <h5>{formatDateToString(new Date(orderSummary[0].date))} {formatTimeToString(new Date(orderSummary[0].time))}</h5>
      <h3>Services</h3>
      {orderSummary[0]?.services.map((service, index) => (
        <h5 key={index}>{service}</h5>
      ))}
      <h3>Addon Services</h3>
      {orderSummary[0]?.addons.map((service, index) => (
        <h5 key={index}>{service}</h5>
      ))}
    </>
  );
}

OrderSummary.propTypes = {
  orderSummary: PropTypes.array,
};
