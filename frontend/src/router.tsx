import { createBrowserRouter } from 'react-router-dom';
import { LayoutWithNavbar } from './layout/LayoutWithNavbar';
import { MainLayout } from './layout/MainLayout';
import { HomePage } from './pages/HomePage';
import { ImperativeLogs } from './pages/ImperativeLogs';
import { MiningTypeSelectionPage } from './pages/MiningTypeSelectionPage';

export enum TargetURL {
    HOME = '/',
    MINING_TYPE_SELECTION = '/mining-select',
    IMPERATIVE = '/imperative',
    IMPERATIVE_MODELS = '/imperative/models',
    IMPERATIVE_MINE = '/imperative/mine',
}

export const router = createBrowserRouter([
    {
        path: TargetURL.HOME,
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: TargetURL.MINING_TYPE_SELECTION,
                element: <MiningTypeSelectionPage />,
            },
        ],
    },
    {
        path: TargetURL.IMPERATIVE,
        element: <LayoutWithNavbar />,
        children: [
            {
                index: true,
                element: <ImperativeLogs />,
            },
            {
                path: TargetURL.IMPERATIVE_MODELS,
                element: <div>Imperative Models Page</div>,
            },
            {
                path: TargetURL.IMPERATIVE_MINE,
                element: <div>Imperative Mine Page</div>,
            },
        ],
    },
]);
