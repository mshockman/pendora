

/**
 * Page loader class.
 *
 * Allows for the class to registers application pages that can be dynamically loaded when needed.
 */
export default class Application {
    constructor(classes) {
        this.classes = {};
        this.page = null;
        this.isLoaded = false;
        this.register(classes);
    }

    /**
     * Register an dictionary of page importers.
     * @param classes
     */
    register(classes) {
        for(let key in classes) {
            if(classes.hasOwnProperty(key)) {
                this.registerPage(key, classes[key]);
            }
        }
    }

    /**
     * Register a single page.
     * @param name
     * @param importer
     */
    registerPage(name, importer) {
        if(this.classes.hasOwnProperty(name) && this.classes[name]) {
            throw new Error("Duplicate page class registered");
        }

        this.classes[name] = importer;
    }

    /**
     * Loads the page with the given context.
     * @param page
     * @param context
     */
    async init(page, context) {
        if(this.page) {
            throw new Error("Page is already loaded");
        }

        // window.addEventListener('load', async () => {
        //     this.isLoaded = true;
        //
        //     const pageClassImporter = this.classes[page],
        //         PageClass = (await pageClassImporter()).default;
        //
        //     this.page = new PageClass(context);
        //     if(this.page.load) this.page.load();
        // });

        this.isLoaded = true;

        const pageClassImporter = this.classes[page],
            PageClass = (await pageClassImporter()).default;

        this.page = new PageClass(context);
        if(this.page.load) this.page.load();
    }
}
