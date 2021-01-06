import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Copyright from './../copyright/Copyright';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import Login from '../auth/Login';
import GoogleAuth from '../auth/GoogleAuth';
import UpcomingEvents from '../calendar/UpcomingEvents';
import UpcomingForecast from '../weather/UpcomingForecast';
import { useDispatch, useSelector } from 'react-redux';
import { checkSignIn, selectIsUserSignIn, signOut } from '../auth/authSlice';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: "80vh",
	},
	lockedDashboardContainer: {
		display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
	},
}));

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openLoginPopup, setOpenLoginPopup] = React.useState(false);
  const [prevIsUserLogin, setPrevIsUserLogin] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleToggleLoginPopper = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenLoginPopup(!openLoginPopup);
  };
  const handleLogout = () => {
    setPrevIsUserLogin(false);
    dispatch(signOut());
  }
	
	const isUserSignIn = useSelector(selectIsUserSignIn);

  if (isUserSignIn && !prevIsUserLogin) {
    setPrevIsUserLogin(true);
    setOpenLoginPopup(false);
  }

  useEffect(() => {
    dispatch(checkSignIn());
  }, [dispatch, isUserSignIn]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Popper open={openLoginPopup} anchorEl={anchorEl}>
        <Paper>
          <Login/>
        </Paper>
      </Popper>
      <AppBar position="absolute" className={clsx(classes.appBar, openDrawer && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, openDrawer && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Smart Heating
          </Typography>
          { !isUserSignIn
            ? <Button
              color="inherit"
              onClick={handleToggleLoginPopper}
            >
              Login
            </Button>
            : <Button
              color="inherit"
              onClick={handleLogout}
            >
              Logout
            </Button>
          }
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !openDrawer && classes.drawerPaperClose),
        }}
        open={openDrawer}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <DrawerMainListItems/>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        { !isUserSignIn
					? <div className={classes.lockedDashboardContainer}>
						<Typography variant="body2" color="textSecondary" align="center">
							Login to see Dashboard.
						</Typography>
					</div>
					: <DashboardContent />
				}
      </main>
    </div>
  );
}

export const DashboardContent = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper);

	return (
		<Container maxWidth="lg" className={classes.container}>
			<Grid container spacing={3}>
				{/* Calendar */}
				<Grid item xs>
					<Paper className={fixedHeightPaper}>
						<UpcomingEvents />
					</Paper>
				</Grid>
				{/* Forecast */}
				<Grid item xs>
					<Paper className={fixedHeightPaper}>
						<UpcomingForecast />
					</Paper>
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				{/* Google Auth */}
				<Grid item >
					<Paper className={fixedHeightPaper}>
						<GoogleAuth />
					</Paper>
				</Grid>
			</Grid>
			<Box pt={4}>
				<Copyright />
			</Box>
		</Container>
	);
};

export const DrawerMainListItems = () => {
  return (
    <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
  </div>
  );
};
