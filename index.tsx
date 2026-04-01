import React from 'react';
import { createRoot } from 'react-dom/client';
import LandingPage from './LandingPage';
import './index.css';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<LandingPage />);
}
