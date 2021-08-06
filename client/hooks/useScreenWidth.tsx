import {useRecoilState} from "recoil";
import {ScreenWidthAtom} from "@state/index";
import {useEffect} from "react";

export interface IScreenWidth {
    width: number
    setWidth: (valOrUpdater: (((currVal: number) => number) | number)) => void
}

const ScreenWidth = (): IScreenWidth => {
    const [width, setWidth] = useRecoilState<number>(ScreenWidthAtom);
    const content_width = 300;
    const margin = 32;
    const howMany = 5;

    useEffect(() => {
        // setWidth(content_width * howMany + margin * howMany);
        setWidth(1800);
    }, []);

    return {width, setWidth};
};
export default ScreenWidth;