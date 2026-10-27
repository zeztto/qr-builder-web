export const KOREAN_LABELS = {
  site: {
    title: '큐알잉 (QR ing) - 무료 QR코드 생성기',
    description: '빠르고 간편한 한국어 QR코드 생성 서비스',
  },

  qrTypes: {
    url: 'URL',
    contact: '연락처',
    text: '텍스트',
    email: '이메일',
    phone: '전화',
    sms: '문자',
    wifi: 'WiFi',
    location: '위치/지도',
    event: '캘린더 이벤트',
  },

  forms: {
    url: {
      label: '웹사이트 주소',
      placeholder: 'https://example.com',
      error: '올바른 URL을 입력해주세요',
    },
    contact: {
      name: '이름',
      namePlaceholder: '홍길동',
      company: '회사',
      companyPlaceholder: 'QR ing',
      title: '직책',
      titlePlaceholder: '대리',
      phone: '전화번호',
      phonePlaceholder: '010-1234-5678',
      email: '이메일',
      emailPlaceholder: 'example@example.com',
      website: '웹사이트',
      websitePlaceholder: 'https://example.com',
      address: '주소',
      addressPlaceholder: '서울시 강남구',
    },
    text: {
      label: '텍스트 내용',
      placeholder: '여기에 텍스트를 입력하세요...',
    },
    email: {
      email: '이메일 주소',
      emailPlaceholder: 'example@example.com',
      subject: '제목',
      subjectPlaceholder: '이메일 제목',
      body: '내용',
      bodyPlaceholder: '이메일 내용을 입력하세요...',
    },
    phone: {
      phone: '전화번호',
      phonePlaceholder: '010-1234-5678',
    },
    sms: {
      phone: '전화번호',
      phonePlaceholder: '010-1234-5678',
      message: '메시지',
      messagePlaceholder: '문자 내용을 입력하세요...',
    },
    wifi: {
      ssid: '네트워크 이름 (SSID)',
      ssidPlaceholder: 'MyWiFi',
      password: '비밀번호',
      passwordPlaceholder: '네트워크 비밀번호',
      encryption: '암호화 방식',
      noEncryption: '암호화 없음',
    },
  },

  customization: {
    size: 'QR코드 크기',
    errorCorrection: '오류 수정 레벨',
    errorLevels: {
      L: '낮음 (7%)',
      M: '중간 (15%)',
      Q: '높음 (25%)',
      H: '최고 (30%)',
    },
    margin: '여백',
  },

  actions: {
    download: 'QR코드 다운로드',
    generate: 'QR코드 생성',
    reset: '초기화',
  },

  messages: {
    generating: 'QR코드 생성 중...',
    downloadSuccess: 'QR코드가 다운로드되었습니다',
    inputRequired: '내용을 입력하면 QR코드가 생성됩니다',
    noData: 'QR코드를 생성할 데이터가 없습니다',
  },

  header: {
    title: 'QR ing',
    subtitle: '무료 QR코드 생성기',
  },

  footer: {
    copyright: '입력 데이터는 이 브라우저에서 처리됩니다',
  },
} as const;
