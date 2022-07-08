# Redsys NodeJS Libray

An unofficial NodeJS library for [Redsys](https://pagosonline.redsys.es/). Made it using good practices and TypeScript.

## Functions
- [ ] Create a Redirect Payment
- [ ] Tokenize a Card:
* You need to enable SCA Exception in your account.
* It is recommended to enable Asterisked Card (AKA Tarjeta Asteriscada) in your account.
- [ ] Create a Payment with a tokenized card
- [ ] Make a Refund
- [ ] Make a Payment via Apple Pay 
* You may need to enable not secure / mixed TPV and enable MIT Exception. However directive DIRECTPAYMENT is enforced so you may not required.
- [ ] Make a Payment via Google Pay 
* Same as Apple Pay.

## Dependencies
- Axios
- Crypto
- Buffer
- @types/node