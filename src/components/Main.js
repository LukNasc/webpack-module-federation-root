import React from 'react';
const Main = React.lazy(
    () => import("app/App")
)

export default Main;