import Observable from "../core/interface/Observable";
import $ from 'jquery';


/**
 * Manages the requests between the server and the client.
 *
 * @event saving
 * @event loading
 * @event fetching
 * @event deleting
 */
export class Manager extends Observable {
    constructor(modelClass, {deletable=false, url=null, timeout=3000, multiDelete=false, savable=true, ajaxCache=false}={}) {
        super();
        this.modelCls = modelClass;
        this.deletable = deletable;
        this.url = url;
        this.timeout = timeout;
        this.multiDelete = multiDelete;
        this.savable = savable;
        this.ajaxCache = ajaxCache;

        /**
         * A hook that can be added to add extra behavior to the fetch and list calls.  After the response from the
         * server and the result has been deserialized, this method will be called.  It will be passed the deserialized
         * model and it should either return the model back or return a new model that it will be replaced with.
         *
         * The idea behind this method is that it can be overridden by a higher abstraction layer to implement features
         * such as caching.  The hook can check to see if the new model already exists in storage and merge the new
         * data into the old model.
         * @type {Function}
         */
        this.onList = null;
        this.onFetch = null;
        this.onRefresh = null;
        this.onDelete = null;
        this.onSave = null;
    }

    save(instance, {$fields=null, $timeout=null}={}) {
        if(!this.savable) {
            throw new Error("Saving is not enabled for model");
        }

        let startTime = Date.now();

        let promise = new Promise((resolve, reject) => {
            let request = {
                url: this.url,
                cache: false,
                method: "POST",
                dataType: 'json',
                data: JSON.stringify({
                    action: 'save',
                    document: instance.serialize($fields)
                }),
                timeout: $timeout !== null ? $timeout : this.timeout,

                success: (response) => {
                    instance.update(response.result);
                    if(this.onSave) instance = this.onSave(instance, this);
                    resolve(instance);
                },

                error: (xhr, httpStatus, error) => {
                    reject({
                        xhr: xhr,
                        status: status,
                        error: error
                    });
                }
            };

            Manager.ajax(request);
        });

        this.trigger('saving', {promise, instance, startTime});
        return promise;
    }

    delete(instance, {$timeout=null}={}) {

    }

    refresh(instance, {$select=null, $expand=null, $timeout=null, ...extra}={}) {
        if(!instance.pk) {
            throw new Error("Cannot refresh unsaved instance");
        }

        let startTime = Date.now();

        let promise = new Promise((resolve, reject) => {
            let $filter = {};
            $filter[instance.constructor.getPrimaryKeyField().key] = instance.pk;

            this.fetch($filter, {$select, $expand, $timeout, reason: 'refreshing', instance}).then((results) => {
                instance.update(results.result);
                if(this.onRefresh) instance = this.onRefresh(instance, this);
                resolve(instance);
            }).catch(reject);
        });

        this.trigger('refreshing', {
            instance,
            manager: this,
            promise,
            startTime,
            ...extra
        });
    }

    list({$filters=null, $limit=null, $offset=null, $view=null, $sort=null, $select=null, $expand=null, $timeout=null, ...extra}={}) {
        let startTime = Date.now();

        let promise = new Promise((resolve, reject) =>{
            let data = {action: 'list'};

            if($filters) data.$filters = $filters;
            if($limit) data.$limit = $limit;
            if($offset) data.$offset = $offset;
            if($view) data.$view = $view;
            if($sort) data.$sort = $sort;
            if($select) data.$select = $select;
            if($expand) data.$expand = $expand;

            let request = {
                url: this.url,
                cache: this.ajaxCache,
                method: "POST",
                dataType: "json",
                data: JSON.stringify(data),
                timeout: $timeout !== null ? $timeout : this.timeout,

                success: (response) => {
                    let r = [];

                    if(response.query) {
                        r.query = response.query;
                    }

                    r.count = response.count;

                    for(let document of response.results) {
                        let model = this.modelCls.deserialize(document);

                        if(this.onList) model = this.onList(model, this);
                        r.push(model);
                    }

                    resolve(r);
                },

                error: (xhr, httpStatus, error) => {
                    reject({
                        xhr,
                        status,
                        error
                    });
                }
            };

            Manager.ajax(request);
        });

        this.trigger('loading', {
            promise,
            startTime,
            manager: this,
            modelClass: this.modelCls,
            ...extra
        });

        return promise;
    }

    fetch($filter, {$select=null, $expand=null, $timeout=null, ...extra}={}) {
        let startTime = Date.now();

        if(typeof $filter !== 'object') {
            let _filter = {};
            _filter[this.modelCls.getPrimaryKey().key] = $filter;
            $filter = _filter;
        }

        let promise = new Promise((resolve, reject) => {
            let data = {
                action: 'fetch',
                $filters: $filter
            };

            if($select) data.$select = $select;
            if($expand) data.$expand = $expand;

            let request = {
                url: this.url,
                cache: this.ajaxCache,
                method: "POST",
                dataType: "json",
                data: JSON.stringify(data),
                timeout: $timeout !== null ? $timeout : (this.timeout || 0),

                success: (response) => {
                    let model = this.modelCls.deserialize(response.result);
                    if(this.onFetch) model = this.onFetch(model, this);
                    resolve(model);
                },

                error: (xhr, httpStatus, error) => {
                    reject({
                        xhr,
                        httpStatus,
                        error
                    });
                }
            };

            Manager.ajax(request);
        });

        this.trigger('fetching', {
            promise,
            startTime,
            manager: this,
            modelClass: this.modelCls,
            ...extra
        });

        return promise;
    }

    static ajax(options) {
        return $.ajax(options);
    }
}
