import React from "react";
import { styled } from "@mui/material/styles";
import {
  ClickAwayListener,
  Grow,
  ListItemIcon,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from "@material-ui/core";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import StaticDateRangePicker from "@mui/lab/StaticDateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import './Filter.scss'
const MenuItemStyled = styled(MenuItem)`
  padding-bottom: 6px;
  padding-top: 6px;
`;

const FilterComponent = () => {
  const [openFilter, setOpenFilter] = React.useState(false);
  const [openListFilter, setOpenListFilter] = React.useState(false);
  const [openSubListFilter, setOpenSubListFilter] = React.useState(false);
  const [isActiveSubFilter, setIsActiveSubFilter] = React.useState(false);
  const [dateRange, setDateRange] = React.useState([null, null]);
  const [isClickAddFilter, setIsClickAddFilter] = React.useState(false);
  const [isClickSubAddFilter, setIsClickSubAddFilter] = React.useState(false);

  const anchorRef = React.useRef(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedSubIndex, setSelectedSubIndex] = React.useState(0);

  const [filterType, setFilterType] = React.useState(null);

  const handleToggle = () => {
    setOpenFilter((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenFilter(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(openFilter);
  React.useEffect(() => {
    if (prevOpen.current === true && openFilter === false) {
      anchorRef.current?.focus();
    }

    prevOpen.current = openFilter;
  }, [openFilter]);

  const handleClickFilterType = () => {
    setOpenFilter(false);
  };

  const options = [
    {
      name: "Email booking",
      filterType: "lisaUser",
      icon: "fa-solid fa-user",
      data: [
        {
          firstWordName: "AP",
          name: "Anh Pham",
        },
        {
          firstWordName: "BN",
          name: "Binh Nguyen",
        },
      ],
    },
    {
      name: "Provider",
      filterType: "notificationsType",
      icon: "fas fa-hospital",
      data: [
        {
          name: "Bệnh viên An Bình",
        },
        {
          name: "Bệnh viên Nguyễn trãi",
        },
        {
          name: "Bệnh viên Đại học y dược",
        },
        {
          name: "Bệnh viên Chợ Rẫy",
        },
        {
          name: "Bệnh viên Thống NHất",
        },
      ],
    },
    {
      name: " Requested Date",
      filterType: "requestedDate",
      icon: "fas fa-calendar",
      data: ["requestedDateRange"],
    },
    {
      name: "Scheduled",
      filterType: "notificationsType",
      icon: "fas fa-calendar",
      data: ["scheduledDateRange"],
    },
    {
      name: "Status",
      filterType: "status",
      icon: "fa-solid fa-face-smile",
      data: [
        {
          name: "Pending",
        },
        {
          name: "On Hold",
        },
        {
          name: "Rejected",
        },
        {
          name: "Approved",
        },
      ],
    },
  ];

  const handleClickFilterAdd = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    setOpenFilter((prevOpen) => !prevOpen);
    setIsClickAddFilter(true);
    console.log(index);
  };

  const handleClickItemFilterDropDown = (event, index) => {
    setOpenListFilter(!openListFilter);

    setIsClickSubAddFilter(true);

    setSelectedSubIndex(index);
    console.log(index);
  };

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickList = (event) => {
    setOpenListFilter(!openListFilter);
  };

  const handleClickCloseSubAddFilter = (event) => {
    setIsClickSubAddFilter(false);
    setOpenListFilter(openListFilter);
  };

  const handleClearAll = (event) => {
    setOpenFilter(false)
    setOpenListFilter(false)
    setDateRange(false)
    setIsClickAddFilter(false)
    setIsClickSubAddFilter(false)
    // setAnchorEl(null)
    setSelectedIndex(0)
    setSelectedSubIndex(0)
  };

  return (
    <Stack direction="row" spacing={2} className="filter-container" >
      {isClickAddFilter ? (
        <ButtonGroup variant="text" ref={anchorRef} aria-label="split button">
          {isClickSubAddFilter ? (
            <Button
              ref={anchorRef}
              id="composition-button"
              aria-controls={openFilter ? "split-button-menu" : undefined}
              aria-expanded={openFilter ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClickList}
              size="small"
              startIcon={
                <i
                  className={`${options[selectedIndex].icon} filter-menu-icon`}
                />
              }
            >
              {options[selectedIndex].data[selectedSubIndex].name}
              {isClickSubAddFilter ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "fit-content",
                    borderRadius: "none",
                    color: "text.secondary",
                    "& svg": {
                      m: 1.5,
                    },
                    "& hr": {
                      mx: 0.5,
                    },
                  }}
                >
                  <i className="ri-arrow-down-s-fill"></i>

                  <Divider orientation="vertical" flexItem />
                  <i
                    className="ri-close-circle-fill"
                    onClick={handleClickCloseSubAddFilter}
                  ></i>
                </Box>
              ) : (
                <i className="ri-close-circle-fill"></i>
              )}
            </Button>
          ) : (
            <Button
              ref={anchorRef}
              id="composition-button"
              aria-controls={openFilter ? "composition-menu" : undefined}
              aria-expanded={openFilter ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClickList}
              size="small"
              startIcon={
                <i
                  className={`${options[selectedIndex].icon} filter-menu-icon`}
                />
              }
            >
              {options[selectedIndex].name}
              {openListFilter ? (
                <i className="ri-arrow-up-s-fill"></i>
              ) : (
                <i className="ri-arrow-down-s-fill"></i>
              )}
            </Button>
          )}

          <Popper
            open={openListFilter}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            // disablePortal
            // style={{ zIndex: 10000 }}
            style={{ margin: 0 }}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                style={{
                  // transformOrigin:
                  //   placement === "bottom-start" ? "left top" : "left bottom",
                  zIndex: 999
                }}
                {...TransitionProps}
              >
                <Paper sx={{ width: 320, maxWidth: "100%" }}>
                  {options[selectedIndex].data.map((option, index) => {
                    switch (selectedIndex) {
                      case 0:
                        return (
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList>
                              <MenuItemStyled
                                key={`sub-filter-${index}`}
                                // disabled={index === 0}
                                selected={index === selectedSubIndex}
                                onClick={(event) =>
                                  handleClickItemFilterDropDown(event, index)
                                }
                              >
                                <Avatar sx={{ bgcolor: deepPurple[500] }} style={{ width: 25, height: 25, fontSize: 12 }}>
                                  {option.firstWordName}
                                </Avatar>

                                <Typography
                                  variant="body2"
                                  style={{
                                    color: "#8693A2",
                                    lineHeight: "20px",
                                    fontWeight: 300,
                                    marginLeft: "5px",
                                  }}
                                >
                                  {option.name}
                                </Typography>
                              </MenuItemStyled>
                            </MenuList>
                          </ClickAwayListener>
                        );
                        break;

                      case 1:
                        return (
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList>
                              <MenuItemStyled
                                key={`sub-filter-${index}`}
                                // disabled={index === 0}
                                selected={index === selectedSubIndex}
                                onClick={(event) =>
                                  handleClickItemFilterDropDown(event, index)
                                }
                              >
                                <Typography
                                  variant="body2"
                                  style={{
                                    color: "#8693A2",
                                    lineHeight: "20px",
                                    fontWeight: 300,
                                    marginLeft: "5px",
                                  }}
                                >
                                  {option.name}
                                </Typography>
                              </MenuItemStyled>
                            </MenuList>
                          </ClickAwayListener>
                        );

                        break;

                      case 2:
                        return (
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <StaticDateRangePicker
                              displayStaticWrapperAs="desktop"
                              value={dateRange}
                              onChange={(newValue) => {
                                setDateRange(newValue);
                              }}
                              renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                  <TextField {...startProps} />
                                  <Box sx={{ mx: 2 }}> to </Box>
                                  <TextField {...endProps} />
                                </React.Fragment>
                              )}
                            />
                          </LocalizationProvider>
                        );

                        break;

                      case 3:
                        return (
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <StaticDateRangePicker
                              displayStaticWrapperAs="desktop"
                              value={dateRange}
                              onChange={(newValue) => {
                                setDateRange(newValue);
                              }}
                              renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                  <TextField {...startProps} />
                                  <Box sx={{ mx: 2 }}> to </Box>
                                  <TextField {...endProps} />
                                </React.Fragment>
                              )}
                            />
                          </LocalizationProvider>
                        );

                        break;

                      case 4:
                        return (
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList>
                              <MenuItemStyled
                                key={`sub-filter-${index}`}
                                // disabled={index === 0}
                                selected={index === selectedSubIndex}
                                onClick={(event) =>
                                  handleClickItemFilterDropDown(event, index)
                                }
                              >
                                <Typography
                                  variant="body2"
                                  style={{
                                    color: "#8693A2",
                                    lineHeight: "20px",
                                    marginLeft: "5px",
                                  }}
                                >
                                  {option.name}
                                </Typography>
                              </MenuItemStyled>
                            </MenuList>
                          </ClickAwayListener>
                        );

                        break;

                      default:
                        break;
                    }
                  })}
                </Paper>
              </Grow>
            )}
          </Popper>
        </ButtonGroup>
      ) : (
        ""
      )}

      {isClickSubAddFilter ? (
        <Button
          onClick={handleClearAll}
          size="small"
          startIcon={<i className="fas fa-xmark" />}
          color="error"
          className="button-error"
        >
          Clear All
        </Button>
      ) : (
        <></>
      )}

      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={openFilter ? "composition-menu" : undefined}
        aria-expanded={openFilter ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        size="small"
        startIcon={<i className="fas fa-filter" />}
      >
        Add filter
      </Button>

      <Popper
        open={openFilter}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        style={{ margin: 0, zIndex: 999 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper sx={{ width: 320, maxWidth: "100%" }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  <Typography
                    gutterBottom
                    variant="body2"
                    color="initial"
                    style={{
                      fontWeight: "600",
                      marginLeft: 10,
                      lineHeight: "16px",
                      color: "#566371",
                      padding: "5px 0",
                    }}
                  >
                    SELECT FILTER TYPE:
                  </Typography>

                  {options.map((option, index) => (
                    <MenuItemStyled
                      key={`filter-${index}`}
                      // disabled={index === 0}
                      className="filter-item-selected"
                      selected={index === selectedIndex}
                      onClick={(event) => handleClickFilterAdd(event, index)}
                    >
                      <ListItemIcon>
                        <i className={`${option.icon} filter-menu-icon`} />
                      </ListItemIcon>
                      <Typography
                        variant="body2"
                        style={{
                          color: "#8693A2",
                          lineHeight: "20px",
                          fontWeight: 300,
                          fontSize: "20px",
                        }}
                      >
                        {option.name}
                      </Typography>
                    </MenuItemStyled>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Stack>
  );
};

export default FilterComponent;
