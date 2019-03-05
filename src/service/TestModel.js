/**
 * Test / Example usage of Models.
 */


import {Model, field, ModelField, Relationship, ForeignKey, drop} from './Model';


export default class TestModel extends Model {
    /**
     * @type {*}
     */
    @field id = new ModelField({pk: true});

    /**@type {*} */ @field firstName = new ModelField();
    /**@type {*} */ @field lastName = new ModelField();
    /**@type {*} */ @field description = new ModelField();
    /**@type {*} */ @field color = new ModelField();

    /**@type {*} */ @field addresses = new Relationship({rel: () => Address, fk: "Address.test_id", serialize: {
            firstName: true,
            lastName: true,
            addressLine1: true,
            addressLine2: true,
            addressLine3: true,
            city: true,
            state: true,
            zip: true,
            phone: true,
            test_id: true,
            test: false
        }});
}


export class Address extends Model {
    @field id = new ModelField({pk: true});

    /**@type {*} */ @field firstName = new ModelField();
    /**@type {*} */ @field lastName = new ModelField();
    /**@type {*} */ @field addressLine1 = new ModelField();
    /**@type {*} */ @field addressLine2 = new ModelField();
    /**@type {*} */ @field addressLine3 = new ModelField();
    /**@type {*} */ @field city = new ModelField();
    /**@type {*} */ @field state = new ModelField();
    /**@type {*} */ @field zip = new ModelField();
    /**@type {*} */ @field phone = new ModelField();
    /**@type {*} */ @field test_id = new ModelField({
        constraints: [
            new ForeignKey('TestModel.id')
        ],
        missing: drop
    });

    /**@type {*} */ @field test = new Relationship({rel: () => TestModel, fk: 'test_id', missing: drop});
}
