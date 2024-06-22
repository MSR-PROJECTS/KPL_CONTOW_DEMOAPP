const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Import your sequelize instance

// Define the TBLBIGCOMMERCEORDERSDATA model
const TBLBIGCOMMERCEORDERSDATA = sequelize.define('TBLBIGCOMMERCEORDERSDATA', {
    InitialPayloadID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    producer: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hash: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    store_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    scope: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    data: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    // type: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    // },
    // id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    // }
}, {
    tableName: 'TBLBIGCOMMERCEORDERSDATA',
    timestamps: true,
});

// Define the TBLBIGCOMMERCEORDERSDETAILS model
const TBLBIGCOMMERCEORDERSDETAILS = sequelize.define('TBLBIGCOMMERCEORDERSDETAILS', {
    orderpayloadid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    date_created: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    date_modified: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    date_shipped: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    subtotal_ex_tax: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true,
    },
    subtotal_inc_tax: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true,
    },
    subtotal_tax: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true,
    },
    base_shipping_cost: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true,
    },
    shipping_cost_ex_tax: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true,
    },
    shipping_cost_inc_tax: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true,
    },
    shipping_cost_tax: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true,
    },
    shipping_cost_tax_class_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    base_handling_cost: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true,
    },
    handling_cost_ex_tax: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true,
    },
    handling_cost_inc_tax: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true,
    },
    handling_cost_tax: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true,
    },
    handling_cost_tax_class_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    base_wrapping_cost: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true,
    },
    wrapping_cost_ex_tax: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true,
    },
    wrapping_cost_inc_tax: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true,
    },
    wrapping_cost_tax: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true,
    },
    wrapping_cost_tax_class_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    total_ex_tax: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true,
    },
    total_inc_tax: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true,
    },
    total_tax: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true,
    },
    items_total: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    items_shipped: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    payment_method: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    payment_provider_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    payment_status: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    refunded_amount: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true,
    },
    order_is_digital: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    store_credit_amount: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true,
    },
    gift_certificate_amount: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true,
    },
    ip_address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ip_address_v6: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    geoip_country: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    geoip_country_iso2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    currency_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    currency_code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    currency_exchange_rate: {
        type: DataTypes.DECIMAL(10, 10),
        allowNull: true,
    },
    default_currency_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    default_currency_code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    staff_notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    customer_message: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    discount_amount: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true,
    },
    coupon_discount: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true,
    },
    shipping_address_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    ebay_order_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cart_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    billing_address: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    is_email_opt_in: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    credit_card_type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    order_source: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    channel_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    external_source: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    consignments: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    products: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    shipping_addresses: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    coupons: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    external_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    external_merchant_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tax_provider_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    customer_locale: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    external_order_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    store_default_currency_code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    store_default_to_transactional_exchange_rate: {
        type: DataTypes.DECIMAL(10, 10),
        allowNull: true,
    },
    custom_status: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    InitialPayloadID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TBLBIGCOMMERCEORDERSDATA,
            key: 'InitialPayloadID',
        },
    }
}, {
    tableName: 'TBLBIGCOMMERCEORDERSDETAILS',
    timestamps: true,
});

// Define the associations
TBLBIGCOMMERCEORDERSDETAILS.belongsTo(TBLBIGCOMMERCEORDERSDATA, { foreignKey: 'InitialPayloadID' });
TBLBIGCOMMERCEORDERSDATA.hasMany(TBLBIGCOMMERCEORDERSDETAILS, { foreignKey: 'InitialPayloadID' });

module.exports = {
    TBLBIGCOMMERCEORDERSDATA,
    TBLBIGCOMMERCEORDERSDETAILS
};
