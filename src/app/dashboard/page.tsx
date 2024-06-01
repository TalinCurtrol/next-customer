'use client';

import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

interface orderInfo {
  imageUrl: string;
  imageDescription: string;
  name: string;
  serviceDescription: string;
  address: string;
  technicianName: string;
  date_time: string;
}

function CustomListItemButton({ ...item }: orderInfo) {
  return (
    <ListItemButton onClick={() => redirect('/orders')}>
      <Box
        component="img"
        sx={{
          height: 50,
          width: 50,
          marginLeft: '10px',
          marginRight: '10px',
        }}
        alt={item.imageDescription}
        src={item.imageUrl}
      />
      <ListItemText
        primary={item.name}
        secondary={item.serviceDescription}
        sx={{ fontweight: 'bold' }}
      />
      <ListItemText primary="Location: " secondary={item.address} />
      <ListItemText primary="Service Provided by" secondary={item.technicianName} />
      <ListItemText primary="Start Time:" secondary={item.date_time} />
    </ListItemButton>
  );
}

function CustomListItemButton2({ ...item }: orderInfo) {
  return (
    <ListItemButton onClick={() => redirect('/orders')}>
      <Box
        component="img"
        sx={{
          height: 50,
          width: 50,
          marginLeft: '10px',
          marginRight: '10px',
        }}
        alt={item.imageDescription}
        src={item.imageUrl}
      />
      <ListItemText
        primary={item.name}
        secondary={item.serviceDescription}
        sx={{ fontweight: 'bold' }}
      />
      <ListItemText primary="Location: " secondary={item.address} />
      <ListItemText primary="Service Provided by" secondary={item.technicianName} />
      <ListItemText primary="Finished Date:" secondary={item.date_time} />
    </ListItemButton>
  );
}

function TitleButton({ title }: { title: string }) {
  const router = useRouter();
  return (
    <Container
      sx={{
        display: 'inline-flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      maxWidth={false}
    >
      <Box sx={{ typography: 'h3', marginTop: '20px' }}>{title}</Box>
      <Button
        variant="outlined"
        sx={{
          height: '20px',
          width: '140px',
          fontWeight: 'bold',
          marginTop: '23px',
        }}
        onClick={() => {
          router.push('/orders');
        }}
      >
        View More
      </Button>
    </Container>
  );
}

export function Dashboard() {
  const [commingOrderList, setCommingOrderList] = useState<orderInfo[]>([
    {
      imageUrl:
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2',
      imageDescription: 'The house from the offer.',
      name: 'Nail Care',
      serviceDescription: 'Nail cleaning and restoration',
      address: 'Lawson St',
      technicianName: 'David',
      date_time: '23/4/2024 15:20',
    },
    {
      imageUrl:
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2',
      imageDescription: 'The house from the offer.',
      name: 'Nail Care',
      serviceDescription: 'Nail cleaning and restoration',
      address: 'Lawson St',
      technicianName: 'David',
      date_time: '23/4/2024 15:20',
    },
  ]);
  const [reviewOrderList, setReviewOrderList] = useState<orderInfo[]>([
    {
      imageUrl:
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2',
      imageDescription: 'The house from the offer.',
      name: 'Nail Care',
      serviceDescription: 'Nail cleaning and restoration',
      address: 'Lawson St',
      technicianName: 'David',
      date_time: '23/4/2024 15:20',
    },
    {
      imageUrl:
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2',
      imageDescription: 'The house from the offer.',
      name: 'Nail Care',
      serviceDescription: 'Nail cleaning and restoration',
      address: 'Lawson St',
      technicianName: 'David',
      date_time: '23/4/2024 15:20',
    },
  ]);

  const [currentNotification, setCurrentNotification] = useState('No notifications');

  useEffect(() => {
    // GET request 1:
    // Parameter: customer's id
    // Response: a list of orders in form of orderInfo
    // This list should only contain two orders, which are the latest future orders.
    // This list should be stored with setCommingOrderList()
    // GET request 2:
    // Parameter: customer's id
    // Response: a list of orders in form of orderInfo
    // This list should only contain two orders, which are randomly orders need to be reviewd.
    // This list should be stored with setReviewOrderList()
    // (optional) GET request 3:
    // Parameter: customer's id
    // Response: a string from backend as notification form admin side.
    // This string should be stored with setCurrentNotification()
  }, []);
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        width: '100%',
        display: 'block',
      }}
    >
      <Box sx={{ typography: 'h2' }}>Welcome Back, Donovan!</Box>
      <Box sx={{ typography: 'h3', marginTop: '20px' }}>Notification:</Box>
      <Box
        sx={{
          boxShadow: 3,
          backgroundColor: 'background.paper',
          marginTop: '15px',
          marginLeft: '30px',
          marginRight: '30px',
          borderRadius: '20px',
          padding: '10px',
        }}
      >
        {currentNotification}
      </Box>

      <TitleButton title="Coming Services" />
      <Box
        sx={{
          boxShadow: 3,
          backgroundColor: 'background.paper',
          marginTop: '15px',
          marginLeft: '30px',
          marginRight: '30px',
          borderRadius: '20px',
        }}
      >
        <List component="nav">
          <CustomListItemButton {...commingOrderList[0]} />
          <Divider />
          <CustomListItemButton {...commingOrderList[1]} />
        </List>
      </Box>
      <TitleButton title="Waiting for rating" />
      <Box
        sx={{
          boxShadow: 3,
          backgroundColor: 'background.paper',
          marginTop: '15px',
          marginLeft: '30px',
          marginRight: '30px',
          borderRadius: '20px',
        }}
      >
        <List component="nav">
          <CustomListItemButton2 {...reviewOrderList[0]} />
          <Divider />
          <CustomListItemButton2 {...reviewOrderList[1]} />
        </List>
      </Box>
    </Box>
  );
}

export default Dashboard;
