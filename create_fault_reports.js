function generateMockFaultReports(numEntries) {
  const titles = [
    "고장난 충전기 신고",
    "충전기 작동 안함",
    "충전 중단 문제",
    "충전기 오류 신고",
    "충전 속도 문제",
    "충전기 연결 문제",
    "화면 표시 오류",
    "충전기 소음 문제",
    "충전기 접근성 문제",
    "충전기 전원 문제",
  ];
  const contents = [
    "충전이 되지 않는 문제가 발생했습니다",
    "충전기가 전혀 작동하지 않아요",
    "충전이 갑자기 중단됩니다",
    "충전기에 오류 메시지가 표시되요",
    "충전 속도가 너무 느립니다",
    "충전기 연결이 자주 끊어져요",
    "화면이 제대로 표시되지 않아요",
    "충전기에서 이상한 소음이 나요",
    "충전기 접근이 어려워요",
    "충전기 전원이 들어오지 않습니다",
  ];

  const mockData = [];
  for (let i = 0; i < numEntries; i++) {
    const title = titles[Math.floor(Math.random() * titles.length)];
    const content = contents[Math.floor(Math.random() * contents.length)];
    const chargerId = i; // 0 ~ 100
    const userId = Math.floor(Math.random() * 11); // 0 ~ 10
    const createdAt =
      Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 30) * 86400;
    const updatedAt = createdAt + Math.floor(Math.random() * 5) * 86400;

    mockData.push(
      `INSERT INTO fault_reports (id, title, content, user_id, charger_id, created_at, updated_at) VALUES ('${i}', '${title}', '${content}', '${userId}', '${chargerId}', ${createdAt}, ${updatedAt});`
    );
  }
  return mockData;
}

const mockFaultReports = generateMockFaultReports(100);
console.log(mockFaultReports);
