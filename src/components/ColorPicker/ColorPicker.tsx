// import * as React from 'react';
// import Typography from '@mui/material/Typography';
// import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// import { IconButton, Popover } from '@mui/material';
// import {Box} from '@mui/material';
// import { SketchPicker } from 'react-color';
// import { useState } from 'react';

// export default function ColorPicker() {
//     const [tylesColor, setTylesColor] = useState<string>('#273146')
//     const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

//     const handleOpenReq = (event: React.MouseEvent<HTMLElement>) => {
//         setAnchorEl(event.currentTarget);
//       };
    
//     const handleCloseReq = () => {
//         setAnchorEl(null);
//       };
//       const handleChangeComplete = (color: any) => {
//         switch(colorChanging) {
//             case 'tiles':  
//             setTilesColor(color.hex)
//             break;
//             case 'background':  
//             setBackgroundColor(color.hex)
//             break;
//             default:
//           }
       
        
//         setCurrentColor(color);
//       };
//     const open = Boolean(anchorEl);

//     const [currentColor, setCurrentColor] = useState("#D0021B");
//     const handleChangeComplete = (color: any) => {
//       console.log(color.hex)
//       setTylesColor(color.hex)
//       setCurrentColor(color);
//     };

//     return (
//         <>
//         <div style={{height: 200}}>
//                 <SketchPicker
//                     disableAlpha
//                     color={currentColor}
//                     onChangeComplete={handleChangeComplete}/>
                
//         </div>
     
//         </> 
//     )
// }