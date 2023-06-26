import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {Link as RouterLink} from 'react-router-dom';
import Drawer from './Drawar';
import {Button} from '@mui/material';
import ModalForm from './ModalForm';
import useNavbar from '../../hooks/useNavbar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import {Search, SearchIconWrapper, StyledInputBase} from '../styled/SearchBar';
import {useState} from 'react';
import {useStoreActions} from 'easy-peasy';
import {Grid} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import {useTheme} from '@emotion/react';

// Drawar Manu Item
const MenuItems = [
    {
        'name': 'Home',
        'icon': <HomeIcon/>
    }, {
        'name': 'Recents',
        'icon': <RecentActorsIcon/>
    }, {
        'name': 'Favorites',
        'icon': <FavoriteIcon/>
    }, {
        'name': 'Watch Later',
        'icon': <AddToQueueIcon/>
    }
]

const Navbar = () => {

    // Navbar Maintain Hooks
    const {
        navbarState,
        toggleDrawer,
        open,
        handleClickOpen,
        handleClose,
        theme
    } = useNavbar();
    // Input State for Controll Search Form
    const [input,
        setInput] = useState('');
    // Getting All Playlist Action from Playlist Store
    const playlist = useStoreActions((actions) => actions.playlist);
    
    // Getting State From Child Componnet (Modal)
    const getValues = (values) => {
        playlist.getPlaylistData(values)
    }
    // Method For Adding Playlist from Searchbar
    const myfunc = (e) => {
        if (e.key == 'Enter') {
            playlist.getPlaylistData(input)
            setInput('')
        }
    }

    return (
        <Box>
            <AppBar
                position="static"
                sx={{
                bgcolor: 'primary.dark',
                }}
                >
                <Toolbar
                    sx={{
                    display: 'flex',
                    justifyContent: {
                        xs: 'center',
                        md: 'space-between'
                    },
                    alignItems: 'center'
                }}>
                    <Grid container sx={{ display: 'flex',
                justifyContent: 'center' , alignItems: 'center' }}>
                        <Grid item xs={1} md={1}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{
                                mr: 2
                            }}
                                onClick={toggleDrawer('left', true)}>
                                <MenuIcon/>
                            </IconButton>
                        </Grid>
                        <Grid
                            item
                            xs={2}
                            md={2}
                            sx={{
                            display: {
                                xs: 'none',
                                md: 'block',
                                lg: 'block',
                                xl: 'block',
                                sm: 'none'
                            }
                        }}>
                            <Box
                                sx={{
                                flexDirection: 'colum'
                            }}>
                                <RouterLink
                                    to="/"
                                    component={RouterLink}
                                    style={{
                                    textDecoration: 'none',
                                    color: "white"
                                }}>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="div"
                                        sx={{
                                        flexGrow: 1,
                                        display: {
                                            xs: 'none',
                                            sm: 'block'
                                        }
                                    }}>
                                        Clean Youtube
                                    </Typography>
                                </RouterLink>
                                <Typography
                                    variant='body1'
                                    noWrap
                                    sx={{
                                    color: '#eee',
                                    fontSize: 10
                                }}>
                                    This Youtube is dedicate For Learner
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon/>
                                </SearchIconWrapper>
                                <StyledInputBase
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={myfunc}
                                    value={input}
                                    name="search"
                                    placeholder="Paste playlistId or link.."
                                    inputProps={{
                                    'aria-label': 'search'
                                }}/>
                                <input type={'submit'} hidden></input>
                            </Search>
                        </Grid>
                        <Grid
                            item
                            xs={3}
                            md={3}
                            sx={{
                            display: {
                                xs: 'none',
                                lg: 'block',
                                xl: 'block',
                                sm: 'none'
                            }
                        }}>
                            <Box
                                sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                gap: 2
                            }}>
                                <RouterLink
                                    to={'https://github.com/devmunira'}
                                    target="_blank"
                                    component={RouterLink}>
                                    <GitHubIcon
                                        sx={{
                                        color: theme.palette.common.white,
                                        padding: "0px 2px"
                                    }}></GitHubIcon>
                                </RouterLink>
                                <a href='mailto:muniraweb@gmail.com' target="_blank">
                                    <ForwardToInboxIcon
                                        sx={{
                                        color: theme.palette.common.white,
                                        padding: "0px 2px"
                                    }}></ForwardToInboxIcon>
                                </a>

                                <Button
                                    onClick={handleClickOpen}
                                    variant='contained'
                                    sx={{
                                    textAlign: 'center',
                                    background: 'white',
                                    color: theme.palette.primary.main
                                }}
                                    className='lightBtn'>Add New Playlist</Button>
                            </Box>

                        </Grid>
                    </Grid>

                    <ModalForm open={open} handleClose={handleClose} getValues={getValues}></ModalForm>
                    <Drawer
                        navbarState={navbarState}
                        toggleDrawer={toggleDrawer}
                        listitems={MenuItems}
                        anchor={'left'}></Drawer>
                </Toolbar>
            </AppBar>
        </Box>

    );
}

export default Navbar;