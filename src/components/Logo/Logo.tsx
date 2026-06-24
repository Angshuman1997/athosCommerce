import { Box } from '@mui/material';
import logo from '../../assets/images/logo.png';

export default function Logo() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box
        component="img"
        src={logo}
        alt="Store Logo"
        decoding="async"
        fetchPriority="high"
        sx={{
          height: {
            xs: '1.5rem',
            sm: '2rem',
            md: '2.5rem',
          },
          width: 'auto',
          aspectRatio: 'auto',
          objectFit: 'contain',
        }}
      />
    </Box>
  );
}
