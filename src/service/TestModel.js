/**
 * Test / Example usage of Models.
 */


import {Model, field, ModelField, Relationship} from './Model';


export default class TestModel extends Model {
    /**
     * @type {*}
     */
    @field id = new ModelField({pk: true});

    /**@type {*} */ @field firstName = new ModelField();
    /**@type {*} */ @field lastName = new ModelField();
    /**@type {*} */ @field description = new ModelField();
    /**@type {*} */ @field color = new ModelField();

    @field addresses = new Relationship();
}


export class Address extends Model {
    @field id = new ModelField({pk: true});

    @field firstName = new ModelField();
    @field lastName = new ModelField();
    @field addressLine1 = new ModelField();
    @field addressLine2 = new ModelField();
    @field addressLine3 = new ModelField();
    @field city = new ModelField();
    @field state = new ModelField();
    @field zip = new ModelField();
    @field phone = new ModelField();
}
