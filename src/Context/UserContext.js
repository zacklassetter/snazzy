import React from 'react';

const UserContext = React.createContext({ user: { username: '', id: null, is_staff: false } });

export default UserContext;
