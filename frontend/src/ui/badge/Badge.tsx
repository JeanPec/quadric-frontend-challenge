
import React from 'react';

import './Badge.css';

export interface BadgeProps {
    state: boolean;
}

/*
    Badge:
        - use Badge to display the state
        - state is boolean if the query send back another value than 'success' it is treated as false a point to upgrade in the future
 */

export const Badge = ({
    state = true,
} : BadgeProps) => (
    <span className={state ? 'badge success' : 'badge fail'}>
        {state ? 'Success' : 'Failure'}
    </span>
);