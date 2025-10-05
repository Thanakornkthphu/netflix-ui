import { Stack, Typography } from '@mui/material'
import React from 'react'
import Logo from '../Assets/logo-netflix.png'
import { useNavigate } from 'react-router-dom'
import { FaPowerOff } from 'react-icons/fa'
import { signOut } from 'firebase/auth'
import { firebaseAuth } from '../Utils/firebase-config'
import { pages } from '../Routers/path'

const Navbar = () => {
    const navigate = useNavigate()

    const menu = ['Home', 'TV Shows', 'Movies', 'My List']

    const onSubmitSignOut = async() => {
        try {
        await signOut(firebaseAuth)
        localStorage.removeItem('user')
        navigate(`${pages.login}`)
        
        } catch (err) {
        console.error(err)
        }
    }

    return (
        <Stack
        sx={{
            height: "60px",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            color: 'white',
        }}
        >
            <Stack flexDirection={'row'} alignItems={'center'} gap={'30px'}>
                <img src={Logo} alt="Netflix Logo" style={{ width: "150px" }}/>
                {menu.map((item, index) => (
                    <Typography key={index} sx={{ cursor: 'pointer' }} onClick={() => navigate(`/${item.toLowerCase().replace(' ', '-')}`)}>
                        {item}
                    </Typography>
                ))}
            </Stack>
            <Stack>
                <FaPowerOff onClick={onSubmitSignOut}/>
            </Stack>
        </Stack>
    )
}

export default Navbar