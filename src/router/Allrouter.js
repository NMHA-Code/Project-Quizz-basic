import {useRoutes} from 'react-router-dom';
import { router } from './router';

export const ImportRouter = () => {
    const routers = useRoutes(router);
    return(
        <>
        {routers}
        </>
    )
}