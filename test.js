const crypto = require('crypto');
const nodeRSA = require('node-rsa');
const ursa = require('ursa');

const modular = 'niqcAxl7LclB0kE6q9AcAd8EE+0W6AsriR9Fs9T+6QVXl8uiCiAbh/KCyy8X8C2bHsFpNBvwGTqMwHbqZqWBVUvYRtfCFcy3Xmertb09DnOBeWqKS4181kss97JDO6G07QNbuLSWwkkO82CHD1kUmeF5/dof0Ra6bsRXqppdo86NzlgFud+E2s5BM3XwewZVSpA69bwEiXaRDhrsg5mqeOm68VyxE8LQu+895kKsBnTvTueZTrXT+HNaIveoYe8+Lb7b/mZYtlhrDK0i/8EDox85vxnzKZ7wNswqqcDg6vfC2911phSTPh13jv2FIOkjO/WHhHEzRnS2VQqivqIbsQ';
const exponent = 'AQAB';

const keyword = 'hello world';

const key = new nodeRSA();
const publicKeyFromNodeRSA = key.importKey({ n: new Buffer(modular, 'base64'), e: new Buffer(exponent, 'base64') }, 'components-public').exportKey('pkcs8-public-pem');

const ursaPubKey = ursa.createPublicKeyFromComponents(new Buffer(modular, 'base64'), new Buffer('AQAB', 'base64'));
console.log("ursa", ursaPubKey.toPublicPem('utf8'));
console.log("nodeRSA", publicKeyFromNodeRSA);

const encryptedByUrsa = ursaPubKey.encrypt(JSON.stringify(keyword), 'utf8', 'base64', ursa.RSA_PKCS1_PADDING);

const encryptedByNative = crypto.publicEncrypt({
  key: publicKeyFromNodeRSA,
  padding: crypto.constants.RSA_PKCS1_PADDING
}, new Buffer(keyword, 'utf8'));

console.log("ursa", encryptedByUrsa);
console.log("native", encryptedByNative.toString('base64'));