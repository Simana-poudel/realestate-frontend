import React, { useState } from 'react'
import { ChatState } from '../Context/ChatProvider';
import Box from '@mui/material/Box';
import SideDrawer from './miscellaneous/SideDrawer';
import MyChats from './MyChats';
import ChatBox from './ChatBox';


const MessagePage = () => {
    const {user} = ChatState();
    const [fetchAgain,setFetchAgain] = useState(false);

  return (
    <div>
        {/* {user && <MyChats />} */}
        {user && 
        <SideDrawer />
        }
        <Box sx={{display: 'flex', 
        justifyContent: 'space-between',
        width: '100%',
        height: '100vh',
        padding: '10px'

    }}>
            {user && (
              <MyChats fetchAgain={fetchAgain}/>
            )}

           {user && (
             <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/> 
           )}
        </Box>
        
    </div>
  )
}

export default MessagePage;