import './app/style/index.scss'; // eslint-disable-line import/no-unassigned-import -- Module has side effects
import { AppWithProviders } from './app';
import { getRootElement } from './utils/helpers/dom';
import { createRoot } from 'react-dom/client';

const root = createRoot(getRootElement());

root.render(<AppWithProviders />);
