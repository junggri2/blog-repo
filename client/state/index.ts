import {atom, RecoilState, selectorFamily} from "recoil";

export const PostAtom = atom({
    key: "postState",
    default: null,
});

export const CommentAtom = atom({
    key: "commentState",
    default: null,
});

export const ScreenWidthAtom: RecoilState<number> = atom<number>({
    key: "globalWidth",
    default: 0,
});

export const CommentSelector = selectorFamily({
    key: "commentSelector",
    get: (uid: string) => ({get}) => {
        return get(CommentAtom);
    },
});

export const TestAtom = atom({
    key: "testAtom",
    default: null
});