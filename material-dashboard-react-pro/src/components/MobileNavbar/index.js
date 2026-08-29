import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Home, Person, Analytics, Settings } from '@mui/icons-material';

function MobileNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(location.pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0,
        display: { xs: 'block', sm: 'none' }, // 只在移动设备显示
        zIndex: 100,
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider'
      }} 
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Home"
          value="/dashboards/home"
          icon={<Home sx={{ fontSize: '20rem' }} />} // 调整图标大小
        />
        <BottomNavigationAction
          label="Analytics"
          value="/dashboards/analytics"
          icon={<Analytics sx={{ fontSize: '2rem' }} />} // 调整图标大小
        />
        <BottomNavigationAction
          label="Sales"
          value="/dashboards/sales"
          icon={<Person sx={{ fontSize: '2rem' }} />} // 调整图标大小
        />
        <BottomNavigationAction
          label="设置"
          value="/pages/account/settings"
          icon={<Settings sx={{ fontSize: '2rem' }} />} // 调整图标大小
        />
      </BottomNavigation>
    </Paper>
  );
}

export default MobileNavbar;