/**
 * Abstract class for model
 */
export class ModelBase {
    /******************************************
     *				CONSTS
     ******************************************/
    static TABLE = '';
    static MAX_DATE_VALUE = '9999-12-31'; // https://dev.mysql.com/doc/refman/8.0/en/datetime.html
    static MAX_DATETIME_VALUE = '9999-12-31 23:59:59'; // https://dev.mysql.com/doc/refman/8.0/en/datetime.html

    /******************************************
     *				Properties
     ******************************************/
    /**
     * @Primary
     * @Identity
     * @Column(type="integer", nullable=false)
     **/
    public id: number;

    /******************************************
     *				CONSTRUCTOR
     ******************************************/
    /**
     * @param obj: (object)
     */
    constructor(obj?: object) {
        if (obj) {
            this.setProperties(obj);
        }
    }

    /******************************************
     *				METHODS
     ******************************************/
    /**
     * @return (object)
     */
    public getProperties(): any {
        var properties = {},
            column;
        for (column in this) {
            //console.debug('[ModelBase - getProperties] column:', column);
            if (this.hasOwnProperty(column) && !(this[column] instanceof ModelBase)) {
                //cconsole.debug('[ModelBase - getProperties]', column, this[column]);
                properties[column] = this[column];
            }
        }
        return properties;
    }

    /**
     * @param obj: (object)
     * @return (this) chainable
     */
    public setProperties(obj: object) {
        if (obj) {
            if (typeof obj == 'string') {
                try {
                    obj = JSON.parse(obj);
                } catch (exception) {
                    console.error('[HibouLib.ModalBase - instanciate] Exception:', exception);
                }
            }
            if (typeof obj == 'object') {
                Object.assign(this, obj);
            } else {
                console.warn('[HibouLib.ModalBase - instanciate] This variable is not an object:', obj);
            }
        }
        return this;
    }
}
