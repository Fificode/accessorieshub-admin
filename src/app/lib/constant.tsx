import {
    LayoutDashboard,
    Shapes,
    ShoppingBag,
    Tag,
    UsersRound,
    LogOut
} from 'lucide-react'
export const navLinks = [
    {
        id: 1,
     link: '/dashboard',
     icon: <LayoutDashboard/>,
     label: 'Dashboard'   
    },
    {
        id: 2,
     link: '/dashboard/collections',
     icon: <Shapes/>,
     label: 'Collections'   
    },
    {
        id: 3,
     link: '/products',
     icon: <Tag/>,
     label: 'Products'   
    },
    {
        id: 4,
     link: '/orders',
     icon: <ShoppingBag/>,
     label: 'Orders'   
    },
    {
        id: 5,
     link: '/users',
     icon: <UsersRound/>,
     label: 'Users'   
    },
    {
        id: 6,
     link: '/api/auth/logout',
     icon: <LogOut/>,
     label: 'Log out'   
    },
]