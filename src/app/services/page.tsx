// eslint-disable-next-line @typescript-eslint/no-unused-vars

'use client';

import React, { useState, useEffect } from 'react';

import { Box, Grid, Typography } from '@mui/material';

import { ServiceCard } from './ServiceCard';

export function Services() {
  interface Service {
    id: number;
    image: string;
    name: string;
    description: string;
    price: number;
    priceSale: number;
    onSale: boolean;
    available: boolean;
    durations: number;
    tags: string; // cannot be null
    ratingNumber: number;
    totalviews: number;
    addon: Array<number>;
    category: string;
  }

  interface Type_Service {
    type: string;
    list: Array<Service>;
  }

  const empty_type_service = {
    type: '',
    list: [],
  };
  // raw service data should be processed and then can be view.
  const [rawServices, setRawServices] = useState<Service[]>([
    {
      id: 1,
      image: 'url',
      name: 'Simpli Manicure',
      description:
        'Quick and simple refresh including a nail and cuticle trim, hand massage, and nail polish of your choice.',
      price: 18,
      priceSale: 18,
      onSale: false,
      available: true,
      durations: 30,
      tags: 'popular',
      totalviews: 165,
      ratingNumber: 5,
      addon: [1, 2, 3, 4],
      category: 'Manicures',
    },
    {
      id: 2,
      image: 'url',
      name: 'TLC Manicure',
      description:
        'Soothe those overworked hands, treating them to a nail and cuticle trim, collagen scrub exfoliation, deep moisturization, warm lotion massage, and nail polish of your choice.',
      price: 25,
      priceSale: 25,
      onSale: false,
      available: true,
      durations: 60,
      tags: '',
      totalviews: 56,
      ratingNumber: 4,
      addon: [1, 2, 3, 4],
      category: 'Manicures',
    },
    {
      id: 6,
      image: 'url',
      name: 'Pink & White Powder',
      description: 'Includes gel top coat',
      price: 55,
      priceSale: 55,
      onSale: false,
      available: true,
      durations: 90,
      tags: 'popular',
      totalviews: 144,
      ratingNumber: 5,
      addon: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      category: 'Acrylics & Gel',
    },
  ]);
  // this is processed service data.
  const [services, setServices] = useState<Array<Type_Service>>([]);

  const [filterDisplay, setFilterDisplay] = React.useState(false);

  function filterOnClick() {
    setFilterDisplay(!filterDisplay);
  }
  const handleClick = () => {
    filterOnClick();
  };

  useEffect(() => {
    // Get request 1:
    // Parameter: null
    // Response: A list of srevices in form of Service
    // This just get the service list of company, and the data should be store with setRawServices()
    // The response data will be processd as below, which will be classified in different categories and tags.

    const service_obj: any = {};
    rawServices.forEach((service: any) => {
      if (service.tags) {
        if (!Object.keys(service_obj).includes(service.tags)) {
          service_obj[service.tags] = [service];
        } else {
          service_obj[service.tags].push(service);
        }
      }
    });
    rawServices.forEach((service: any) => {
      if (!service.tags) {
        if (!Object.keys(service_obj).includes('other')) {
          service_obj.other = [service];
        } else {
          service_obj.other.push(service);
        }
      }
    });
    const service_arr: Array<Type_Service> = [];
    Object.keys(service_obj).forEach((key) => {
      service_arr.push({ type: key, list: service_obj[key] });
    });
    console.log(service_arr);
    setServices(service_arr);
  }, [rawServices]);

  const serviceCards = services.map((s, index) => [
    <Grid
      item
      xs={12}
      fontSize="20px"
      fontWeight={600}
      mt={index === 0 ? 0 : 2}
      className="section-header"
    >
      <Typography variant="h3" borderBottom="1px solid black">
        {s.type}
      </Typography>
    </Grid>,
    s.list.map((item) => (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <ServiceCard
          image={item.image}
          price={item.price}
          description={item.description}
          name={item.name}
        />
      </Grid>
    )),
  ]);

  const serviceTypes = services.map((s, index) => (
    <Box
      key={index}
      onClick={() => {
        window.scrollBy(
          0,
          (
            document.querySelectorAll('.section-header')[index] as HTMLElement
          ).getBoundingClientRect().top
        );
      }}
    >
      <div className="bar">{s.type}</div>
    </Box>
  ));

  document.addEventListener('click', (e) => {
    if (filterDisplay) {
      if (!document.getElementsByClassName('filter-icon')[0].contains(e.target as HTMLElement)) {
        setFilterDisplay(false);
      }
    }
  });

  return (
    <Box
      width="100vw"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h2" mb={3}>
        Services
      </Typography>
      <Box
        width="80vw"
        display="flex"
        mb={3}
        justifyContent="space-between"
        pl={1}
        position="relative"
      >
        <Box
          className={`filter-list ${filterDisplay ? '' : 'notDisplay'}`}
          display={filterDisplay ? '' : 'none'}
          sx={{
            border: '1px solid black',
            position: 'absolute',
            bottom: '0px',
            background: 'white',
            transform: 'translateY(100%)',
            borderBottom: 'none',
          }}
        >
          {serviceTypes}
        </Box>
        <Box
          component="img"
          className="filter-icon"
          src="../assets/images/list-svgrepo-com.svg"
          alt="list-icon"
          sx={{ width: '30px', cursor: 'pointer' }}
          onClick={handleClick}
        />

        {/* <img
          src="../assets/images/filter-icon.png"
          alt="filter"
          className="filter-icon"
        /> */}
      </Box>
      <Grid width="80vw" container spacing={2}>
        {serviceCards}
      </Grid>
    </Box>
  );
}

export default Services;
