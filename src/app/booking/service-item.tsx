import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

import Image from './image';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function ServiceItem({
  service,
  selected,
  setSelected,
  amount,
  setAmount,
  allData,
  setAllData,
}) {
  const {
    id,
    images,
    name,
    description,
    price,
    priceSale,
    onSale,
    available,
    durations,
    tags,
    totalViews,
    ratingNumber,
  } = service;

  const renderRating = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        top: 8,
        right: 8,
        zIndex: 9,
        borderRadius: 1,
        position: 'absolute',
        p: '2px 6px 2px 4px',
        typography: 'subtitle2',
        bgcolor: 'rgba(255, 255, 255, 0.7)',
      }}
    >
      <Iconify icon="eva:star-fill" sx={{ color: 'warning.main', mr: 0.25 }} /> {ratingNumber}
    </Stack>
  );

  const renderPrice = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        top: 8,
        left: 8,
        zIndex: 9,
        borderRadius: 1,
        bgcolor: 'grey.800',
        position: 'absolute',
        p: '2px 6px 2px 4px',
        color: 'common.white',
        typography: 'subtitle2',
      }}
    >
      {!!priceSale && (
        <Box component="span" sx={{ color: 'grey.500', mr: 0.25, textDecoration: 'line-through' }}>
          ${priceSale}
        </Box>
      )}
      ${price}
    </Stack>
  );

  const renderImages = (
    <Stack
      spacing={0.5}
      direction="row"
      sx={{
        p: (theme) => theme.spacing(1, 1, 0, 1),
      }}
    >
      <Stack flexGrow={1} sx={{ position: 'relative' }}>
        {renderPrice}
        {renderRating}
        <Image
          alt="Image 0"
          src={`data:image/jpeg;base64,${service.images[0]}`}
          sx={{ borderRadius: 1, height: 164, width: 1 }}
        />
      </Stack>
      <Stack spacing={0.5}>
        <Image
          alt="Image 1"
          src={`data:image/jpeg;base64,${service.images[1]}`}
          ratio="1/1"
          sx={{ borderRadius: 1, width: 80 }}
        />
        <Image
          alt="Image 2"
          src={`data:image/jpeg;base64,${service.images[2]}`}
          ratio="1/1"
          sx={{ borderRadius: 1, width: 80 }}
        />
      </Stack>
    </Stack>
  );

  const renderTexts = (
    <ListItemText
      sx={{
        p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5),
      }}
      primary={tags}
      secondary={
        <div>
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      }
      primaryTypographyProps={{
        typography: 'caption',
        color: 'text.disabled',
      }}
      secondaryTypographyProps={{
        mt: 1,
        noWrap: true,
        component: 'span',
        color: 'text.primary',
        typography: 'subtitle1',
      }}
    />
  );

  // useEffect(() => {
  //   console.log(selected);
  // }, []);

  const [clicked, setClicked] = useState(
    allData.selectedServices.some(({ id }) => id === service.id)
  );

  const renderInfo = (
    <Stack
      spacing={1.5}
      sx={{
        position: 'relative',
        p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5),
      }}
    >
      {[
        {
          label: `${durations} mins`,
          icon: <Iconify icon="solar:clock-circle-bold" sx={{ color: 'info.main' }} />,
        },
      ].map((item) => (
        <Stack
          key={item.label}
          spacing={1}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ typography: 'body2' }}
        >
          <Box>
            {item.icon}
            {item.label}
          </Box>
          <Checkbox checked={clicked} />
        </Stack>
      ))}
    </Stack>
  );

  // const [selected, setSelected] = useState(false);

  // function handleOnClick() {
  //   setSelected(!selected);
  // }

  // useEffect(() => {
  //   console.log(selected.includes('1'));
  // });

  return (
    <Card
      // onClick={handleOnClick}
      sx={{
        cursor: 'pointer',
        boxShadow: `${clicked ? '5px 5px rgb(177, 19, 84)' : ''}`,
      }}
      onClick={() => {
        const s = {
          id: service.id,
          price: service.price,
          name: service.name,
          durations: service.durations,
        };
        console.log(s);

        if (selected.some(({ id }) => id === service.id)) {
          setAmount(amount - 1);
          setClicked(false);
          setSelected(selected.filter(({ id }) => id !== service.id));
          setAllData({
            ...allData,
            selectedServices: [selected.filter(({ id }) => id !== service.id)],
          });
          console.log({
            ...allData,
            selectedServices: [selected.filter(({ id }) => id !== service.id)],
          });
        } else {
          setAmount(amount + 1);
          setClicked(true);
          setSelected([...selected, s]);
          setAllData({
            ...allData,
            selectedServices: [...selected, s],
          });
          console.log({
            ...allData,
            selectedServices: [...selected, s],
          });
        }
      }}
    >
      {renderImages}

      {renderTexts}

      {renderInfo}
    </Card>
  );
}
