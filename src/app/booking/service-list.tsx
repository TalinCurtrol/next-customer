/* eslint-disable import/no-cycle */
import { useState, useEffect } from 'react';

import { Box, Grid, Button, TextField, Typography } from '@mui/material';

import { Data } from './page';
import ServiceItem from './service-item';

interface Service {
  id: string;
  images: string[];
  name: string;
  description: string;
  price: number;
  priceSale: number;
  onSale: boolean;
  available: boolean;
  durations: number;
  tags: string;
  totalViews: number;
  ratingNumber: number;
  category: string;
}

export function ServiceList({
  allData,
  setAllData,
}: {
  allData: Data;
  setAllData: React.Dispatch<React.SetStateAction<Data>>;
}) {
  const [selected, setSelected] = useState<Service[]>(allData.selectedServices);
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      images: ['', '', '', ''],
      name: 'Simpli Manicure',
      description:
        'Quick and simple refresh including a nail and cuticle trim, hand massage, and nail polish of your choice.',
      price: 18,
      priceSale: 18,
      onSale: false,
      available: true,
      durations: 30,
      tags: 'popular',
      totalViews: 165,
      ratingNumber: 5,
      category: 'Manicures',
    },
  ]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const categories = Array.from(new Set(services.map((service) => service.category)));
  const [searchQuery, setSearchQuery] = useState('');
  const [amount, setAmount] = useState<number>(allData.selectedServices.length);

  const handleCategorySelect = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredServices = services.filter((service) => {
    const nameMatch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    const tagMatch = service.tags
      ? service.tags.toLowerCase().includes(searchQuery.toLowerCase())
      : false;
    const descriptionMatch = service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatch || tagMatch || descriptionMatch;
  });

  const getServices = (location: string) => {
    console.log('getServices');
    // GET Request 1:
    // Parameter: up to you actually
    // Response: a list of service in form of Servie
    // The list shoud be stored with setServices()
  };

  useEffect(() => {
    getServices(allData.location);
  }, [allData.location]);

  return (
    <>
      <Typography variant="h3" mb={2}>
        {amount} services selected
      </Typography>
      <Box marginRight={4} p={4}>
        <TextField
          label="Search services"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          margin="normal"
        />
      </Box>
      <Box marginRight={4} p={2}>
        <Typography variant="h2">Select Category</Typography>
        <Grid container spacing={1}>
          {categories.map((category) => (
            <Grid item xs={2} key={category}>
              <Box mb={1}>
                <Button
                  variant={selectedCategories.includes(category) ? 'contained' : 'outlined'}
                  onClick={() => handleCategorySelect(category)}
                  style={{
                    textTransform: 'none',
                    width: '100%',
                    height: '50px',
                  }}
                  sx={{ width: '100%', height: '100%' }}
                >
                  {category}
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {selectedCategories.length === 0
          ? filteredServices.map((service, index) => (
              <ServiceItem
                key={index}
                service={service}
                selected={selected}
                amount={amount}
                setSelected={setSelected}
                setAmount={setAmount}
                allData={allData}
                setAllData={setAllData}
              />
            ))
          : filteredServices
              .filter((service) => selectedCategories.includes(service.category))
              .map((service, index) => (
                <ServiceItem
                  key={index}
                  service={service}
                  selected={selected}
                  amount={amount}
                  setSelected={setSelected}
                  setAmount={setAmount}
                  allData={allData}
                  setAllData={setAllData}
                />
              ))}
      </Box>
    </>
  );
}

export default ServiceList;
