function generateMockReviews(numEntries) {
  const titles = [
    "좋은 충전기",
    "훌륭한 서비스",
    "충전 속도 빠름",
    "만족스러운 경험",
    "다시 이용할게요",
    "충전 잘됩니다",
    "편리한 충전소",
    "추천합니다",
    "서비스 최고",
    "가성비 좋은 충전소",
  ];
  const contents = [
    "다음에도 이용할 예정입니다. 정말 만족스러웠어요!",
    "충전기가 많아서 좋았습니다. 위치도 편리했어요.",
    "서비스가 정말 친절했습니다. 충전도 빨랐어요.",
    "가격도 합리적이고, 충전 속도도 만족스러웠습니다.",
    "주변에 이런 충전소가 있다니 다행이에요. 자주 이용할 것 같습니다.",
    "충전소 사용이 매우 편리했습니다. 다음에 또 이용할게요.",
    "충전기 상태가 좋았고, 충전 속도도 빨라서 좋았습니다.",
    "환경이 깨끗하고 관리가 잘 되어 있어서 좋았습니다.",
    "대기 시간 없이 바로 충전할 수 있어서 편리했습니다.",
    "충전소 찾기가 쉬웠고, 사용법도 간단해서 좋았습니다.",
  ];

  const mockData = [];
  for (let i = 200; i < numEntries; i++) {
    const title = titles[Math.floor(Math.random() * titles.length)];
    const content = contents[Math.floor(Math.random() * contents.length)];
    const chargerId = Math.floor(Math.random() * 101); // 0 ~ 100
    const userId = Math.floor(Math.random() * 11); // 0 ~ 10
    const createdAt =
      Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 30) * 86400;
    const updatedAt = createdAt;

    mockData.push(
      `INSERT INTO reviews (id, title, content, user_id, charger_id, created_at, updated_at) VALUES ('${i}', '${title}', '${content}', '${userId}', '${chargerId}', ${createdAt}, ${updatedAt});`
    );
  }
  return mockData;
}

const mockReviews = generateMockReviews(300);
console.log(mockReviews);
