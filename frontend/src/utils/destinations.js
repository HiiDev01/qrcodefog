// Registry of QR destination types. Each type lives in utils/destinations/<id>.js.
import url from './destinations/url.js';
import email from './destinations/email.js';
import vcard from './destinations/vcard.js';
import message from './destinations/message.js';
import phone from './destinations/phone.js';
import wifi from './destinations/wifi.js';
import cryptoCoin from './destinations/crypto.js';
import text from './destinations/text.js';

export { normalizeUrl } from './destinations/shared.js';
export const DESTINATIONS = [url, email, vcard, message, phone, wifi, cryptoCoin, text];
export const getDestination = (id) => DESTINATIONS.find((d) => d.id === id);
