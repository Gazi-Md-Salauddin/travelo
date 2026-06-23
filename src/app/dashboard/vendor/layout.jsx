import { requireRole } from '@/lib/core/session';
import React from 'react';

const VendorDashboardLayout = async ({ children }) => {
    await requireRole('vendor');
    return children;
};

export default VendorDashboardLayout;