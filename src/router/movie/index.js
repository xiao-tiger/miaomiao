import City from '@/components/City'
export default {
    path: '/movie',
    name: 'movie',
    component: () => import('@/views/Movie'),
    children: [
        {
            path: 'city',
            name: 'city',
            component: City
        },
        {
            path: 'comingSoon',
            name: 'comingSoon',
            component: () => import('@/components/ComingSoon')
        }, 
        {
            path: 'nowPlaying',
            name: 'nowPlaying',
            component: () => import('@/components/NowPlaying')
        },
        {
            path: 'search',
            name: 'search',
            component: () => import('@/components/Search')
        }
    ]    
}