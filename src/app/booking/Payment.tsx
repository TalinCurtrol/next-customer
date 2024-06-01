import React, { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import { Box, Table, TableRow, Container, TableHead, TableBody, TableCell } from '@mui/material';

// Define interfaces for the component props and data structures
interface Service {
  name: string;
  price: number;
}

interface Addon {
  name: string;
  price: number;
}

interface AllData {
  location: string;
  selectedServices: Service[];
  selectedAddons: Addon[];
  technician: number;
  time: string;
}

interface PaymentFormProps {
  allData: AllData;
  setAllData: React.Dispatch<React.SetStateAction<AllData>>;
}

interface Technician {
  firstName: string;
  lastName: string;
}

export function PaymentForm({ allData, setAllData }: PaymentFormProps) {
  const [showLoader, setShowLoader] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isCheck, setIsCheck] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const [last4, setLast4] = useState('');
  const [serviceTotal, setServiceTotal] = useState(0);
  const [addonsTotal, setAddonsTotal] = useState(0);
  const [technicianName, setTechnicianName] = useState<Technician>({ firstName: '', lastName: '' });

  useEffect(() => {
    let amount = 0;
    for (let i = 0; i < allData.selectedServices.length; i++) {
      amount += allData.selectedServices[i].price;
    }
    setServiceTotal(amount);

    amount = 0;
    for (let i = 0; i < allData.selectedAddons.length; i++) {
      amount += allData.selectedAddons[i].price;
    }
    setAddonsTotal(amount);
  }, [allData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // setAllData({ ...allData, ...formData });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheck(event.target.checked);
  };

  const getTechnician = (id: number) => {
    console.log('getTechnician');
    // Api.get(`/getTechnicianName/${id}`)
    //   .then((res: { data: any }) => {
    //     const tech = res.data;
    //     setTechnicianName(tech);
    //   })
    //   .catch((err: any) => {
    //     console.log(err);
    //   });

    // GET request 1:
    // Parameter: technician's id
    // Response: technician's name string
    // This string should be stored with setTechnicianName()
  };

  useEffect(() => {
    getTechnician(allData.technician);
  }, [allData.technician]);

  return (
    <Container
      sx={{
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
      }}
    >
      {/* <Loader showLoader={showLoader} /> */}
      <Typography variant="h2">Order summary</Typography>

      <Typography variant="h3" mt={4}>
        Location
      </Typography>
      <Typography variant="subtitle1" mt={2}>
        {allData.location}
      </Typography>

      <Typography variant="h3" mt={2}>
        Technician
      </Typography>
      <Typography variant="subtitle1" mt={2}>
        {`${technicianName.firstName} ${technicianName.lastName}`}
      </Typography>

      <Typography variant="h3" mt={2}>
        Time
      </Typography>
      <Typography variant="subtitle1" mt={2}>
        {allData.time}
      </Typography>

      <Typography variant="h3" mt={2}>
        Services
      </Typography>
      <Container sx={{ border: '1px solid grey', borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Service name</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allData.selectedServices.map((service) => (
              <TableRow key={service.name}>
                <TableCell>{service.name}</TableCell>
                <TableCell>${service.price}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} />
              <TableCell>Subtotal: ${serviceTotal}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>

      <Typography variant="h3" mt={2}>
        Add-ons
      </Typography>
      <Box sx={{ border: '1px solid grey', borderRadius: 2 }} width="50%">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allData.selectedAddons.map(({ name, price }, id) => (
              <TableRow key={id}>
                <TableCell>{name}</TableCell>
                <TableCell>${price}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2} />
              <TableCell>Subtotal: ${addonsTotal}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>

      <Typography variant="h3" mt={2}>
        Total
      </Typography>
      <Box sx={{ border: '1px solid grey', borderRadius: 2 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell sx={{ borderBottom: 'none' }}>${serviceTotal + addonsTotal}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
}
