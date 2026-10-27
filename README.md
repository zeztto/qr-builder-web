# 큐알잉

7가지 정보를 QR PNG로 만드는 한국어 웹 앱입니다. 입력은 현재 브라우저에서 처리하며 server에 QR payload를 저장하거나 전송하지 않습니다.

## 실행

Node.js 22.13 이상과 npm이 필요합니다. 검증 환경은 Node.js 26.8.1, npm 11.19.0입니다.

```sh
npm ci --ignore-scripts
npm run dev -- --hostname 127.0.0.1
```

production build와 실행:

```sh
npm run build
npm start -- --hostname 127.0.0.1
```

별도 database·API key·로그인이 필요하지 않습니다. `next/font/google`의 build-time download 없이 system Korean sans-serif fallback을 사용합니다. 기본 port는 3000입니다.

## 지원 범위

- URL: protocol이 없으면 HTTPS를 붙입니다. 입력된 HTTP는 원래 목적지를 유지합니다. HTTP(S) 이외 scheme과 사용자명·비밀번호를 포함한 URL은 QR을 만들지 않습니다. 링크를 방문하거나 안전성을 판정하는 기능은 없습니다.
- 텍스트: 한글·Unicode·emoji를 포함한 문자열을 QR payload로 인코딩합니다.
- 연락처: 이름을 필수로 하는 기본 vCard 3.0을 만듭니다. 구분 문자와 줄바꿈을 escape합니다.
- 이메일·전화·문자: 수신 주소와 번호를 기본 검증한 뒤 `mailto:`, `tel:`, `sms:` payload를 만듭니다. 국내·국제 번호의 공백·괄호·하이픈을 정규화하고, 이메일 recipient와 제목·내용을 URI 인코딩합니다. 전송이나 전화 연결을 실행하지 않습니다.
- WiFi: WPA/WEP/암호화 없음, 숨겨진 네트워크와 구분 문자를 지원합니다. 암호화 없음에는 이전 비밀번호를 포함하지 않습니다. 스캔 후 연결 방식은 기기·앱에 따라 다릅니다.
- 크기 128–1024px, 오류 수정 L/M/Q/H, 여백 0–10 module을 조절합니다. 기본값은 256px/M/4입니다. 긴 payload는 더 큰 크기와 충분한 여백으로 실제 기기에서 확인하세요.
- 현재 입력에 맞는 QR만 다운로드하며, 변경·실패·유형 전환 중 이전 QR 다운로드를 막습니다. 파일명은 `QR-ing_유형_년월일시분초.png`입니다.

위치·이벤트, 로고 합성, dynamic redirect, scan 추적, 대량 생성, 저장 이력은 구현하지 않습니다. 옵션에 없는 기능을 제공한다고 표시하지 않습니다. 실제 기기의 연락처 등록·앱 handoff·WiFi 연결 결과는 기기와 reader에 따라 별도 확인해야 합니다.

## 개인정보

입력과 생성한 data URL은 page memory에 있습니다. application은 payload를 fetch·analytics·cookie·localStorage·계정 sync에 보내지 않습니다. QR PNG에는 연락처나 WiFi 비밀번호가 그대로 담길 수 있으므로 공유 대상을 확인하세요. 새로고침하면 입력은 사라집니다.

## 검증

```sh
npm run typecheck
npm test
npm run lint
npm run build
npm audit --audit-level=low
```

자동 검사는 WiFi/vCard escaping·URL 검증·정규화와 7가지 payload의 PNG encode/decode 왕복을 포함합니다. `tests/`에는 명시적인 합성 값과 `example.com`만 사용합니다. UI 입력·키보드·반응형·실제 다운로드는 별도 browser QA 대상이며 물리 기기의 scanner 동작과 구분합니다.

Next build의 social image metadata는 배포 환경의 canonical origin에 맞춰 `src/app/layout.tsx`에서 `metadataBase`를 설정해야 합니다. 기본 로컬 실행에는 localhost fallback이 사용됩니다. 호스팅 배포와 운영 도메인 검증은 이 source edition에 포함하지 않습니다.

## License

작성한 application과 first-party SVG asset은 [MIT License](LICENSE)입니다. [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)에 shadcn/ui와 qrcode의 원래 copyright·license를 보존합니다.
