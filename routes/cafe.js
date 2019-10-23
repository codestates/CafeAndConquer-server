const express = require('express');
const router = express.Router();

// POST /api/cafe 카페 정보 추가 or 입력
router.post('/', (req, res, next) => {
  res.status(200).json({
    code: 200,
    message: '카페 정보 입력',
  });
});

// PATCH /api/cafe 카페 정보 수정
router.patch('/', (req, res, next) => {
  res.status(200).json({
    code: 200,
    message: '카페 정보 수정',
  });
});

// DELETE /api/cafe 카페 정보 삭제
router.delete('/', (req, res, next) => {
  res.status(200).json({
    code: 200,
    message: '카페 정보 삭제',
  });
});

// GET /api/cafe 카페 정보 조회
router.get('/', (req, res, next) => {
  res.status(200).json({
    code: 200,
    message: '카페 정보 조회',
  });
});

// POST /api/cafe/search 위치기반 카페 검색
router.post('/search', (req, res, next) => {
  res.status(200).json({
    code: 200,
    message: '카페 정보 검색',
  });
});

module.exports = router;
