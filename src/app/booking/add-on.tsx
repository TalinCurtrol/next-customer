/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { Box, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Data } from './page';

// ----------------------------------------------------------------------

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  checked: boolean;
}

interface AddonListProps {
  allData: Data;
  setAllData: React.Dispatch<React.SetStateAction<Data>>;
}

const AddonList: React.FC<AddonListProps> = ({ allData, setAllData }) => {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Exfoliation',
      description: ' $5.00 ',
      checked: false,
      category: 'Skin & Body Care',
      price: 5,
    },
    {
      id: '2',
      name: 'Mask',
      description: ' $5.00 ',
      checked: false,
      category: 'Skin & Body Care',
      price: 5,
    },
  ]);
  const [serviceList, setServiceList] = useState<Service[]>([
    {
      id: '1',
      name: 'Exfoliation',
      description: ' $5.00 ',
      checked: false,
      category: 'Skin & Body Care',
      price: 5,
    },
    {
      id: '2',
      name: 'Mask',
      description: ' $5.00 ',
      checked: true,
      category: 'Skin & Body Care',
      price: 5,
    },
  ]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategorySelect = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleChange = (serviceId: string, addOnName: string, addOnPrice: number) => {
    setServiceList((prevState) =>
      prevState.map((service) =>
        service.id === serviceId ? { ...service, checked: !service.checked } : service
      )
    );

    const { selectedAddons } = allData;

    const addon = { id: serviceId, name: addOnName, price: addOnPrice };
    const isSelected = selectedAddons.some(({ id }) => id === serviceId);

    if (isSelected) {
      setAllData({
        ...allData,
        selectedAddons: selectedAddons.filter(({ id }) => id !== serviceId),
      });
    } else {
      setAllData({
        ...allData,
        selectedAddons: [...selectedAddons, addon],
      });
    }
  };

  // Get unique categories
  const categories = Array.from(new Set(services.map((service) => service.category)));

  const getAddons = (selectedServices: string[]) => {
    // GET request 1:
    // Paremeter: a string of selected service. Different service has different addons.
    // Response: a list of addons in form of Service.
    // The list should be stored with both setServices() and setServiceList().
  };

  useEffect(() => {
    getAddons(allData.selectedServices);
  }, [allData.selectedServices]);

  return (
    <>
      <Typography variant="h2">Addon Services</Typography>

      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Box marginRight={4} p={4}>
            <Typography variant="h3">Categories</Typography>
            <br />
            {/* Button list for categories */}
            {categories.map((category) => (
              <Box key={category} mb={1}>
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
            ))}
          </Box>
        </Grid>
        <Grid item xs={8}>
          <div>
            {/* Filtered services based on selected categories */}
            {categories.map((category) => (
              <div
                key={category}
                style={{
                  display:
                    selectedCategories.includes(category) || selectedCategories.length === 0
                      ? 'block'
                      : 'none',
                }}
              >
                <Box p={4}>
                  <Typography variant="h3">{category}</Typography>
                  {serviceList
                    .filter((service) => service.category === category)
                    .map((service) => (
                      <div key={service.id}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={service.checked}
                              onChange={() => handleChange(service.id, service.name, service.price)}
                            />
                          }
                          label={
                            <div>
                              <Typography variant="body1" fontWeight="bold">
                                {service.name}
                              </Typography>
                              <Typography variant="body2">
                                {service.description.length > 60
                                  ? `${service.description.substring(0, 60)}...`
                                  : service.description}
                              </Typography>
                            </div>
                          }
                        />
                      </div>
                    ))}
                </Box>
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default AddonList;
