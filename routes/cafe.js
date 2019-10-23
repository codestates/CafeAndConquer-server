const express = require('express');
const router = express.Router();

const { Cafe } = require('../models');

// POST /api/cafe 카페 정보 추가 or 입력
router.post('/', async (req, res, next) => {
  try {
    const {
      cafeName,
      address,
      latitude,
      longitude,
      phone,
      open24Hour,
      priceIceAmericano,
      enoughOutlets,
    } = req.body;

    const point = { type: 'Point', coordinates: [latitude, longitude] };
    await Cafe.create({
      cafeName,
      address,
      point,
      phone,
      open24Hour,
      priceIceAmericano,
      enoughOutlets,
    });
    res.status(200).json({
      code: 200,
      message: '정보 입력 성공!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      message: '정보 입력에 실패했습니다.',
    });
  }
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
