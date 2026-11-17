const { URL } = require('url');

const u = new URL('https://example.com:8080/products/lists?category=book&sort=asc#section1');
console.log(u.protocol);
console.log(u.hostname);
console.log(u.port);
console.log(u.pathname);
console.log(u.hash);
u.searchParams.forEach((value, key) => {
    console.log(key, "=", value);
});






//url program