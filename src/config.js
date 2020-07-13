import md5 from 'md5'

const publicKey = '7b56b7b886de03b4368aabb576a6fcd6';
const privateKey = '6c0e7592d67dff81e15df0226cdb492eefbcf0fb';
let ts = new Date().getTime();
let hash = md5(ts + privateKey + publicKey);

export var key = `?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

