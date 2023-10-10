import React, { useState, useContext } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { userContext } from '../providers/UserProvider';

const pages = ['New Project', 'What Links?'];
// const settings = ['My Projects', 'Logout'];

function Header() {
  const { logOut, loggedinUser } = useContext(userContext);
  const theme = useTheme();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [PaletteMode, setMode] = useState('light');


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    logOut();
  };
  const handleMyProjects = () => {
    navigate(`/myProjects`);
    handleCloseUserMenu();
  };

  const toggleColorMode = () => {
    setMode((PaletteMode) =>
      PaletteMode === 'light' ? 'dark' : 'light',
    );
  };


  return (
    <AppBar position='fixed' top='0' zIndex='100'>
      {/* <AppBar position="static"> */}
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ background: 'secondary' }}>
          <img src={"../../public/white-lens.png"}
            onClick={() => navigate('/login')}
            width="3.5%"
            sx={{ display: { xs: 'none', md: 'flex' }, mx: 2, px: 2 }} />
          <Typography
            variant="h6"
            noWrap
            // component="a"
            // onClick={() => navigate('/projectBoard/')}
            // should there be an onclick here???
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Lens
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" href='StartNewProject'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <img src={"../../public/vite.svg"} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Lens
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => navigate('/newProject')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="User settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {loggedinUser ? (
                  <AccountCircleIcon stroke='white' />
                ) : (
                  // <Avatar alt="L" src={loggedinUser.avatar} />
                  <></>
                )}
              </IconButton>
            </Tooltip>

            <Tooltip title="Dark Mode">
              <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => ( */}
              {loggedinUser ?
                <div>
                  <MenuItem key={'My Projects'} onClick={handleMyProjects}>
                    <Typography textAlign="center">My Projects</Typography>
                  </MenuItem>
                  <MenuItem key={'Logout'} onClick={handleLogout}>
                    <Typography textAlign="center">LogOut</Typography>
                  </MenuItem>
                </div>
                :
                <MenuItem key={'Sign In'} onClick={() => navigate('/login')}>
                  <Typography textAlign="center">Sign In</Typography>
                </MenuItem>
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
}
export default Header;
