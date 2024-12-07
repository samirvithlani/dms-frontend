import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  GlobalStyles,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link, Outlet, useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import { deepOrange, deepPurple } from "@mui/material/colors";
import ListIcon from "@mui/icons-material/List";
import "../../assets/layouts/layout.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Cookies from "js-cookie";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import { constant } from "../../constant"

export const AdminSidebar = () => {

  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const drawerWidth = 250;
  const partialWidth = 0;
  const [isExpanded, setIsExpanded] = useState(true); // State to manage sidebar expansion
  const [openLogoutDialog, setOpenLogoutDialog] = useState(!isMobile);
  const [subjects, setsubjects] = useState([]);
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [Loading, setisloading] = useState(false);
  const handleOpenLogoutDialog = () => {
    setOpenLogoutDialog(true);
    Cookies.clear();
  };

  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false);
  };

  const handleLogout = () => {
    // Remove cookies and navigate to login page
    Cookies.remove("token");
    Cookies.remove("name");
    Cookies.remove("_id");
    Cookies.remove("role");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    setOpenLogoutDialog(false);
    // fetchsubject()
  }, []);


  const routerArray = [
    {
      id:1,
      name:"Add Drone",
      logoImage:HomeIcon,
      linkUrl:"adddrone",
      textColor:constant.backgroundColor,
    },
    {
      id:2,
      name:"View Drones",
      logoImage:HomeIcon,
      linkUrl:"viewdrone",
      textColor:constant.backgroundColor,

    }
  ]


  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          backgroundColor: "rgb(238,242,246)",
          width: "100%",
          maxHeight: "700px",
        }}
      >
         <Drawer
          PaperProps={{
            sx: {
              marginRight: "5px",
              position: "inherit",
              borderRight: 0,
              width: isExpanded ? drawerWidth : partialWidth,
              height: "100%", // Set height to 100% of the viewport height
              
              flexShrink: 0,
              overflowX: "hidden",
              border: "5px solid #F0F0F0",
              borderRadius: "10px",
              backgroundColor: "white",
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
              },
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <List>
            {routerArray.map((res, index) => (
              <div key={res.name}>
                <ListItem
                  className={
                    res.activeMenuFor?.some((x) =>
                      location.pathname.includes(x)
                    )
                      ? "activebtn"
                      : res.linkUrl == "null"
                      ? "disabled-link"
                      : ""
                  }
                  disablePadding
                >
                  {res.name === "List" ? (
                    <ListItemButton
                      sx={{
                        paddingLeft: "20px",
                        
                        "&:hover .sidebartext": {
                          color: "white",
                        },
                        "&:hover": {
                          backgroundColor: constant.backgroundColor,
                        },
                      }}
                      onClick={() => handleToggleSubject(res.id)}
                    >
                      <ListItemIcon>
                        <Avatar
                          sx={{
                            bgcolor: constant.backgroundColor,
                            width: 24,
                            height: 24,
                          }}
                        >
                          {res?.logoImage && <res.logoImage />}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        className="sidebartext"
                        sx={{ color: "black" }}
                        primary={res.name}
                      />
                      {expandedSubject === res.id ? (
                        <ChevronLeftIcon />
                      ) : (
                        <ChevronRightIcon />
                      )}
                    </ListItemButton>
                  ) : (
                    <ListItemButton
                      component={Link}
                      to={res.linkUrl != "null" ? res.linkUrl : "#"}
                      sx={{
                        marginTop: "5px",
                        "&:hover .sidebartext": {
                          color: "white",
                        },
                        "&:hover": {
                          backgroundColor: constant.backgroundColor,
                        },
                      }}
                    >
                      <ListItemIcon>
                        <Avatar
                          sx={{
                            bgcolor: constant.backgroundColor,
                            width: 24,
                            height: 24,
                          }}
                        >
                          {res?.logoImage && <res.logoImage />}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        className="sidebartext"
                        sx={{ color: constant.backgroundColor, fontWeight: "bold"}}
                        primary={res.name}
                      />
                    </ListItemButton>
                  )}
                </ListItem>
                {expandedSubject === res.id &&
                  res.children &&
                  res.children.map((subject) => (
                    <ListItem
                      className="nested-subject"
                      key={subject.id}
                      button
                      component={Link}
                      to={subject.linkUrl}
                    >
                      <ListItemText primary={subject.name} />
                    </ListItem>
                  ))}
              </div>
            ))}
          </List>
          <Box sx={{ marginTop: "auto" }}>
            <Button
              variant="contained"
              sx={{
                color: "#whitesmoke",
                bgcolor: constant.backgroundColor,
                fontFamily: "Lato",
              }}
              startIcon={<ExitToAppIcon />}
              onClick={handleOpenLogoutDialog}
              fullWidth
            >
              Logout
            </Button>
          </Box>
        </Drawer>
        <Outlet/>
      </Box>
    </ThemeProvider>
  );
};
