import React from 'react';
import {ReactFC} from "@interface/common.interface";
import {_navbar} from "@components/styled/entry";

interface Navbar extends ReactFC {

}

const Navbar: React.FC<Navbar> = (): JSX.Element => {
    return (
        <_navbar>
            <div>로고</div>
            <div>버튼;</div>
        </_navbar>
    );
};

export default Navbar;

