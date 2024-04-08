import { Box, Button, Grid, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserTable from '../../components/UserTable'
import { useGetAllUsersQuery } from '../../redux/api/userApi'
import { useSelector } from 'react-redux'
import Header from '../../components/Header'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { COLORS } from '../../constants/colors'

const UserManagement = () => {
  const token = useSelector((state) => state.auth.token);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedUserType, setSelectedUserType] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false)
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: userData, refetch } = useGetAllUsersQuery({ token: token, page: page, limit: rowsPerPage, isActive: selectedUserType, isNewUser: isNewUser, searchQuery: searchQuery })
  const [selectedUsers, setSelectedUsers] = useState([]);
  useEffect(() => {
    refetch()
  }, [selectedCategory, selectedDate, selectedLocation, selectedUserType, activeTab])

  return (
    <Box bgcolor={COLORS.BgBlue}>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}  />
      <Typography m={3} fontSize={25} fontWeight={"700"}>
        User Management
      </Typography>
      <Grid container mt={2} mb={2}>
        <Grid item xs={8} display={"flex"} justifyContent={"space-around"}>
          <Button
            onClick={() => setActiveTab("all")}
            style={{
              backgroundColor:
                activeTab == "all" ? COLORS?.PrimaryBlue : COLORS?.GreyButton,
            }}
            variant='contained'
          >
            All Users
          </Button>
          <Button
            onClick={() => { setSelectedUserType(true); setActiveTab("active") }}
            style={{
              // padding: 0,
              backgroundColor:
                activeTab == "active"
                  ? COLORS?.PrimaryBlue
                  : COLORS?.GreyButton,
            }}
            variant='contained'
          >
            Active Users
          </Button>
          <Button
            onClick={() => { setIsNewUser(true); setActiveTab("new") }}
            style={{
              backgroundColor:
                activeTab == "new"
                  ? COLORS?.PrimaryBlue
                  : COLORS?.GreyButton,
            }}
            variant='contained'
          >
            New Users
          </Button>
          <Button
            onClick={() => { setSelectedUserType(false); setActiveTab("blocked") }}
            style={{
              backgroundColor:
                activeTab == "blocked"
                  ? COLORS?.PrimaryBlue
                  : COLORS?.GreyButton,
            }}
            variant='contained'
          >
            Blocked Users
          </Button>
          <Button
            // onClick={() => { setSelectedUserType(false); setActiveTab("blocked") }}
            style={{
              backgroundColor:
                activeTab == "blocked"
                  ? COLORS?.PrimaryBlue
                  : COLORS?.GreyButton,
            }}
            variant='contained'
          >
            Delete Users
          </Button>
        </Grid>

        <Grid item xs={4} display={"flex"} justifyContent={"center"}>

        </Grid>
      </Grid>
      <Grid container p={2} bgcolor={COLORS?.PrimaryWhite}>
        <Grid item xs={4}>
          <Typography fontSize={23} fontWeight={700}>
            All Users
          </Typography>
        </Grid>
        <Grid
          item
          xs={8}
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <Select
            style={{ height: '2rem', backgroundColor: COLORS?.BgBlue, width: '8rem' }}
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={selectedDate ? selectedDate : false}
            label='Select Date'
            onChange={(event) => {
              setSelectedDate(event.target.value ? event.target.value : false);
            }}
          >
            <MenuItem value={false}>All Dates</MenuItem>
            {[]?.map((el, index) => (
              <MenuItem key={el?.value} value={el?.value}>
                {el?.label}
              </MenuItem>
            ))}
          </Select>
          <Select
            style={{ height: '2rem', backgroundColor: COLORS?.BgBlue, width: '8rem' }}
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={selectedCategory ? selectedCategory : false}
            label='Category'
            onChange={(event) => {
              setSelectedCategory(event.target.value ? event.target.value : false);
            }}
          >
            <MenuItem value={false} >All Categories</MenuItem>
            {[]?.map((el, index) => (
              <MenuItem key={el?.value} value={el?.value}>
                {el?.label}
              </MenuItem>
            ))}
          </Select>
          <Select
            style={{ height: '2rem', backgroundColor: COLORS?.BgBlue, width: '8rem' }}
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={selectedLocation ? selectedLocation : false}
            label='Category'
            onChange={(event) => {
              console.log(event.target.value);
              setSelectedLocation(event.target.value ? event.target.value : false);
            }}
          >
            <MenuItem value={false}>All Locations</MenuItem>
            {[]?.map((el, index) => (
              <MenuItem key={el?.value} value={el?.value}>
                {el?.label}
              </MenuItem>
            ))}
          </Select>
          <Select
            style={{ height: '2rem', backgroundColor: COLORS?.BgBlue, width: '8rem' }}
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={selectedUserType}
            label='User Type'
            onChange={(event) => {
              console.log(event.target.value);
              setSelectedUserType(event.target.value ? event.target.value : false);
            }}
          >
            {/* <MenuItem value={false} >User Type</MenuItem> */}
            <MenuItem value={true} >Active</MenuItem>
            <MenuItem value={false} >Blocked</MenuItem>

          </Select>
        </Grid>
      </Grid>
      <UserTable
        users={userData?.users}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        page={page}
        setPage={setPage}
        totalUsers={userData?.totalUsers}
        totalPages={userData?.totalPages}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />
    </Box>
  )
}

export default UserManagement