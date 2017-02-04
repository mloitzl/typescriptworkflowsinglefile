namespace Controls {

    export class PageManager {

        private static _root: Page;
        static getRoot(): Page {
            if (!PageManager._root) {
                PageManager._root = new Page();
            }
            return PageManager._root;
        }

        public static init(): void {
                PageManager.getRoot().initPage();
        }
    }
}
