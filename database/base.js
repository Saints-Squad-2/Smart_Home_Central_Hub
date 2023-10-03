// Expanded ORM base class

const { Model } = require('objection');

class Base extends Model {
    async insert(cls) {
        await cls.query().insert(this);
    }

    async update(cls) {
        await cls.query().findById(this.id).patch(this);
    }

    async save(cls) {
        if (this.id) {
            await this.update(cls);
        } else {
            await this.insert(cls);
        }
    }

    async deleteFromDB(cls) {
        await cls.query().deleteById(this.id);
    }

    static async loadById(cls, id) {
        return await cls.query().findById(id);
    }
}

module.exports = Base;