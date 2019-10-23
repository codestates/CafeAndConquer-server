const express = require('express');
const router = express.Router();

const { Cafe } = require('../models');

// POST /api/cafe 카페 정보 추가 or 입력
router.post('/', async (req, res, next) => {
  try {
    const {
      cafeId,
      cafeName,
      address,
      latitude,
      longitude,
      phone,
      open24Hour,
      priceIceAmericano,
      enoughOutlets,
      pioneer,
    } = req.body;

    const point = { type: 'Point', coordinates: [latitude, longitude] };
    await Cafe.create({
      cafeId,
      cafeName,
      address,
      point,
      phone,
      open24Hour,
      priceIceAmericano,
      enoughOutlets,
      pioneer,
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
router.patch('/', async (req, res, next) => {
  try {
    const {
      cafeId,
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
    await Cafe.update(
      {
        cafeName,
        address,
        point,
        phone,
        open24Hour,
        priceIceAmericano,
        enoughOutlets,
      },
      { where: { cafeId } },
    );
    res.status(200).json({
      code: 200,
      message: '정보 수정 성공!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      message: '정보 수정에 실패했습니다.',
    });
  }
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
