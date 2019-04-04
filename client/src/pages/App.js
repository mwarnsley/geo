import React, { Fragment } from 'react';
import withRoot from '../withRoot';

import Header from '../components/Header';
import Map from '../components/Map';

const App = () => {
    return (
        <Fragment>
            <Header />
            <Map />
        </Fragment>
    );
};

export default withRoot(App);
