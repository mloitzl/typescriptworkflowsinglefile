import { Page } from './Page';
import { SampleCompositeControl } from '../SampleCompositeControl';
import { GenericClientWebPart } from "./GenericClientWebPart";

export class PageManager {

    static _readyCallBackqueue = [];
    private static _root: Page;

    static ready(callback: () => void) {
        PageManager._readyCallBackqueue.push(callback);
    }

    static getRoot(): Page {
        if (!PageManager._root) {
            PageManager._root = new Page();
        }
        return PageManager._root;
    }

    public static init(): void {
        //        PageManager._readyCallBackqueue.forEach(f => f(SampleCompositeControl));
        $(".genericClientWebPart").each((i, element) => { 
            PageManager.getRoot().addChild(new GenericClientWebPart($(element)));
        });
        PageManager.getRoot().initPage();
    }

}
