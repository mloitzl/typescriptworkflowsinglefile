namespace Controls {

    export class PageManager {

        private static _root: Page;
        static getRoot(): Page {
            if (PageManager._root === null) {
                PageManager._root = new Page();
            }
            return PageManager._root;
        }
    }
}
