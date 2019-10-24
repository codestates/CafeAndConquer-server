const path = require('path');

const getSampleData = (filename) => {
  const filePath = path.join(__dirname, '..', 'samples', filename);
  const sampleData = require(filePath)['documents'];
  return sampleData.map((s) => {
    const n = {};
    n.cafeId = s.id;
    n.phone = s.phone;
    n.cafeName = s.place_name;
    n.address = s.road_address_name;
    n.x = s.x;
    n.y = s.y;
    n.open24Hour = 0;
    n.priceIceAmericano = 4100;
    n.enoughOutlets = 'NORMAL';
    n.createdAt = new Date();
    n.updatedAt = new Date();
    n.pioneer = 1;
    return n;
  });
};

// console.log(getSampleData('sampleData01.json'));

module.exports = getSampleData;
