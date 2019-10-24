const express = require('express');
const router = express.Router();

const { User, Cafe, sequelize } = require('../models');

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
router.delete('/', async (req, res, next) => {
  try {
    const { cafeId } = req.body;
    await Cafe.delete({ where: { cafeId } });
    res.status(200).json({ code: 200, message: '정보 삭제 성공!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, message: '정보 삭제에 실패했습니다.' });
  }
});

// GET /api/cafe 카페 정보 조회
router.get('/', async (req, res, next) => {
  try {
    const { cafeId } = req.body;
    const cafe = await Cafe.findOne({
      where: { cafeId },
      include: { model: User, attributes: ['email', 'nick'] },
    });
    res.status(200).json({
      code: 200,
      message: '정보 조회 성공!',
      data: { cafe },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, message: '정보 조회에 실패했습니다.' });
  }
});

// POST /api/cafe/search 위치기반 카페 검색
router.post('/search', async (req, res, next) => {
  try {
    const { latitude, longitude, maxDistance } = req.body;
    const query = `
      SELECT a.*
      FROM (
        SELECT
          id, cafeId, cafeName, address, point,
          phone, open24Hour, priceIceAmericano, enoughOutlets, createdAt,
          updatedAt, deletedAt, pioneer, 
          ST_DISTANCE_SPHERE(POINT(:longitude, :latitude), point) AS distance
        FROM cafeandconquer.cafe
      ) a
      WHERE distance <= :maxDistance
      ORDER BY distance
      LIMIT 10`;
    const result = await sequelize.query(query, {
      replacements: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        maxDistance,
      },
      type: sequelize.QueryTypes.SELECT,
    });
    res.status(200).json({
      code: 200,
      message: '현재 위치 기반 카페 검색 완료',
      data: result,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ code: 500, message: '현재 위치 기반 카페 검색에 실패했습니다.' });
  }
});

module.exports = router;
