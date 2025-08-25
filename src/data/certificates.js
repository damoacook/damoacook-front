const certificateData = {
  korean: {
    title: '한식조리기능사',
    subtitle: 'CRAFTSMAN COOK, KOREAN FOOD',
    description: `한식 요리는 다양한 전통 조리 기법과 식재료를 활용해 전통적인 음식 문화를 표현하는 자격입니다.`,
    imageTop: '/images/cert/korean-top.jpg',
    images: [
      '/images/cert/korean-sub2.jpg',
      '/images/cert/korean-sub1.jpg',
    ],
    examInfo: {
      written: [
        '시험 과목: 공중보건, 식품위생, 조리이론 등',
        '시험 시간: 60분',
        '합격 기준: 60점 이상',
      ],
      practical: [
        '전통 요리 조리 실습',
        '시험 시간: 90분 내외',
        '합격 기준: 60점 이상',
      ],
    },
  },

  chinese: {
    title: '중식조리기능사',
    subtitle: 'CRAFTSMAN COOK, CHINESE FOOD',
    description: `중식 요리는 불의 온도와 빠른 조리 기술이 중요한 조리 기능사 자격입니다.`,
    imageTop: '/images/cert/chinese-top.jpg',
    images: [
      '/images/cert/chinese-sub1.jpg',
      '/images/cert/chinese-sub2.jpg',
    ],
    examInfo: {
      written: [
        '시험 과목: 중식 조리법, 식품위생 등',
        '시험 시간: 60분',
        '합격 기준: 60점 이상',
      ],
      practical: [
        '볶음 및 튀김류 조리 실습',
        '시험 시간: 90분',
        '합격 기준: 60점 이상',
      ],
    },
  },

  // ... 추가 자격증
}

export default certificateData
