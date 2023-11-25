import React from "react";
//import { withRouter } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";

import Drawer from "@mui/material/Drawer";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
//import Drawer from '@mui/material/Drawer';
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
//import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

//import InboxIcon from "@mui/icons-material/MoveToInbox";
//import MailIcon from "@mui/icons-material/Mail";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import EventIcon from "@mui/icons-material/Event";
import BarChartIcon from "@mui/icons-material/BarChart";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme, open }) => ({
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: `-${drawerWidth}px`,
		...(open && {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
		}),
	})
);

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

function PersistentDrawerLeft() {
	//console.log(history);  //^requires props in ()
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const menuItemsList = [
		{ text: "Customers", icon: <AccountBoxIcon />, link: "/" },
		{ text: "Trainings", icon: <DirectionsRunIcon />, link: "/trainings" },
		{ text: "Calendar", icon: <EventIcon />, link: "/calendar" },
		{ text: "Statistics", icon: <BarChartIcon />, link: "/statistics" },
	];

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{ mr: 2, ...(open && { display: "none" }) }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						PersonalTrainer
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "ltr" ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{menuItemsList.map((item, index) => {
						const { text, icon, link } = item;

						return (
							<ListItem key={index} disablePadding>
								<Link
									to={link}
									style={{ color: "inherit", textDecoration: "inherit" }}
								>
									<ListItemButton>
										<ListItemIcon>{icon}</ListItemIcon>
										<ListItemText primary={text} />
									</ListItemButton>
								</Link>
							</ListItem>
						);
					})}
				</List>
				<Divider />
			</Drawer>
			<Main open={open}>
				<DrawerHeader />
				<Outlet />
			</Main>
		</Box>
	);
}
export default PersistentDrawerLeft;

/*
	return (
							<ListItem key={index} disablePadding>
								<Link
									to={link}
									style={{ color: "inherit", textDecoration: "inherit" }}
								>
									<ListItemButton>
										<ListItemIcon>{icon}</ListItemIcon>
										<ListItemText primary={text} />
									</ListItemButton>
								</Link>
							</ListItem>
						);
*/
/*
const Drawer = () => {
    //Variables & Functions
    
	return (
		<MUIDrawer>
			<></>
		</MUIDrawer>
	);
};

*/
