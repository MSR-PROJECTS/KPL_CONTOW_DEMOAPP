'use strict';
const sequelize = require('./models/sequelize');
const BigCommerceOrdersPayloadData = require('./models/bigCommerceOrdersPayloadData');
const BigCommerceOrdersPayload = require('./models/bigCommerceOrdersPayload');
const { TBLBIGCOMMERCEORDERSDATA, TBLBIGCOMMERCEORDERSDETAILS } = require('./models/bigCommerceOrdersModel');


exports.handler = async function (event, context) {
    let body;
    let statusCode = 200;
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        await sequelize.authenticate();

        switch (event.routeKey) {
            case 'DELETE /deletePayloadDataById/{id}':
                body = await handleDelete(event.pathParameters.id);
                break;
            case 'GET /getPayloadDataById/{id}':
                body = await handleGetById(event.pathParameters.id);
                break;
            case 'GET /getAllPayloadData':
                body = await handleGetAll();
                break;
            case 'PUT /putPayloadData':
                const requestJSON = JSON.parse(event.body);
                body = await handlePut(requestJSON);
                break;
            case 'POST /postPayloadData':
                const requestData = JSON.parse(event.body);
                body = await postBigCommerceOrdersData(requestData);
                break;
            default:
                throw new Error(`Unsupported route: "${event.routeKey}"`);
        }
    } catch (err) {
        statusCode = 400;
        body = { error: err.message };
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
};

const handleDelete = async (id) => {
    const deleted = await BigCommerceOrdersPayloadData.destroy({ where: { FDPAYLOADDATAID: id } });
    if (deleted) {
        return `Deleted payload data with id ${id}`;
    } else {
        throw new Error(`Payload data with id ${id} not found`);
    }
};

const handleGetById = async (id) => {
    const payloadData = await BigCommerceOrdersPayloadData.findByPk(id, {
        include: BigCommerceOrdersPayload,
    });
    if (payloadData) {
        return payloadData;
    } else {
        throw new Error(`Payload data with id ${id} not found`);
    }
};

const handleGetAll = async () => {
    const payloadData = await BigCommerceOrdersPayloadData.findAll({
        include: BigCommerceOrdersPayload,
    });
    return payloadData;
};

const handlePut = async (data) => {
    const [payloadData, created] = await BigCommerceOrdersPayloadData.upsert(data);
    return `Put payload data with id ${payloadData.FDPAYLOADDATAID}`;
};

const handlePost = async (data) => {
    const transaction = await sequelize.transaction();
    try {
        // Insert into bigCommerceOrdersPayloadData
        const payloadData = await BigCommerceOrdersPayloadData.create(
            {
                FDID: data.data.id,
                FDTYPE: data.data.type,
            },
            { transaction }
        );

        // Insert into bigCommerceOrdersPayload
        const payload = await BigCommerceOrdersPayload.create(
            {
                FDHASH: data.hash,
                FDCREATEDAT: data.created_at,
                FDPRODUCER: data.producer,
                FDSCOPE: data.scope,
                FDSTOREID: data.store_id,
                FDPAYLOADDATAID: payloadData.PayloadDataID,
            },
            { transaction }
        );

        await transaction.commit();
        return { ...payload.toJSON(), PayloadData: payloadData.toJSON() };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


const postBigCommerceOrdersData = async (requestJSON) => {
    const transaction = await sequelize.transaction();
    try {
        // Step 1: Insert data into TBLBIGCOMMERCEORDERSDATA
        const orderData = await TBLBIGCOMMERCEORDERSDATA.create({
            producer: requestJSON.producer,
            hash: requestJSON.hash,
            created_at: requestJSON.created_at,
            store_id: requestJSON.store_id,
            scope: requestJSON.scope,
            data: requestJSON.data,
        }, { transaction });

        console.log('Inserted data into TBLBIGCOMMERCEORDERSDATA:', orderData);

        // Step 2: Fetch data from external URL
        const response = await fetch(`https://api.bigcommerce.com/stores/cbuovjweig/v2/orders/${requestJSON.data.id}`, {
            headers: {
                'X-Auth-Token': 'nuvn6vrgw85jfy5psftvf4av2cju05u'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const externalData = await response.json();

        // Step 3: Insert fetched data into TBLBIGCOMMERCEORDERSDETAILS with foreign key
        const orderDetailsData = await TBLBIGCOMMERCEORDERSDETAILS.create({
            InitialPayloadID: orderData.InitialPayloadID, // Reference the primary key from TBLBIGCOMMERCEORDERSDATA
            id: externalData.id,
            customer_id: externalData.customer_id,
            date_created: new Date(externalData.date_created),
            date_modified: new Date(externalData.date_modified),
            date_shipped: externalData.date_shipped ? new Date(externalData.date_shipped) : null,
            status_id: externalData.status_id,
            status: externalData.status,
            subtotal_ex_tax: externalData.subtotal_ex_tax,
            subtotal_inc_tax: externalData.subtotal_inc_tax,
            subtotal_tax: externalData.subtotal_tax,
            base_shipping_cost: externalData.base_shipping_cost,
            shipping_cost_ex_tax: externalData.shipping_cost_ex_tax,
            shipping_cost_inc_tax: externalData.shipping_cost_inc_tax,
            shipping_cost_tax: externalData.shipping_cost_tax,
            shipping_cost_tax_class_id: externalData.shipping_cost_tax_class_id,
            base_handling_cost: externalData.base_handling_cost,
            handling_cost_ex_tax: externalData.handling_cost_ex_tax,
            handling_cost_inc_tax: externalData.handling_cost_inc_tax,
            handling_cost_tax: externalData.handling_cost_tax,
            handling_cost_tax_class_id: externalData.handling_cost_tax_class_id,
            base_wrapping_cost: externalData.base_wrapping_cost,
            wrapping_cost_ex_tax: externalData.wrapping_cost_ex_tax,
            wrapping_cost_inc_tax: externalData.wrapping_cost_inc_tax,
            wrapping_cost_tax: externalData.wrapping_cost_tax,
            wrapping_cost_tax_class_id: externalData.wrapping_cost_tax_class_id,
            total_ex_tax: externalData.total_ex_tax,
            total_inc_tax: externalData.total_inc_tax,
            total_tax: externalData.total_tax,
            items_total: externalData.items_total,
            items_shipped: externalData.items_shipped,
            payment_method: externalData.payment_method,
            payment_provider_id: externalData.payment_provider_id,
            payment_status: externalData.payment_status,
            refunded_amount: externalData.refunded_amount,
            order_is_digital: externalData.order_is_digital,
            store_credit_amount: externalData.store_credit_amount,
            gift_certificate_amount: externalData.gift_certificate_amount,
            ip_address: externalData.ip_address,
            ip_address_v6: externalData.ip_address_v6,
            geoip_country: externalData.geoip_country,
            geoip_country_iso2: externalData.geoip_country_iso2,
            currency_id: externalData.currency_id,
            currency_code: externalData.currency_code,
            currency_exchange_rate: externalData.currency_exchange_rate,
            default_currency_id: externalData.default_currency_id,
            default_currency_code: externalData.default_currency_code,
            staff_notes: externalData.staff_notes,
            customer_message: externalData.customer_message,
            discount_amount: externalData.discount_amount,
            coupon_discount: externalData.coupon_discount,
            shipping_address_count: externalData.shipping_address_count,
            is_deleted: externalData.is_deleted,
            ebay_order_id: externalData.ebay_order_id,
            cart_id: externalData.cart_id,
            billing_address: externalData.billing_address,
            is_email_opt_in: externalData.is_email_opt_in,
            credit_card_type: externalData.credit_card_type,
            order_source: externalData.order_source,
            channel_id: externalData.channel_id,
            external_source: externalData.external_source,
            consignments: externalData.consignments,
            products: externalData.products,
            shipping_addresses: externalData.shipping_addresses,
            coupons: externalData.coupons,
            external_id: externalData.external_id,
            external_merchant_id: externalData.external_merchant_id,
            tax_provider_id: externalData.tax_provider_id,
            customer_locale: externalData.customer_locale,
            external_order_id: externalData.external_order_id,
            store_default_currency_code: externalData.store_default_currency_code,
            store_default_to_transactional_exchange_rate: externalData.store_default_to_transactional_exchange_rate,
            custom_status: externalData.custom_status,
        }, { transaction });

        console.log('Inserted data into TBLBIGCOMMERCEORDERSDETAILS:', orderDetailsData);

        await transaction.commit();
        return { ...orderData.toJSON(), orderDetailsData: orderDetailsData.toJSON()};
    } catch (error) {
        await transaction.rollback();
        console.error('Error in POST /postBigCommerceOrdersData:', error);
        throw error;
    }
};

