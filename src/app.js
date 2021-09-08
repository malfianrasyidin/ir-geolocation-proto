const dns = require('dns').promises
const { lookup, fixTruncatedAddress } = require('@ir/ip-geolocation-lib')

exports.handler = async (event) => {
   try {
      const fqdn = Buffer.from(event["queryStringParameters"]['fqdn'], 'base64').toString()
      console.log(fqdn)
      const dnsResult = await dns.lookup(fqdn)
      console.log(dnsResult)
      const geolocation = await lookup(fixTruncatedAddress(dnsResult['address']))
      console.log(geolocation)

      return {
        statusCode: 200,
        body: JSON.stringify({
          dnsResult,
          geolocation
        })
      }
   } catch (err) {
      console.log(err)

      return {
        statusCode: 500,
        body: JSON.stringify({
          message: err.message
        })
      }
   }
}
