import test from 'node:test';
import assert from 'node:assert/strict';
import { buildWiFiPayload } from '../src/lib/wifi-builder.ts';
import { buildVCard } from '../src/lib/vcard-builder.ts';
import { isValidURL } from '../src/lib/validators.ts';

test('WiFi escapes delimiters and backslashes in Unicode network credentials', () => {
  assert.equal(buildWiFiPayload({ssid: '테스트;망:1', password: 'x\\y,z', encryption: 'WPA', hidden: true}), 'WIFI:T:WPA;S:테스트\\;망\\:1;P:x\\\\y\\,z;H:true;;');
});
test('open WiFi never includes a previous password', () => {
  assert.equal(buildWiFiPayload({ssid: 'Test', password: 'private-value', encryption: 'nopass', hidden: false}), 'WIFI:T:nopass;S:Test;H:false;;');
});
test('vCard escapes embedded record delimiters and uses CRLF', () => {
  const card=buildVCard({name:'검증;이름',company:'회사,팀',address:'서울\n둘째줄'});
  assert.ok(card.includes('FN:검증\\;이름\r\n'));
  assert.ok(card.includes('ORG:회사\\,팀\r\n'));
  assert.ok(card.includes('ADR:;;서울\\n둘째줄;;;;'));
});
test('URL QR rejects non-web schemes and accepts HTTP(S)', () => {
  assert.equal(isValidURL('javascript:alert(1)'), false);
  assert.equal(isValidURL('data:text/plain,test'), false);
  assert.equal(isValidURL('https://example.com/한글'), true);
  assert.equal(isValidURL('http://example.com/path'), true);
});
