import * as React from 'react';
import Typography from '@mui/material/Typography';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { IconButton, Popover } from '@mui/material';
import {Box} from '@mui/material';

export default function PasswordReqPopup() {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleOpenReq = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleCloseReq = () => {
        setAnchorEl(null);
      };

    const open = Boolean(anchorEl);


    return (
        <>
                        <IconButton
                        size="medium"
                        aria-haspopup="true"
                        aria-label="password requirements"
                        onClick={handleOpenReq}
                        color="inherit"
                        sx={{ marginTop: 1, marginLeft: 1, marginRight: 1}}
                        >
                            <HelpOutlineIcon ></HelpOutlineIcon>
                        </IconButton>
                        <Popover
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleCloseReq}
                            sx={{ marginLeft: 2 }}
                            transitionDuration = {100}
                            PaperProps={{ elevation: 1, sx: { backgroundColor: '#2E3B55',} }}
                            anchorOrigin={{
                                vertical: 'center',
                                horizontal: 'right',
                              }}
                              transformOrigin={{
                                vertical: 'center',
                                horizontal: 'left',
                              }}
                            
                        >
                            <Box sx={{ paddingX: 5, paddingY: 2 }} >
                                <ul>
                                    <li><Typography sx={{ marginBottom: 2 }}>Use at least 8 characters</Typography></li>
                                    <li><Typography sx={{ marginBottom: 2 }}>Use upper and lower case</Typography></li>
                                    <li><Typography>Use at least 1 number</Typography></li>
                                </ul>
                            </Box>
                        </Popover>
     
        </> 
    )
}