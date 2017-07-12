/**
* Controller will check the schema in response and
* if the schema is correct will send the json
* where workflow = completed and type = htv
**/
var propertySchema = require( '../models/schema.json' );
var bodyParser = require( 'body-parser' );
module.exports = function( app ) {
    app.use( bodyParser.json() );
    app.use( bodyParser.urlencoded({ extended: true }) );
    app.post( '/api', function(req, res) {
        var instance = req.body;
        var schema = propertySchema;
        var Ajv = require( 'ajv' );
        var ajv = new Ajv({
            allErrors: true
        });
        var validate = ajv.compile( schema );
        var valid = validate( instance );
        if ( !valid ) {
            //res.send(validate.errors);
            res.status(400);
            res.send( '{"error": "Could not decode request: JSON parsing failed"}' );
        } else {
            res.writeHead( 200, { 'Content-Type': 'application/json' } );
            var jsonObj = {};
            jsonObj['response'] = [];
            var jsonArr = [];
            Object.keys( instance.payload ).forEach( function(key) {
               if( instance.payload[key].workflow === 'completed' && instance.payload[key].type === 'htv' ) {
                    var postcode = '';
                    if( instance.payload[key].address.postcode !== undefined ) {
                         postcode = instance.payload[key].address.postcode;
                    }
                   jsonArr.push({
                        concataddress: instance.payload[key].address.buildingNumber + ' ' +
                        instance.payload[key].address.street + ' ' +
                        instance.payload[key].address.suburb + ' ' +
                        instance.payload[key].address.state + ' ' +
                        postcode,
                        type: instance.payload[key].type,
                        workflow: instance.payload[key].workflow
                    });
                }
            });
             if( jsonArr.length > 0 ){
                jsonObj['response'] = jsonArr;
                res.end( JSON.stringify(jsonObj) );
            } else {
                res.end( '{"result": "No records match the criteria"}' );
            }
        }
    });
}
