var express = require('express');
var router = express.Router();

const properties = [
    {
        name: '2 Bedroom Aptartment Dublin 2',
        description: 'Fabulous 2 bed in the hearth of Dublin. Must be seen!',
        price: 500000.00,
        rent: 2000.00,
        isPublic: true,
    },
    {
        name: 'Cottage in France',
        description: 'Beautiful cottage on France\'s most loved country side.',
        price: 300000.00,
        rent: null,
        isPublic: false,
    },
    {
        name: 'House in South Berlin',
        description: 'Beautiful and modern 3 bedroom house in South Berlim',
        price: 750000.00,
        rent: 2650.00,
        isPublic: true,
    }
];

const filterPublicProperties = (req, properties) =>
    properties.filter(prop => req.user || prop.isPublic);

/* GET home page. */
router.get('/', function(req, res, next) {
    const isForRent = req.query.rent && req.query.rent === 'true';
    const availableProperties = filterPublicProperties(req, properties);

    if (isForRent) {
        res.render('properties/properties', {
            title: 'Properties for Rental',
            isRent: true,
            properties: availableProperties.filter(prop => prop.rent)
        });
    } else {
        res.render('properties/properties', {
            title: 'Properties for Sale',
            isRent: false,
            properties: availableProperties
        });
    }
});

module.exports = router;
