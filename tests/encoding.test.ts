import test from 'node:test';
import assert from 'node:assert/strict';
import QRCode from 'qrcode';
import { PNG } from 'pngjs';
import jsQR from 'jsqr';
import { buildWiFiPayload } from '../src/lib/wifi-builder.ts';
import { buildVCard } from '../src/lib/vcard-builder.ts';
import { normalizeWebURL } from '../src/lib/validators.ts';

for (const [name,payload] of [
 ['Unicode','한글 검증 😊 & text'],
 ['WiFi',buildWiFiPayload({ssid:'QA;망',password:'synthetic:test',encryption:'WPA',hidden:false})],
 ['vCard',buildVCard({name:'검증 사용자',company:'QA;팀',email:'qa@example.com'})],
 ['URL','https://example.com/test?query=%ED%95%9C%EA%B8%80'],
 ['email','mailto:qa@example.com?subject=Test'],
 ['phone','tel:+821000000000'],
 ['SMS','sms:+821000000000?body=QA%20test'],
] as const) {
 test(`PNG encode/decode preserves ${name} payload`,async()=>{
  const url=await QRCode.toDataURL(payload,{width:512,margin:4,errorCorrectionLevel:'M'});
  const image=PNG.sync.read(Buffer.from(url.split(',')[1],'base64'));
  const decoded=jsQR(new Uint8ClampedArray(image.data),image.width,image.height);
  assert.equal(decoded?.data,payload);
 });
}
test('URL normalization adds only a missing protocol and never changes HTTP destinations',()=>{
 assert.equal(normalizeWebURL('example.com/한글'),'https://example.com/%ED%95%9C%EA%B8%80');
 assert.equal(normalizeWebURL('http://example.com/'),'http://example.com/');
 assert.equal(normalizeWebURL('https://user:secret@example.com/'),'');
});
