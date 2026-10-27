import test from 'node:test';
import assert from 'node:assert/strict';
import { buildPhonePayload,buildSMSPayload,buildEmailPayload } from '../src/lib/message-builders.ts';

test('phone and SMS reject empty recipients after normalization and malformed plus signs',()=>{
 for(const input of ['abc','++','12+34','+','12']){assert.equal(buildPhonePayload(input),'');assert.equal(buildSMSPayload(input,'한글'),'')}
 assert.equal(buildPhonePayload('010-0000-0000'),'tel:01000000000');
 assert.equal(buildPhonePayload('+82 10 0000 0000'),'tel:+821000000000');
});
test('email rejects query injection and safely encodes tagged recipient and Korean fields',()=>{
 assert.equal(buildEmailPayload('qa@example.com?cc=other@example.com','',''),'');
 assert.equal(buildEmailPayload('not-an-email','',''),'');
 assert.equal(buildEmailPayload('qa+tag@example.com','제목 & more','내용\n둘째줄'),'mailto:qa%2Btag@example.com?subject=%EC%A0%9C%EB%AA%A9%20%26%20more&body=%EB%82%B4%EC%9A%A9%0A%EB%91%98%EC%A7%B8%EC%A4%84');
 assert.equal(buildSMSPayload('+821000000000','한글 & test'),'sms:+821000000000?body=%ED%95%9C%EA%B8%80%20%26%20test');
});
