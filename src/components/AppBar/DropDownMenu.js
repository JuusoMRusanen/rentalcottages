import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

export default function DropDownMenu({ title, items, hidden, url }) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return(
    <div>
      <Button
        sx={{
          visibility:hidden
        }}
        color="inherit"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        >{title}<KeyboardArrowDownIcon />
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {items.map((item) => {
          //console.log(item);
          return(
            <Box
              sx={{
                width:'180px',
                height:'25px',
                ml:"10px"
              }}
              key={"menuitem"+item.id} 
              >
              <MenuItem sx={{m:"0 0 0 0", p:"0 0 0 0"}} key={item.title+item.id} >
                <Box sx={{m:"0 0 0 0", p:"0 100% 0 0", textAlign:"left"}} 
                  onClick={
                    () => {
                      window.location.replace(`${url}/${item.id}`)
                    }
                  }
                >{item.name}</Box>
              </MenuItem>
            </Box>
          );
        })}
      </Menu>
    </div>
  );
}